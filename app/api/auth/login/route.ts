import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Valid email is required" }, { status: 400 })
    }

    // Create a simple session token and user object for development.
    const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36)
    const user = {
      email,
      name: name || email.split("@")[0],
      id: email.replace(/[^a-zA-Z0-9]/g, "_"),
      balance: 1000000,
    }

    return NextResponse.json({ success: true, message: "Login successful", user, sessionToken })
  } catch (error) {
    console.error("[v0] Error in login:", error)
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Login failed" }, { status: 500 })
  }
}
