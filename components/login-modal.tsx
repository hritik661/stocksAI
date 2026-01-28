"use client"

import React, { useEffect, useState } from "react"
import { LoginForm } from "./login-form"

export default function LoginModal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const openHandler = () => setVisible(true)
    const openListener = (e: Event) => openHandler()
    const closeListener = (e: Event) => setVisible(false)
    window.addEventListener("open-login", openListener as EventListener)
    window.addEventListener("close-login", closeListener as EventListener)

    // show if URL contains ?showLogin
    try {
      if (typeof window !== "undefined" && window.location.search.includes("showLogin")) {
        setVisible(true)
      }
    } catch {}

    return () => {
      window.removeEventListener("open-login", openListener as EventListener)
      window.removeEventListener("close-login", closeListener as EventListener)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setVisible(false)}
        aria-hidden
      />

      <div className="relative w-full h-full">
        <div className="flex items-center justify-center h-full p-4">
          <div className="w-full h-full max-w-4xl max-h-[96vh] overflow-auto rounded-2xl bg-card/80 glass border border-border shadow-2xl">
            <div className="absolute right-4 top-4 z-50">
              <button aria-label="Close" onClick={() => setVisible(false)} className="modal-close-large">
                ✕
              </button>
            </div>
            <div className="h-full">
              <LoginForm full />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
