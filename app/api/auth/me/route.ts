import { NextResponse, type NextRequest } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: NextRequest) {
  try {
    const cookie = request.cookies.get("session_token")
    const token = cookie?.value
    if (!token) return NextResponse.json({ success: false }, { status: 401 })

    const useDatabase = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('dummy')
    if (!useDatabase) return NextResponse.json({ success: false }, { status: 401 })

    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`
      SELECT u.id, u.email, u.name, u.balance, u.is_prediction_paid, u.is_top_gainer_paid
      FROM user_sessions s
      JOIN users u ON u.id = s.user_id
      WHERE s.session_token = ${token}
      LIMIT 1
    `

    if (!rows || rows.length === 0) return NextResponse.json({ success: false }, { status: 401 })

    const u = rows[0]
    const response = NextResponse.json({ success: true, user: { id: u.id, email: u.email, name: u.name, balance: Number(u.balance || 0), isPredictionPaid: !!u.is_prediction_paid, isTopGainerPaid: !!u.is_top_gainer_paid } })
    
    // CRITICAL: Force no-cache to always get fresh data from DB
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (err) {
    console.error("/api/auth/me error:", err)
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}
