import { NextResponse } from "next/server"
import { getPool } from "@/lib/mysql"
import { cookies } from "next/headers"

export async function GET() {
  console.log('[CHECK-ACCESS] ===== STARTING ACCESS CHECK =====')
  console.log('[CHECK-ACCESS] Timestamp:', new Date().toISOString())

  try {
    console.log('[CHECK-ACCESS] Starting access check')

    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('session_token')?.value

    console.log('[CHECK-ACCESS] Session token from cookie:', sessionToken ? 'present' : 'missing')
    console.log('[CHECK-ACCESS] Session token value:', sessionToken)

    if (!sessionToken) {
      console.log('[CHECK-ACCESS] No session token found in cookies')
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if database is configured
    const useDatabase = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('dummy')
    console.log('[CHECK-ACCESS] Using database:', useDatabase)
    console.log('[CHECK-ACCESS] DATABASE_URL exists:', !!process.env.DATABASE_URL)

    let hasAccess = false

    if (useDatabase) {
      console.log('[CHECK-ACCESS] Attempting database connection...')
      const pool = getPool()
      console.log('[CHECK-ACCESS] Database pool created successfully')

      // Get user from session
      console.log('[CHECK-ACCESS] Querying database for user')
      const [userRows] = await pool.query(
        'SELECT id, is_prediction_paid FROM users WHERE id = (SELECT user_id FROM user_sessions WHERE session_token = ?) LIMIT 1',
        [sessionToken]
      ) as any[]

      console.log('[CHECK-ACCESS] User query result:', userRows.length, 'rows found')
      console.log('[CHECK-ACCESS] User query result details:', JSON.stringify(userRows, null, 2))

      if (userRows.length === 0) {
        console.log('[CHECK-ACCESS] No user found for session token:', sessionToken)
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      const user = userRows[0]
      hasAccess = user.is_prediction_paid || false
      console.log('[CHECK-ACCESS] User found:', { id: user.id, hasAccess })
    } else {
      console.log('[CHECK-ACCESS] Database not configured, using localStorage mode')
      // LocalStorage mode - check localStorage for prediction access
      console.log('[CHECK-ACCESS] Using localStorage mode')
      // In localStorage mode, we can't easily check prediction access without more complex logic
      // For now, assume no access in localStorage mode (predictions require database)
      hasAccess = false
      console.log('[CHECK-ACCESS] LocalStorage mode - assuming no access')
    }

    console.log('[CHECK-ACCESS] Final access result:', hasAccess)

    if (!hasAccess) {
      // Payment required - frontend should create payment
      console.log('[CHECK-ACCESS] Access denied - payment required')
      return NextResponse.json({ hasAccess: false, message: "Payment required for predictions access" })
    }

    console.log('[CHECK-ACCESS] Access granted')
    return NextResponse.json({
      hasAccess
    })

  } catch (error) {
    console.error('[CHECK-ACCESS] ===== INTERNAL SERVER ERROR =====')
    console.error('[CHECK-ACCESS] Error details:', error)
    console.error('[CHECK-ACCESS] Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    console.error('[CHECK-ACCESS] Error message:', error instanceof Error ? error.message : String(error))
    console.error('[CHECK-ACCESS] Error type:', typeof error)
    console.error('[CHECK-ACCESS] Error constructor:', error?.constructor?.name)

    // Log additional context
    console.error('[CHECK-ACCESS] Environment check:')
    console.error('[CHECK-ACCESS] - DATABASE_URL exists:', !!process.env.DATABASE_URL)
    console.error('[CHECK-ACCESS] - DATABASE_URL value:', process.env.DATABASE_URL ? 'present' : 'missing')

    return NextResponse.json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}