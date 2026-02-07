"use client"

import { Sparkles, TrendingUp, Brain, Zap, X, Check } from "lucide-react"
import React, { useState } from 'react';
import { useAuth } from "@/contexts/auth-context"


const handlePredictionClick = async (
  showModal: (value: boolean) => void,
  markPredictionsAsPaid?: () => void,
  setUserFromData?: (user: any) => void,
  currentUser?: any
) => {
  // Directly initiate payment without showing modal first
  try {
    // Check session from backend with proper cache-busting
    const authCheck = await fetch('/api/auth/me?t=' + Date.now(), {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
    if (!authCheck.ok) {
      alert('Please sign in to continue to payment.')
      return
    }

    // Proceed with payment directly
    const res = await fetch('/api/predictions/create-payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
    const data = await res.json();
    if (data.paymentLink) {
      const orderId = data.orderId || data.order_id || data.order || null
      const paymentWindow = window.open(
        data.paymentLink,
        '_blank',
        'width=500,height=700'
      );

      const checkPayment = setInterval(async () => {
        if (paymentWindow && paymentWindow.closed) {
          clearInterval(checkPayment);
          // Try server-side verify by orderId first so webhook or DB is authoritative
          try {
            let verified = false
            if (orderId) {
              try {
                const v = await fetch(`/api/predictions/verify-payment?order_id=${encodeURIComponent(orderId)}&api=1`, { headers: { Accept: 'application/json' } })
                if (v.ok) {
                  const json = await v.json()
                  if (json?.verified) verified = true
                }
              } catch (err) {
                console.warn('[PREDICTION] verify-payment api failed', err)
              }
            }

            // Fallback to /api/auth/me if verify-payment didn't confirm
            if (!verified) {
              // Give webhook a short grace period then check auth/me
              await new Promise(resolve => setTimeout(resolve, 1200))
              const verifyRes = await fetch(`/api/auth/me?t=${Date.now()}`, { cache: 'no-store' })
              if (verifyRes.ok) {
                const userData = await verifyRes.json()
                if (userData?.user?.isPredictionPaid) verified = true
                if (userData?.user && setUserFromData) setUserFromData(userData.user)
              }
            }

            if (verified) {
              if (markPredictionsAsPaid) markPredictionsAsPaid()
              // Redirect to predictions so page gating shows full access
              window.location.href = '/predictions?from=payment&success=true'
              return
            }

            // Not verified yet
            alert('Payment verification pending. Please refresh the page in a moment.')
            window.location.href = '/predictions'
          } catch (e) {
            console.error('Payment verification failed:', e)
            alert('Payment verification failed. Redirecting to predictions...');
            window.location.href = '/predictions'
          }
        }
      }, 500);
    } else {
      alert(data.error || 'Failed to create payment.');
    }
  } catch (err) {
    alert('Error initiating payment. Please try again.');
  }
};

export default function PredictionsHero() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { markPredictionsAsPaid, setUserFromData, user } = useAuth()

  // Auto-redirect after showing success message
  React.useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(async () => {
        try {
          if (markPredictionsAsPaid) await markPredictionsAsPaid()
        } catch (e) {
          // fallback: request /api/auth/me to refresh
          try { await fetch('/api/auth/me') } catch (err) {}
        }
        // Refresh the page to show predictions
        window.location.href = '/predictions?from=payment'
      }, 3000) // Show success message for 3 seconds then redirect
      
      return () => clearTimeout(timer)
    }
  }, [showSuccess, markPredictionsAsPaid])
  return (
    <div className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-2xl border border-primary/20 p-4 sm:p-6 md:p-12 lg:p-16 overflow-hidden mb-8 animate-fade-in-up max-w-4xl ml-0 md:ml-8">
      {/* Smaller background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-primary/10 rounded-full blur-2xl -mr-8 -mt-8 sm:-mr-24 sm:-mt-24 md:-mr-32 md:-mt-32 opacity-30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-accent/10 rounded-full blur-2xl -ml-8 -mb-8 sm:-ml-24 sm:-mb-24 md:-ml-32 md:-mb-32 opacity-30" />

      <div className="relative z-10">
        {/* Smaller Header - Increased Logo Size */}
          <div className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-6">
          <div className="h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center shrink-0">
            <Zap className="h-7 w-7 sm:h-12 sm:w-12 md:h-14 md:w-14 text-primary animate-pulse" />
          </div>
          <div>
            <h2 className="text-base sm:text-2xl font-extrabold text-foreground mb-1 sm:mb-2">AI-Powered Stock Predictions</h2>
            <p className="text-xs sm:text-lg text-muted-foreground max-w-xs sm:max-w-xl">Advanced machine learning models analyzing real-time market data to predict stock movements with 85%+ accuracy</p>
          </div>
        </div>

        {/* Smaller Payment Button with Revert Option */}
        <div className="mb-4 sm:mb-6 flex gap-2 sm:gap-3 flex-wrap">
          <button
            className="bg-primary text-white px-3 py-1 sm:px-8 sm:py-3 rounded-lg sm:rounded-xl font-bold shadow-lg hover:bg-primary/80 transition text-xs sm:text-lg"
            onClick={() => handlePredictionClick(setShowModal, markPredictionsAsPaid, setUserFromData, user)}
          >
            Access Predictions (Pay to Continue)
          </button>
          <button
            className="bg-red-600/80 text-white px-3 py-1 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-bold shadow-lg hover:bg-red-700 transition text-xs sm:text-lg"
            onClick={async () => {
              try {
                const ok = confirm('Are you sure you want to revoke prediction access? You will need to pay again to regain access.')
                if (!ok) return

                const res = await fetch('/api/predictions/revert-payment', { 
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' }
                })
                if (!res.ok) {
                  const err = await res.json().catch(() => ({}))
                  alert(err?.error || 'Failed to revert payment')
                  return
                }

                // Don't reload or log out. Instead, prompt user to pay again immediately.
                // Update local auth state to reflect revoked access (if possible)
                try {
                  const json = await res.json()
                  if (json?.user && setUserFromData) setUserFromData(json.user)
                } catch (e) {}

                // Start payment flow so user can repurchase access
                try {
                  await handlePredictionClick(setShowModal, markPredictionsAsPaid, setUserFromData, user)
                } catch (e) {
                  console.error('Failed to start payment after revert:', e)
                }
              } catch (err) {
                console.error('Revert payment error:', err)
              }
            }}
          >
            Revoke & Repurchase
          </button>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-in fade-in">
            <div className="bg-card border-2 border-emerald-600/60 rounded-lg max-w-xs w-full shadow-xl animate-in zoom-in-95">
              <div className="p-3 sm:p-4 text-center space-y-2 sm:space-y-2.5">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="h-12 w-12 rounded-full bg-emerald-700/20 border-2 border-emerald-600 flex items-center justify-center animate-bounce">
                    <Check className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>

                {/* Success Message */}
                <div className="space-y-1 animate-slide-in-up">
                  <h2 className="text-xl sm:text-2xl font-bold text-emerald-400">🎉 Success!</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">Payment processed.</p>
                </div>

                {/* Success Details */}
                <div className="bg-emerald-700/15 border border-emerald-600/40 rounded-md p-2 sm:p-2.5 space-y-1 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                  <p className="text-[10px] font-bold text-foreground">✅ Lifetime Access</p>
                  <p className="text-[10px] text-muted-foreground">Enjoy all predictions forever</p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full px-3 py-1.5 rounded-md bg-primary hover:bg-primary/90 text-white font-bold transition text-xs"
                >
                  View Predictions
                </button>

                {/* Loading indicator */}
                <div className="flex items-center justify-center gap-0.5 text-primary">
                  <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  <span className="text-[10px] text-muted-foreground ml-1">Redirecting...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Row - No background on laptop, smaller on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {[ 
            { icon: Brain, label: "AI Models", value: "50+" },
            { icon: TrendingUp, label: "Accuracy", value: "85%+" },
            { icon: Zap, label: "Updates", value: "Real-time" },
            { icon: Sparkles, label: "Coverage", value: "Nifty 50" },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="md:bg-transparent sm:glass-morphism rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <Icon className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-xs md:text-sm text-muted-foreground leading-tight">{item.label}</p>
                  <p className="font-bold text-xs sm:text-sm md:text-base text-gradient leading-tight">{item.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
