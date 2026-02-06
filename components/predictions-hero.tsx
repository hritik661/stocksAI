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
    // Check session from backend
    const authCheck = await fetch('/api/auth/me')
    if (!authCheck.ok) {
      alert('Please sign in to continue to payment.')
      return
    }

    // Proceed with payment directly
    const res = await fetch('/api/predictions/create-payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
    const data = await res.json();
    if (data.paymentLink) {
      const paymentWindow = window.open(
        data.paymentLink,
        '_blank',
        'width=500,height=700'
      );

      const checkPayment = setInterval(async () => {
        if (paymentWindow && paymentWindow.closed) {
          clearInterval(checkPayment);
          // Wait for webhook to process
          await new Promise(resolve => setTimeout(resolve, 2000));
          // Verify payment and redirect
          try {
            const verifyRes = await fetch(`/api/auth/me?t=${Date.now()}`, { cache: 'no-store' })
            if (verifyRes.ok) {
              const userData = await verifyRes.json()
              if (userData?.user?.isPredictionPaid) {
                // Payment successful - update auth and redirect
                if (markPredictionsAsPaid) markPredictionsAsPaid()
                if (setUserFromData && userData.user) setUserFromData(userData.user)
                window.location.href = '/predictions?from=payment&success=true'
                return
              }

              // If running locally the webhook may not be reachable. Provide a local fallback:
              const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
              if (hostname === 'localhost' || hostname === '127.0.0.1') {
                // mark user locally as having access so predictions show immediately in dev
                try {
                  if (setUserFromData) {
                    const patchedUser = { ...(currentUser || {}), isPredictionPaid: true }
                    setUserFromData(patchedUser)
                  }
                  try { localStorage.setItem('predictions_access', 'true') } catch {}
                  // redirect back to predictions and show list
                  window.location.href = '/predictions?from=payment&success=true&local=true'
                  return
                } catch (e) {
                  // fallback to normal redirect
                }
              }

              alert('Payment verification in progress. Please refresh the page.')
              window.location.href = '/predictions'
            }
          } catch (e) {
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
        {/* Smaller Header */}
          <div className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-6">
          <div className="h-10 w-10 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center shrink-0">
            <Zap className="h-6 w-6 sm:h-10 sm:w-10 text-primary animate-pulse" />
          </div>
          <div>
            <h2 className="text-base sm:text-2xl font-extrabold text-foreground mb-1 sm:mb-2">AI-Powered Stock Predictions</h2>
            <p className="text-xs sm:text-lg text-muted-foreground max-w-xs sm:max-w-xl">Advanced machine learning models analyzing real-time market data to predict stock movements with 85%+ accuracy</p>
          </div>
        </div>

        {/* Smaller Payment Button with Revert Option */}
        <div className="mb-4 sm:mb-6 flex gap-3 flex-wrap">
          <button
            className="bg-primary text-white px-4 py-2 sm:px-8 sm:py-3 rounded-lg sm:rounded-xl font-bold shadow-lg hover:bg-primary/80 transition text-sm sm:text-lg"
            onClick={() => handlePredictionClick(setShowModal, markPredictionsAsPaid, setUserFromData, user)}
          >
            Access Predictions (Pay to Continue)
          </button>
          <button
            className="bg-red-600/80 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-bold shadow-lg hover:bg-red-700 transition text-base sm:text-lg"
            onClick={async () => {
              try {
                const res = await fetch('/api/predictions/revert-payment', { 
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' }
                })
                if (res.ok) {
                  const data = await res.json()
                  alert('Payment has been reverted. Please make a new payment to access predictions.')
                  window.location.href = '/predictions'
                } else {
                  const err = await res.json()
                  alert(err.error || 'Failed to revert payment')
                }
              } catch (err) {
                alert('Error reverting payment. Please try again.')
              }
            }}
          >
            Revert Payment
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

        {/* Smaller Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {[ 
            { icon: Brain, label: "AI Models", value: "50+" },
            { icon: TrendingUp, label: "Accuracy", value: "85%+" },
            { icon: Zap, label: "Updates", value: "Real-time" },
            { icon: Sparkles, label: "Coverage", value: "Nifty 50" },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="glass-morphism rounded-xl sm:rounded-2xl p-3 sm:p-5 flex items-center gap-2 sm:gap-4">
                <Icon className="h-5 w-5 sm:h-7 sm:w-7 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-sm md:text-base text-muted-foreground leading-tight">{item.label}</p>
                  <p className="font-bold text-sm sm:text-base md:text-lg text-gradient leading-tight">{item.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
