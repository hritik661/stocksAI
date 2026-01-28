import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { neon } from "@neondatabase/serverless"

export async function POST() {
  console.log('[CREATE-PAYMENT] ===== STARTING PAYMENT CREATION =====')
  console.log('[CREATE-PAYMENT] Timestamp:', new Date().toISOString())

  try {
    console.log('[CREATE-PAYMENT] Starting payment creation')

    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('session_token')?.value

    console.log('[CREATE-PAYMENT] Session token from cookie:', sessionToken ? 'present' : 'missing')
    console.log('[CREATE-PAYMENT] Session token value:', sessionToken)

    if (!sessionToken) {
      console.log('[CREATE-PAYMENT] No session token found in cookies')
      return NextResponse.json({ error: "Unauthorized - No session token" }, { status: 401 })
    }

    const databaseUrl = process.env.DATABASE_URL!
    const useDatabase = databaseUrl && !databaseUrl.includes('dummy')
    const sql = useDatabase ? neon(databaseUrl) : null

    console.log('[CREATE-PAYMENT] Database URL configured:', !!databaseUrl)
    console.log('[CREATE-PAYMENT] Using database:', useDatabase)
    console.log('[CREATE-PAYMENT] Database URL preview:', databaseUrl ? databaseUrl.substring(0, 50) + '...' : 'none')

    let user: any

    if (useDatabase && sql) {
      console.log('[CREATE-PAYMENT] Attempting database connection...')
      // Get user from session
      console.log('[CREATE-PAYMENT] Querying database for user with session token')
      const userRows = await sql`
        SELECT id, email, name, is_prediction_paid
        FROM users
        WHERE id = (
          SELECT user_id FROM user_sessions
          WHERE session_token = ${sessionToken}
        )
      `

      console.log('[CREATE-PAYMENT] User query result:', userRows.length, 'rows found')
      console.log('[CREATE-PAYMENT] User query result details:', JSON.stringify(userRows, null, 2))

      if (userRows.length === 0) {
        console.log('[CREATE-PAYMENT] No user found for session token:', sessionToken)
        return NextResponse.json({ error: "Unauthorized - User not found" }, { status: 401 })
      }

      user = userRows[0]
      console.log('[CREATE-PAYMENT] User details:', { id: user.id, email: user.email, name: user.name, is_prediction_paid: user.is_prediction_paid })
    } else {
      console.log('[CREATE-PAYMENT] Database not configured, using localStorage mode')
      // LocalStorage mode - extract user info from session token
      console.log('[CREATE-PAYMENT] Using localStorage mode')
      // In localStorage mode, session tokens are like "local:email:timestamp"
      const parts = sessionToken.split(':')
      if (parts.length >= 2 && parts[0] === 'local') {
        const userEmail = parts[1]
        user = {
          id: userEmail, // Use email as ID in localStorage mode
          email: userEmail,
          name: userEmail.split('@')[0],
          is_prediction_paid: false // Assume not paid in localStorage mode
        }
        console.log('[CREATE-PAYMENT] Local user:', user)
      } else {
        console.log('[CREATE-PAYMENT] Invalid localStorage session token format')
        return NextResponse.json({ error: "Unauthorized - Invalid session" }, { status: 401 })
      }
    }

    // Check if already paid (only for database mode)
    if (useDatabase && user.is_prediction_paid) {
      console.log('[CREATE-PAYMENT] User already has access to predictions')
      return NextResponse.json({ error: "Already have access to predictions" }, { status: 400 })
    }

    const apiKey = process.env.INSTAMOJO_API_KEY!
    const authToken = process.env.INSTAMOJO_AUTH_TOKEN!
    const isTestMode = process.env.INSTAMOJO_TEST_MODE === 'true'

    console.log('[CREATE-PAYMENT] Instamojo config - API Key:', apiKey ? 'present' : 'missing')
    console.log('[CREATE-PAYMENT] Instamojo config - Auth Token:', authToken ? 'present' : 'missing')
    console.log('[CREATE-PAYMENT] Instamojo config - Test Mode:', isTestMode)
    console.log('[CREATE-PAYMENT] Environment variables check:')
    console.log('[CREATE-PAYMENT] - INSTAMOJO_API_KEY exists:', !!process.env.INSTAMOJO_API_KEY)
    console.log('[CREATE-PAYMENT] - INSTAMOJO_AUTH_TOKEN exists:', !!process.env.INSTAMOJO_AUTH_TOKEN)
    console.log('[CREATE-PAYMENT] - INSTAMOJO_TEST_MODE value:', process.env.INSTAMOJO_TEST_MODE)

    // Generate order ID
    const sanitizedUserId = user.id.replace(/[^a-zA-Z0-9_-]/g, '_')
    const orderId = `PRED_${Date.now()}_${sanitizedUserId.slice(0, 8)}`

    console.log('[CREATE-PAYMENT] Generated order ID:', orderId)

    // Create Instamojo payment request
    const paymentData = {
      purpose: "Predictions Access",
      amount: "1.00",
      buyer_name: user.name || user.email.split('@')[0],
      email: user.email,
      redirect_url: `${process.env.NEXT_PUBLIC_APP_ORIGIN || 'http://localhost:3000'}/api/predictions/verify-payment?order_id=${orderId}`,
      webhook: `${process.env.NEXT_PUBLIC_APP_ORIGIN || 'http://localhost:3000'}/api/predictions/webhook`,
      allow_repeated_payments: false
    }

    const baseUrl = isTestMode
      ? 'https://test.instamojo.com/api/1.1'
      : 'https://www.instamojo.com/api/1.1'

    console.log('[CREATE-PAYMENT] Instamojo API URL:', baseUrl)
    console.log('[CREATE-PAYMENT] Payment data:', JSON.stringify(paymentData, null, 2))

    const response = await fetch(`${baseUrl}/payment-requests/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
        'X-Auth-Token': authToken
      },
      body: JSON.stringify(paymentData)
    })

    console.log('[CREATE-PAYMENT] Instamojo API response status:', response.status)
    console.log('[CREATE-PAYMENT] Instamojo API response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text();
      let errorJson = {};
      try {
        errorJson = JSON.parse(errorText);
      } catch (e) {
        errorJson = { raw: errorText };
      }
      console.error('[CREATE-PAYMENT] Instamojo payment request creation failed:', errorJson);
      return NextResponse.json({ error: "Failed to create payment request", details: errorJson }, { status: 500 });
    }

    const paymentResult = await response.json()
    console.log('[CREATE-PAYMENT] Instamojo response body:', JSON.stringify(paymentResult))

    // Store order in database for tracking (only in database mode)
    if (useDatabase && sql) {
      await sql`
        INSERT INTO payment_orders (order_id, user_id, amount, currency, status, payment_gateway, product_type, created_at)
        VALUES (${orderId}, ${user.id}, 1.00, 'INR', 'pending', 'instamojo', 'predictions', NOW())
        ON CONFLICT (order_id) DO NOTHING
      `
    }

    // Instamojo response structure
    const paymentLink = paymentResult.payment_request?.longurl || null
    const actualOrderId = paymentResult.payment_request?.id || orderId

    return NextResponse.json({
      orderId: actualOrderId,
      paymentLink,
      raw: paymentResult
    })

  } catch (error) {
    console.error('[CREATE-PAYMENT] ===== INTERNAL SERVER ERROR =====')
    console.error('[CREATE-PAYMENT] Error details:', error)
    console.error('[CREATE-PAYMENT] Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    console.error('[CREATE-PAYMENT] Error message:', error instanceof Error ? error.message : String(error))
    console.error('[CREATE-PAYMENT] Error type:', typeof error)
    console.error('[CREATE-PAYMENT] Error constructor:', error?.constructor?.name)

    // Log additional context
    console.error('[CREATE-PAYMENT] Environment check:')
    console.error('[CREATE-PAYMENT] - DATABASE_URL exists:', !!process.env.DATABASE_URL)
    console.error('[CREATE-PAYMENT] - INSTAMOJO_API_KEY exists:', !!process.env.INSTAMOJO_API_KEY)
    console.error('[CREATE-PAYMENT] - INSTAMOJO_AUTH_TOKEN exists:', !!process.env.INSTAMOJO_AUTH_TOKEN)
    console.error('[CREATE-PAYMENT] - INSTAMOJO_TEST_MODE value:', process.env.INSTAMOJO_TEST_MODE)

    return NextResponse.json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}