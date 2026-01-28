import { type NextRequest, NextResponse } from "next/server"
import { verifyAndDeleteOTP } from "@/lib/otp-store"
import { neon } from "@neondatabase/serverless"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, otp } = body

    console.log("[v0] Verify OTP request for email:", email)

    if (!email || !otp) {
      console.log("[v0] Missing email or OTP")
      return NextResponse.json({ success: false, error: "Email and OTP are required" }, { status: 400 })
    }
    const trimmedOtp = otp.toString().trim()
    // Development/test overrides
    if (process.env.NODE_ENV !== "production") {
      if (process.env.ALLOW_ANY_OTP === "true") {
        console.warn('[v0] Development override: ALLOW_ANY_OTP is enabled — accepting any OTP')
      } else if (process.env.MASTER_OTP && trimmedOtp === process.env.MASTER_OTP) {
        console.warn('[v0] Development override: MASTER_OTP matched — accepting OTP')
      } else {
        const verification = await verifyAndDeleteOTP(email, trimmedOtp)
        if (!verification.valid) {
          console.log("[v0] OTP verification failed:", verification.reason)
          return NextResponse.json({ success: false, error: verification.reason }, { status: 400 })
        }
      }
    } else {
      const verification = await verifyAndDeleteOTP(email, trimmedOtp)
      if (!verification.valid) {
        console.log("[v0] OTP verification failed:", verification.reason)
        return NextResponse.json({ success: false, error: verification.reason }, { status: 400 })
      }
    }

    console.log("[v0] OTP verified successfully for:", email)

    const emailLower = email.toLowerCase()
    let userId: string
    let userBalance: number = 1000000 // Default balance
    let isNewUser: boolean = false

    // Check if database is configured and not dummy
    const useDatabase = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('dummy')

    if (useDatabase) {
      try {
        const sql = neon(process.env.DATABASE_URL!)
        // Check if user exists in database
        const existingUser = await sql`SELECT id, balance FROM users WHERE email = ${emailLower}`

        if (existingUser.length === 0) {
          // Create new user with starting balance
          const newUserResult = await sql`
            INSERT INTO users (email, name, balance, is_prediction_paid, created_at)
            VALUES (${emailLower}, ${email.split("@")[0]}, 1000000, false, NOW())
            RETURNING id, balance
          `
          userId = newUserResult[0].id
          userBalance = newUserResult[0].balance
          isNewUser = true
          console.log("[v0] New user created:", emailLower, "with balance: ₹1000000")
        } else {
          // User exists, get their current balance
          userId = existingUser[0].id
          userBalance = existingUser[0].balance
          console.log("[v0] Existing user logged in:", emailLower, "balance: ₹" + userBalance)
        }
      } catch (dbError) {
        console.warn("[v0] Database error, falling back to localStorage:", dbError)
        userId = emailLower // Use email as ID for local
        isNewUser = true // Assume new if database error
      }
    } else {
      // Use localStorage logic
      userId = emailLower
      isNewUser = true // For localStorage, always treat as new for now
      console.log("[v0] Using localStorage for user:", emailLower, "balance: ₹1000000")
    }

    // Create session token
    const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36)

    // Store session in database if using database
    if (useDatabase) {
      try {
        const sql = neon(process.env.DATABASE_URL!)
        await sql`
          INSERT INTO user_sessions (user_id, session_token, created_at, last_active)
          VALUES (${userId}, ${sessionToken}, NOW(), NOW())
        `
        console.log("[v0] Session created in database for user:", userId)
      } catch (dbError) {
        console.warn("[v0] Failed to create database session:", dbError)
      }
    }

    // Set session_token cookie for authentication
    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: {
        email: emailLower,
        id: userId,
        balance: userBalance,
      },
      sessionToken,
      isNewUser,
    })
    response.cookies.set('session_token', sessionToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
    return response
  } catch (error) {
    console.error("[v0] Error in verify-otp:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to verify OTP",
      },
      { status: 500 },
    )
  }
}
