// Shared OTP store for send-otp and verify-otp routes
// In production, OTPs are stored in the database for serverless compatibility

import { neon } from "@neondatabase/serverless"

interface OTPEntry {
  code: string
  expiresAt: number
  email: string
}

const otpStore = new Map<string, OTPEntry>()

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function storeOTP(email: string, code: string): Promise<void> {
  const expiresAt = Date.now() + 15 * 60 * 1000 // 15 minutes

  // Check if database is configured
  const useDatabase = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('dummy')

  if (useDatabase) {
    try {
      const sql = neon(process.env.DATABASE_URL!)
      // Delete any existing OTP for this email
      await sql`DELETE FROM otp_codes WHERE email = ${email.toLowerCase()}`
      // Insert new OTP - convert Unix timestamp to PostgreSQL timestamp
      const expiresAtTimestamp = new Date(expiresAt).toISOString()
      await sql`INSERT INTO otp_codes (email, code, expires_at) VALUES (${email.toLowerCase()}, ${code}, ${expiresAtTimestamp})`
      console.log("[v0] OTP stored for:", email, "expires at:", new Date(expiresAt).toISOString())
    } catch (dbError) {
      console.warn("[v0] Database error storing OTP, falling back to memory:", dbError)
      // Fallback to in-memory storage
      otpStore.set(email, { code, expiresAt, email })
      console.log("[v0] OTP stored in memory for:", email, "expires at:", new Date(expiresAt).toISOString())
    }
  } else {
    // Use in-memory storage for development
    otpStore.set(email, { code, expiresAt, email })
    console.log("[v0] OTP stored in memory for:", email, "expires at:", new Date(expiresAt).toISOString())
  }
}

export async function getOTP(email: string): Promise<OTPEntry | undefined> {
  // Check if database is configured
  const useDatabase = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('dummy')

  if (useDatabase) {
    try {
      const sql = neon(process.env.DATABASE_URL!)
      const result = await sql`SELECT code, expires_at FROM otp_codes WHERE email = ${email.toLowerCase()}`
      if (result.length > 0) {
        // expires_at is now stored as ISO timestamp string, convert to Unix timestamp
        const expiresAtTimestamp = new Date(result[0].expires_at).getTime()
        return {
          code: result[0].code,
          expiresAt: expiresAtTimestamp,
          email: email.toLowerCase()
        }
      }
    } catch (dbError) {
      console.warn("[v0] Database error getting OTP, checking memory:", dbError)
      // Fallback to in-memory storage
      return otpStore.get(email)
    }
  }

  // Fallback to in-memory storage
  return otpStore.get(email)
}

export async function verifyAndDeleteOTP(email: string, code: string): Promise<{ valid: boolean; reason?: string }> {
  const emailLower = email.toLowerCase()
  console.log("[v0] Verifying OTP for email:", emailLower, "code:", code)

  // Check if database is configured
  const useDatabase = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('dummy')

  if (useDatabase) {
    try {
      const sql = neon(process.env.DATABASE_URL!)
      console.log("[v0] Checking database for OTP...")
      const result = await sql`SELECT code, expires_at FROM otp_codes WHERE email = ${emailLower}`

      console.log("[v0] Database query result:", result)

      if (result.length === 0) {
        console.log("[v0] No OTP found in database for email:", emailLower)
        return { valid: false, reason: "OTP not found. Please request a new one." }
      }

      const storedCode = result[0].code
      // expires_at is stored as ISO timestamp, convert to Unix timestamp for comparison
      const expiresAt = new Date(result[0].expires_at).getTime()

      console.log("[v0] Stored code:", storedCode, "Expires at:", new Date(expiresAt).toISOString())
      console.log("[v0] Current time:", new Date().toISOString())

      if (storedCode !== code) {
        console.log("[v0] Code mismatch - stored:", storedCode, "provided:", code)
        return { valid: false, reason: "Invalid OTP code." }
      }

      if (expiresAt < Date.now()) {
        console.log("[v0] OTP expired")
        await sql`DELETE FROM otp_codes WHERE email = ${emailLower}`
        return { valid: false, reason: "OTP has expired. Please request a new one." }
      }

      // OTP is valid - delete it
      console.log("[v0] OTP valid, deleting from database")
      await sql`DELETE FROM otp_codes WHERE email = ${emailLower}`
      return { valid: true }
    } catch (dbError) {
      console.warn("[v0] Database error verifying OTP:", dbError)
      // Fallback to in-memory verification
    }
  }

  // Fallback to in-memory verification
  console.log("[v0] Falling back to in-memory verification")
  const storedOTP = otpStore.get(emailLower)

  if (!storedOTP) {
    console.log("[v0] No OTP found in memory for email:", emailLower)
    return { valid: false, reason: "OTP not found. Please request a new one." }
  }

  if (storedOTP.code !== code) {
    console.log("[v0] Code mismatch in memory")
    return { valid: false, reason: "Invalid OTP code." }
  }

  if (storedOTP.expiresAt < Date.now()) {
    console.log("[v0] OTP expired in memory")
    otpStore.delete(emailLower)
    return { valid: false, reason: "OTP has expired. Please request a new one." }
  }

  // OTP is valid - delete it
  console.log("[v0] OTP valid in memory, deleting")
  otpStore.delete(emailLower)
  return { valid: true }
}

export async function deleteOTP(email: string): Promise<void> {
  // Check if database is configured
  const useDatabase = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('dummy')

  if (useDatabase) {
    try {
      const sql = neon(process.env.DATABASE_URL!)
      await sql`DELETE FROM otp_codes WHERE email = ${email.toLowerCase()}`
    } catch (dbError) {
      console.warn("[v0] Database error deleting OTP:", dbError)
    }
  }

  // Also clean up in-memory storage
  otpStore.delete(email)
}
