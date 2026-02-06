import { NextResponse, type NextRequest } from "next/server"
import { neon } from "@neondatabase/serverless"

/**
 * Update last trading prices for holdings
 * Called when user views portfolio to save current prices
 * Ensures P&L persists even after market closes
 */
export async function POST(request: NextRequest) {
  try {
    const { email, prices } = await request.json() // prices: { symbol: price, ... }

    if (!email || !prices || typeof prices !== "object") {
      return NextResponse.json(
        { success: false, error: "Valid email and prices object required" },
        { status: 400 }
      )
    }

    // Check if database is configured
    const useDatabase = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('dummy')

    if (!useDatabase) {
      // If no database, just succeed with localStorage fallback
      return NextResponse.json({ success: true, source: "localStorage" })
    }

    const sql = neon(process.env.DATABASE_URL)
    const normalizedEmail = email.toLowerCase().trim()

    try {
      // Get user
      const userResult = await sql`
        SELECT id FROM users WHERE LOWER(TRIM(email)) = ${normalizedEmail}
      `

      if (!userResult || userResult.length === 0) {
        // User doesn't exist in database, just use localStorage
        return NextResponse.json({ success: true, source: "localStorage_user_not_found" })
      }

      const userId = userResult[0].id

      // Update prices for each holding
      for (const [symbol, price] of Object.entries(prices)) {
        if (typeof price === "number" && !isNaN(price) && price > 0) {
          await sql`
            UPDATE holdings
            SET last_trading_price = ${price}, updated_at = NOW()
            WHERE user_id = ${userId} AND symbol = ${symbol}
          `
        }
      }

      console.log(`[v0] Updated last trading prices for ${email}: ${Object.keys(prices).length} symbols`)

      return NextResponse.json({
        success: true,
        source: "database",
        pricesUpdated: Object.keys(prices).length,
      })
    } catch (dbError) {
      console.warn("[v0] Error updating prices in database:", dbError)
      // Fall back gracefully - localStorage will handle it
      return NextResponse.json({
        success: true,
        source: "localStorage_fallback",
        warning: "Database unavailable, using localStorage",
      })
    }
  } catch (error) {
    console.error("[v0] Error updating prices:", error)
    return NextResponse.json(
      { success: true, source: "localStorage_error_fallback" },
      { status: 200 } // Return 200 so client doesn't retry unnecessarily
    )
  }
}

/**
 * GET last trading prices for a user
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      )
    }

    // Check if database is configured
    const useDatabase = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('dummy')

    if (!useDatabase) {
      return NextResponse.json({ success: true, prices: {} })
    }

    const sql = neon(process.env.DATABASE_URL)
    const normalizedEmail = email.toLowerCase().trim()

    try {
      const userResult = await sql`
        SELECT id FROM users WHERE LOWER(TRIM(email)) = ${normalizedEmail}
      `

      if (!userResult || userResult.length === 0) {
        return NextResponse.json({ success: true, prices: {} })
      }

      const userId = userResult[0].id

      const holdings = await sql`
        SELECT symbol, last_trading_price
        FROM holdings
        WHERE user_id = ${userId} AND last_trading_price IS NOT NULL AND last_trading_price > 0
      `

      const prices: { [key: string]: number } = {}
      holdings.forEach((h: any) => {
        prices[h.symbol] = parseFloat(h.last_trading_price.toString())
      })

      return NextResponse.json({ success: true, prices })
    } catch (dbError) {
      console.warn("[v0] Error fetching prices from database:", dbError)
      return NextResponse.json({ success: true, prices: {} })
    }
  } catch (error) {
    console.error("[v0] Error getting prices:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch prices" },
      { status: 500 }
    )
  }
}
