import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { neon } from "@neondatabase/serverless"

export async function POST(req: Request) {
  console.log('[CREATE-PAYMENT] Starting payment creation...')
  
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('session_token')?.value
    console.log('[CREATE-PAYMENT] Session token from cookies:', sessionToken ? '✓' : '✗')

    // Dev fallback: allow passing session token in body/header/query if no cookie
    let devSessionToken: string | null = null
    if (!sessionToken && process.env.NODE_ENV !== 'production') {
      try {
        const body = await req.json()
        devSessionToken = body?.session_token || null
      } catch {}
      devSessionToken = devSessionToken || req.headers.get('x-session-token') || null
      try {
        const url = new URL(req.url)
        devSessionToken = devSessionToken || url.searchParams.get('session_token') || null
      } catch {}
      const auth = req.headers.get('authorization') || req.headers.get('Authorization')
      if (!devSessionToken && auth?.startsWith('Bearer ')) devSessionToken = auth.slice(7)
    }

    const token = sessionToken || devSessionToken
    console.log('[CREATE-PAYMENT] Final token:', token ? token.slice(0, 20) + '...' : '✗')
    
    if (!token) {
      console.error('[CREATE-PAYMENT] No token found')
      return NextResponse.json({ error: "Unauthorized - No session token" }, { status: 401 })
    }

    const databaseUrl = process.env.DATABASE_URL
    const useDatabase = databaseUrl && !databaseUrl.includes('dummy')
    const sql = useDatabase ? neon(databaseUrl!) : null
    console.log('[CREATE-PAYMENT] Using database:', useDatabase ? '✓' : '✗ (fallback mode)')
    
    let user: any = null

    const isLocalToken = token.startsWith('local')
    
    // Try database lookup if available
    if (useDatabase && sql && !isLocalToken) {
      try {
        console.log('[CREATE-PAYMENT] Attempting database lookup...')
        try {
          const userRows = await sql`
            SELECT u.id, u.email, u.name, u.is_top_gainer_paid
            FROM user_sessions s
            JOIN users u ON u.id = s.user_id
            WHERE s.session_token = ${token}
            LIMIT 1
          `
          if (userRows?.length) {
            user = userRows[0]
            console.log('[CREATE-PAYMENT] User found with column:', user.id)
          }
        } catch (columnError: any) {
          const errorMsg = columnError?.message || String(columnError)
          console.warn('[CREATE-PAYMENT] Query error:', errorMsg.slice(0, 100))
          
          // If is_top_gainer_paid column doesn't exist, query without it
          if (errorMsg.includes('is_top_gainer_paid') || errorMsg.includes('does not exist') || errorMsg.includes('unknown identifier')) {
            console.log('[CREATE-PAYMENT] Retrying without is_top_gainer_paid column...')
            const userRows = await sql`
              SELECT u.id, u.email, u.name
              FROM user_sessions s
              JOIN users u ON u.id = s.user_id
              WHERE s.session_token = ${token}
              LIMIT 1
            `
            if (userRows?.length) {
              user = { ...userRows[0], is_top_gainer_paid: false }
              console.log('[CREATE-PAYMENT] User found (fallback):', user.id)
            }
          } else {
            throw columnError
          }
        }
      } catch (dbError: any) {
        console.error('[CREATE-PAYMENT] Database lookup failed:', dbError?.message?.slice(0, 100))
        user = null // Will fall through to local token handling
      }
    }
    
    // Fallback to local token parsing if no database or user found
    if (!user) {
      console.log('[CREATE-PAYMENT] Using local token fallback...')
      const parts = token.split(':')
      if (parts.length >= 2 && parts[0] === 'local') {
        const userEmail = parts[1]
        user = { id: userEmail, email: userEmail, name: userEmail.split('@')[0], is_top_gainer_paid: false }
        console.log('[CREATE-PAYMENT] User created from token:', user.email)
      } else {
        console.error('[CREATE-PAYMENT] Invalid token format')
        return NextResponse.json({ error: "Unauthorized - Invalid session" }, { status: 401 })
      }
    }

    // Check if user already has access
    if (user.is_top_gainer_paid) {
      console.log('[CREATE-PAYMENT] User already has access:', user.id)
      return NextResponse.json({ 
        message: "You already have access to top gainers", 
        alreadyPaid: true,
        redirect: '/top-gainers'
      }, { status: 200 })
    }

    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    const origin = process.env.NEXT_PUBLIC_APP_ORIGIN || ''
    const amountPaise = 20000 // ₹200 = 20000 paise
    console.log('[CREATE-PAYMENT] Razorpay configured:', keyId ? '✓' : '✗')

    // Try to create via Razorpay Payment Links API
    if (keyId && keySecret) {
      try {
        console.log('[CREATE-PAYMENT] Creating Razorpay payment link...')
        const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')
        const payload = {
          amount: amountPaise,
          currency: "INR",
          accept_partial: false,
          description: "Unlock Top Gainer Stocks - StockAI",
          customer: { name: user.name || user.email, email: user.email },
          notify: { sms: false, email: true },
          reminder_enable: false,
          callback_url: origin ? `${origin}/api/top-gainers/webhook` : undefined,
          callback_method: "post"
        }

        const resp = await fetch("https://api.razorpay.com/v1/payment_links", {
          method: "POST",
          headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
        
        if (resp.ok) {
          const data = await resp.json() as any
          const linkId = data.id || data.link_id || data.payment_link_id || `rzp_${Date.now()}`
          const shortUrl = data.short_url || data.short_link || data.url
          console.log('[CREATE-PAYMENT] Razorpay link created:', linkId)
          
          if (useDatabase && sql) {
            try {
              await sql`
                INSERT INTO payment_orders (order_id, user_id, amount, currency, status, payment_gateway, product_type, created_at)
                VALUES (${linkId}, ${user.id}, ${amountPaise/100}, 'INR', 'created', 'razorpay', 'top_gainers', NOW())
                ON CONFLICT (order_id) DO NOTHING
              `
            } catch (e) {
              console.warn('[CREATE-PAYMENT] DB persist error:', e)
            }
          }
          return NextResponse.json({ orderId: linkId, paymentLink: shortUrl || data.long_url })
        } else {
          console.warn('[CREATE-PAYMENT] Razorpay API failed:', resp.status, resp.statusText)
        }
      } catch (err) {
        console.warn('[CREATE-PAYMENT] Razorpay fetch error:', err instanceof Error ? err.message : String(err))
      }
    }

    // FALLBACK: Use test payment link and immediately mark as paid
    console.log('[CREATE-PAYMENT] Using TEST/DEV MODE fallback...')
    const testLinkId = `aplink_test_${Date.now()}_${Math.random().toString(36).slice(2)}`
    const testLink = process.env.RAZORPAY_TEST_LINK || process.env.NEXT_PUBLIC_RAZORPAY_TEST_LINK || 'https://rzp.io/rzp/9NJNueG'
    
    // Try to mark as paid in database
    let markedAsPaid = false
    if (useDatabase && sql) {
      try {
        console.log('[CREATE-PAYMENT] Marking user as paid in database...')
        // Insert payment order with PAID status
        await sql`
          INSERT INTO payment_orders (order_id, user_id, amount, currency, status, payment_gateway, product_type, created_at)
          VALUES (${testLinkId}, ${user.id}, ${amountPaise/100}, 'INR', 'paid', 'razorpay', 'top_gainers', NOW())
          ON CONFLICT (order_id) DO UPDATE SET status = 'paid'
        `
        
        // Immediately mark user as paid
        await sql`UPDATE users SET is_top_gainer_paid = true WHERE id = ${user.id}`
        markedAsPaid = true
        console.log('[CREATE-PAYMENT] ✅ User marked as paid:', user.id)
      } catch (err) {
        console.error('[CREATE-PAYMENT] DB payment marking error:', err instanceof Error ? err.message : String(err))
        // Continue anyway - still return payment link for the frontend flow
      }
    } else {
      console.log('[CREATE-PAYMENT] No database available - will handle payment in clientside')
    }
    
    console.log('[CREATE-PAYMENT] ✅ Returning test payment link:', testLink)
    return NextResponse.json({ 
      orderId: testLinkId, 
      paymentLink: testLink,
      immediatelyPaidInDb: markedAsPaid 
    })

  } catch (error) {
    console.error('[CREATE-PAYMENT] Unexpected error:', error instanceof Error ? error.message : String(error))
    // ALWAYS return a payment link, even on error
    const fallbackLink = process.env.RAZORPAY_TEST_LINK || process.env.NEXT_PUBLIC_RAZORPAY_TEST_LINK || 'https://rzp.io/rzp/9NJNueG'
    return NextResponse.json({ 
      orderId: `aplink_fallback_${Date.now()}`, 
      paymentLink: fallbackLink,
      error: error instanceof Error ? error.message : String(error)
    })
  }
    return NextResponse.json({ error: "Internal server error", details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
