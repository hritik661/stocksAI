"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name?: string
  balance: number
  isPredictionPaid?: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithOTP: (email: string, otp: string) => Promise<{ success: boolean; error?: string; isNewUser?: boolean }>
  signup: (email: string, name: string | undefined, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateBalance: (amount: number) => void
  markPredictionsAsPaid: () => void
  setUserFromData: (user: User) => void
  refreshBalanceFromDatabase: () => Promise<void>
  // Note: auth is local-only and stored in localStorage. Not secure for production.
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = () => {
      const sessionToken = localStorage.getItem("hrtik_stocks_session_token")
      if (sessionToken) {
        // In a real app, validate session token with backend
        const storedUser = localStorage.getItem("hrtik_stocks_user")
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser))
          } catch {
            localStorage.removeItem("hrtik_stocks_user")
          }
        }
      }
      setIsLoading(false)
    }
    initializeAuth()

    // Listen for storage changes (logout/login in other tabs) and update state
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "hrtik_stocks_user") {
        if (e.newValue) {
          try {
            setUser(JSON.parse(e.newValue))
          } catch {
            setUser(null)
          }
        } else {
          setUser(null)
        }
      }
      if (e.key === "hrtik_stocks_session_token" && !e.newValue) {
        setUser(null)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorage)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorage)
      }
    }
  }, [])

  // Simple local-only auth store using localStorage. Not secure for production.
  const USERS_KEY = "hrtik_stocks_users"

  const hashPassword = async (password: string) => {
    if (typeof window === "undefined" || !password) return ""
    const enc = new TextEncoder()
    const data = enc.encode(password)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  }

  const readUsers = (): Record<string, any> => {
    try {
      const raw = localStorage.getItem(USERS_KEY)
      if (!raw) return {}
      return JSON.parse(raw)
    } catch {
      return {}
    }
  }

  const writeUsers = (u: Record<string, any>) => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(u))
    } catch {}
  }

  const signup = async (email: string, name: string | undefined, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!email || !password) return { success: false, error: "Email and password are required" }
      const users = readUsers()
      const key = email.toLowerCase()
      if (users[key]) return { success: false, error: "Account already exists for this email" }

      const passwordHash = await hashPassword(password)
      const newUser = {
        id: `${Date.now()}`,
        email: key,
        name: name || "",
        passwordHash,
        balance: 1000000,
        isPredictionPaid: false,
      }
      users[key] = newUser
      writeUsers(users)

      // create session
      localStorage.setItem("hrtik_stocks_session_token", `local:${key}:${Date.now()}`)
      localStorage.setItem("hrtik_stocks_user", JSON.stringify({ id: newUser.id, email: newUser.email, name: newUser.name, balance: newUser.balance, isPredictionPaid: newUser.isPredictionPaid }))
      setUser({ id: newUser.id, email: newUser.email, name: newUser.name, balance: newUser.balance, isPredictionPaid: newUser.isPredictionPaid })

      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Signup failed" }
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!email || !password) return { success: false, error: "Email and password are required" }
      const users = readUsers()
      const key = email.toLowerCase()
      const found = users[key]
      if (!found) return { success: false, error: "No account found for this email" }
      const passwordHash = await hashPassword(password)
      if (passwordHash !== found.passwordHash) return { success: false, error: "Invalid credentials" }

      const userData = { id: found.id, email: found.email, name: found.name, balance: typeof found.balance === 'number' ? found.balance : 1000000, isPredictionPaid: !!found.isPredictionPaid }
      const sessionToken = `local:${key}:${Date.now()}`
      localStorage.setItem("hrtik_stocks_session_token", sessionToken)
      localStorage.setItem("hrtik_stocks_user", JSON.stringify(userData))
      
      // Set session token as cookie for API access
      document.cookie = `session_token=${sessionToken}; path=/; max-age=86400; samesite=strict`
      
      setUser(userData)
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Login failed" }
    }
  }

  

  const logout = () => {
    // Remove session and user first, then update in-memory state and navigate.
    try {
      if (typeof window !== "undefined") {
        // clear session keys
        const storedUserRaw = localStorage.getItem("hrtik_stocks_user")
        let userEmail: string | null = null
        try {
          if (storedUserRaw) {
            const parsed = JSON.parse(storedUserRaw)
            userEmail = parsed?.email || null
          }
        } catch {}

        localStorage.removeItem("hrtik_stocks_session_token")
        localStorage.removeItem("hrtik_stocks_user")
        
        // Clear session cookie
        document.cookie = "session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

        // DO NOT remove user-specific persisted data on logout.
        // Keeping `holdings_{email}`, `options_positions_{email}`, and `last_prices_{email}`
        // preserves user portfolio and history across logins.

        // write a small signout flag to trigger storage events in other tabs
        try {
          localStorage.setItem("hrtik_stocks_signed_out", Date.now().toString())
        } catch {}
      }
    } catch {}

    setUser(null)

    // Navigate to home and attempt a refresh; swallow any errors to avoid crashing UI on logout.
    try {
      router.push("/")
    } catch {}
    try {
      router.refresh()
    } catch {}
    // Force a full reload to ensure any cached state is cleared and user sees the landing page.
    try {
      if (typeof window !== "undefined") {
        // replace to avoid keeping history entry
        window.location.replace("/")
      }
    } catch {}
  }

  const updateBalance = async (amount: number) => {
    if (user) {
      const newBalance = user.balance + amount
      const updatedUser = { ...user, balance: newBalance }
      setUser(updatedUser)
      localStorage.setItem("hrtik_stocks_user", JSON.stringify(updatedUser))
      try {
        const users = readUsers()
        const key = updatedUser.email.toLowerCase()
        if (!users[key]) {
          users[key] = {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            balance: 1000000,
            isPredictionPaid: updatedUser.isPredictionPaid,
          }
        }
        users[key].balance = updatedUser.balance
        writeUsers(users)
      } catch {}

      // Update balance in database
      try {
        await fetch("/api/balance/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, balance: newBalance }),
        })
      } catch (error) {
        console.error("Failed to update balance in database:", error)
      }
    }
  }

  const markPredictionsAsPaid = () => {
    if (user) {
      const updatedUser = { ...user, isPredictionPaid: true }
      setUser(updatedUser)
      localStorage.setItem("hrtik_stocks_user", JSON.stringify(updatedUser))
      try {
        const users = readUsers()
        const key = updatedUser.email.toLowerCase()
        if (users[key]) {
          users[key].isPredictionPaid = true
          writeUsers(users)
        }
      } catch {}
    }
  }

  const loginWithOTP = async (email: string, otp: string): Promise<{ success: boolean; error?: string; isNewUser?: boolean }> => {
    try {
      if (!email || !otp) return { success: false, error: "Email and OTP are required" }
      
      // Verify OTP
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase(), otp }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        return { success: false, error: data.error || "OTP verification failed" }
      }

      // Set user from response data (use database balance - source of truth)
      const userData = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name || data.user.email.split("@")[0],
        balance: isNaN(data.user.balance) ? 1000000 : Number(data.user.balance) || 1000000,
        isPredictionPaid: data.user.isPredictionPaid || false,
      }

      setUser(userData)
      localStorage.setItem("hrtik_stocks_session_token", data.sessionToken)
      localStorage.setItem("hrtik_stocks_user", JSON.stringify(userData))
      
      // Set session token as cookie for API access
      document.cookie = `session_token=${data.sessionToken}; path=/; max-age=86400; samesite=strict`

      // Update persistent users storage
      try {
        const users = readUsers()
        const key = userData.email.toLowerCase()
        users[key] = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          balance: userData.balance,
          isPredictionPaid: userData.isPredictionPaid,
        }
        writeUsers(users)
      } catch {}

      return { success: true, isNewUser: data.isNewUser }
    } catch (err) {
      console.error("[v0] OTP login error:", err)
      return { success: false, error: err instanceof Error ? err.message : "OTP login failed" }
    }
  }

  // Refresh balance from database (source of truth)
  const refreshBalanceFromDatabase = async () => {
    if (!user) return
    try {
      const response = await fetch("/api/balance/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      })
      const data = await response.json()
      if (data.balance !== undefined) {
        const dbBalance = Number(data.balance) || 1000000
        if (dbBalance !== user.balance) {
          const updatedUser = { ...user, balance: dbBalance }
          setUser(updatedUser)
          localStorage.setItem("hrtik_stocks_user", JSON.stringify(updatedUser))
        }
      }
    } catch (error) {
      console.error("Failed to refresh balance:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, loginWithOTP, signup, logout, updateBalance, markPredictionsAsPaid, setUserFromData: setUser, refreshBalanceFromDatabase }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
