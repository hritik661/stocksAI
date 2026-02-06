import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { neon } from "@neondatabase/serverless"

export async function POST(req: Request) {

  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('session_token')?.value

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
    if (!token) return NextResponse.json({ error: "Unauthorized - No session token" }, { status: 401 })

    const databaseUrl = process.env.DATABASE_URL
    const useDatabase = databaseUrl && !databaseUrl.includes('dummy')
    const sql = useDatabase ? neon(databaseUrl!) : null
    let user: any

    const isLocalToken = token.startsWith('local')
    if (useDatabase && sql && !isLocalToken) {
      const userRows = await sql`
        SELECT u.id, u.email, u.name, u.is_top_gainer_paid
        FROM user_sessions s
        JOIN users u ON u.id = s.user_id
        WHERE s.session_token = ${token}
        LIMIT 1
      `
      if (!userRows?.length) return NextResponse.json({ error: "Unauthorized - User not found" }, { status: 401 })
      user = userRows[0]
    } else {
      const parts = token.split(':')
      if (parts.length >= 2 && parts[0] === 'local') {
        const userEmail = parts[1]
        user = { id: userEmail, email: userEmail, name: userEmail.split('@')[0], is_top_gainer_paid: false }
      } else {
        return NextResponse.json({ error: "Unauthorized - Invalid session" }, { status: 401 })
      }
    }

    if (useDatabase && user.is_top_gainer_paid) return NextResponse.json({ error: "Already have access to top gainers.." }, { status: 400 })

    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    const origin = process.env.NEXT_PUBLIC_APP_ORIGIN || ''
    const amountPaise = 20000 // ₹200 = 20000 paise

    // Try to create via Razorpay Payment Links API
    if (keyId && keySecret) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')
      const payload = {
        amount: amountPaise,
        currency: "INR",
        accept_partial: false,
        description: "Unlock Top Gainer Stocks - StockAI",
        customer: { name: user.name || user.email, email: user.email },
        notify: { sms: false, email: true },
        reminder_enable: false,
        callback_url: origin ? `${origin}/api/top-gainers/verify-payment` : undefined,
        callback_method: "get"
      }

      try {
        const resp = await fetch("https://api.razorpay.com/v1/payment_links", {
          method: "POST",
          headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
        if (resp.ok) {
          const data = await resp.json() as any
          const linkId = data.id || data.link_id || data.payment_link_id || `rzp_${Date.now()}`
          const shortUrl = data.short_url || data.short_link || data.url
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
        }
        return NextResponse.json({ error: resp.statusText || "Razorpay error" }, { status: resp.status })
      } catch (err) {
        console.error('[CREATE-PAYMENT] Razorpay API error:', err)
        return NextResponse.json({ error: "Failed to create payment link", details: err instanceof Error ? err.message : String(err) }, { status: 500 })
      }
    }

    return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 })

  } catch (error) {
    console.error('[CREATE-PAYMENT] Error:', error)
    return NextResponse.json({ error: "Internal server error", details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
