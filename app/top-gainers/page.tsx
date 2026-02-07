"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { IndicesTicker } from "@/components/indices-ticker"
import { NewsSection } from "@/components/news-section"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Sparkles, Lock, TrendingUp } from "lucide-react"

export default function TopGainersPage() {
  const { user, isLoading, setUserFromData } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [authReady, setAuthReady] = useState(false)
  const [verifiedPaymentStatus, setVerifiedPaymentStatus] = useState<boolean | null>(null)
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false)
  const [isRefreshingPayment, setIsRefreshingPayment] = useState(false)
  const [topGainers, setTopGainers] = useState<any[]>([])
  const [loadingGainers, setLoadingGainers] = useState(false)

  // Function to verify payment status
  const verifyPayment = async () => {
    if (isRefreshingPayment || !user) return
    
    setIsRefreshingPayment(true)
    try {
      console.log('🔄 Manually refreshing payment status...')
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 8000)

      const res = await fetch('/api/auth/me?t=' + Date.now(), {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal,
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      clearTimeout(timeout)

      if (res.ok) {
        const data = await res.json()
        const paid = data?.user?.isTopGainerPaid === true
        console.log('✅ Payment status refreshed:', paid)
        setVerifiedPaymentStatus(paid)
        
        if (paid) {
          setShowPaymentSuccessModal(true)
        }
      } else {
        console.error('⚠️ Refresh failed with status:', res.status)
      }
    } catch (err) {
      console.error('❌ Payment refresh error:', err)
    } finally {
      setIsRefreshingPayment(false)
    }
  }

  // Fetch top gainers data
  const fetchTopGainers = async () => {
    try {
      setLoadingGainers(true)
      const res = await fetch('/api/stock/gainers-losers?type=gainers&limit=20')
      const data = await res.json()
      if (data.gainers) {
        setTopGainers(data.gainers)
      }
    } catch (err) {
      console.error('Error fetching top gainers:', err)
    } finally {
      setLoadingGainers(false)
    }
  }

  // Verify payment on mount
  useEffect(() => {
    const verifyPaymentStatus = async () => {
      if (isLoading) return

      if (!user) {
        setVerifiedPaymentStatus(null)
        setAuthReady(true)
        return
      }

      try {
        console.log('🔍 Verifying payment status from server...')
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 8000)

        const res = await fetch('/api/auth/me?t=' + Date.now(), {
          method: 'GET',
          cache: 'no-store',
          credentials: 'include',
          signal: controller.signal,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        })
        clearTimeout(timeout)

        if (res.ok) {
          const data = await res.json()
          const paid = data?.user?.isTopGainerPaid === true
          console.log('✅ Payment verified from server:', paid)
          setVerifiedPaymentStatus(paid)

          if (searchParams.get('from') === 'payment' || searchParams.get('success') === 'paid') {
            console.log('✅ User redirected from payment page, payment status:', paid)
            if (paid) {
              setShowPaymentSuccessModal(true)
            }
          }
        } else {
          console.error('⚠️ Auth check failed')
          setVerifiedPaymentStatus(false)
        }
      } catch (err) {
        console.error('❌ Payment verification error:', err)
        setVerifiedPaymentStatus(false)
      } finally {
        setAuthReady(true)
      }
    }

    verifyPaymentStatus()
  }, [user, isLoading, searchParams])

  // Fetch gainers when user is verified as paid
  useEffect(() => {
    if (verifiedPaymentStatus === true) {
      fetchTopGainers()
    }
  }, [verifiedPaymentStatus])

  // Loading state
  if (isLoading || !authReady) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">Verifying payment status...</p>
        </div>
      </div>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-xl mx-auto">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Top Gainer Stocks</h1>
            <p className="text-muted-foreground mb-6">Please sign in to view top gainer stocks.</p>
            <div className="flex justify-center gap-4">
              <Button asChild className="rounded-xl">
                <Link href="/login?callbackUrl=/top-gainers">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl bg-transparent">
                <Link href="/">Back Home</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Paid user - show top gainers
  if (verifiedPaymentStatus === true) {
    return (
      <div className="min-h-screen bg-background">
        <Header hideBalance={true} />
        <div className="hidden md:block">
          <IndicesTicker />
        </div>

        {showPaymentSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-xl mx-4 bg-white dark:bg-card rounded-2xl p-8 shadow-2xl text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4">🎉 Welcome to Top Gainer Stock Module!</h2>
              <p className="text-base text-muted-foreground mb-3">Your payment was successful.</p>
              <p className="text-base font-semibold mb-6">Enjoy exclusive access to top gainer stocks for lifetime. Thank you for choosing Stocks AI 🙏</p>
              <p className="text-sm text-muted-foreground mb-6">📈 Happy Investing!</p>
              <button
                onClick={() => {
                  setShowPaymentSuccessModal(false)
                  router.replace('/top-gainers')
                }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-bold"
              >
                OK
              </button>
            </div>
          </div>
        )}

        <main className="container mx-auto px-3 py-4 md:px-4 md:py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                Top Gainer Stocks
              </h1>
              <p className="text-muted-foreground">Real-time stocks showing highest gains today</p>
            </div>
            <button
              onClick={async () => {
                try {
                  const res = await fetch('/api/top-gainers/revert-payment', { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                  })
                  if (res.ok) {
                    // Silently reload to refresh payment status without alerts
                    window.location.reload()
                  }
                } catch (err) {
                  console.error('Revert payment error:', err)
                }
              }}
              className="px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-700 text-white font-bold text-sm md:text-base transition"
            >
              Revert Payment
            </button>
          </div>

          {loadingGainers ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div key={verifiedPaymentStatus} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topGainers.length > 0 ? (
                topGainers.map((stock: any, idx: number) => (
                  <div
                    key={idx}
                    className="border-2 border-primary/20 bg-card/50 rounded-2xl p-6 hover:border-primary/40 transition-all hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{stock.symbol}</h3>
                        <p className="text-sm text-muted-foreground">{stock.shortName || stock.symbol}</p>
                      </div>
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Price</p>
                        <p className="text-2xl font-bold text-foreground">₹{stock.regularMarketPrice?.toFixed(2) || 'N/A'}</p>
                      </div>
                      
                      <div className="flex gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Change</p>
                          <p className="text-lg font-bold text-green-500">+₹{stock.regularMarketChange?.toFixed(2) || '0'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">% Change</p>
                          <p className="text-lg font-bold text-green-500">+{stock.regularMarketChangePercent?.toFixed(2) || '0'}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No gainers available at the moment</p>
              )}
            </div>
          )}
        </main>
      </div>
    )
  }

  // Unpaid user - show payment gate
  return (
    <div className="min-h-screen bg-background">
      <Header hideBalance={true} />
      <div className="hidden md:block">
        <IndicesTicker />
      </div>

      <main className="container mx-auto px-3 py-4 md:px-4 md:py-8">
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8">
          <div className="w-full max-w-3xl">
            {/* Payment Header */}
            <div className="text-center mb-8 space-y-3 animate-fade-in-up">
              <h1 className="text-2xl md:text-4xl font-extrabold">
                🚀 Unlock Top Gainer Stocks
              </h1>
              <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Get exclusive access to real-time top gainer stocks with AI-powered analysis and predictions.
              </p>
            </div>

            {/* Main Payment Box */}
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/40 rounded-2xl p-8 md:p-12 mb-8 animate-bounce-slow">
              {/* Price Section */}
              <div className="text-center mb-6">
                <p className="text-xs md:text-sm text-muted-foreground mb-4 font-medium tracking-widest uppercase">🎯 SPECIAL LIFETIME OFFER</p>
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Just ₹200
                </h2>
                <ul className="space-y-4 text-base md:text-lg text-foreground font-semibold max-w-md mx-auto">
                  <li className="flex items-center justify-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Pay only once</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Lifetime access forever</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Real-time top gainers</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>AI-powered analysis</span>
                  </li>
                </ul>
              </div>

              {/* Features Section */}
              <div className="border-t border-primary/30 pt-8 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-center">📈 What You Get</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-background/50 rounded-lg p-4 space-y-2">
                    <p className="font-bold text-lg">✅ Real-Time Gainers</p>
                    <p className="text-sm text-muted-foreground">Live tracking of top performing stocks updated every minute</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 space-y-2">
                    <p className="font-bold text-lg">✅ AI Analysis</p>
                    <p className="text-sm text-muted-foreground">Machine learning insights into why stocks are gaining</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 space-y-2">
                    <p className="font-bold text-lg">✅ Growth Predictions</p>
                    <p className="text-sm text-muted-foreground">Expected targets and confidence scores for each stock</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 space-y-2">
                    <p className="font-bold text-lg">✅ Market Alerts</p>
                    <p className="text-sm text-muted-foreground">Notifications when new gainers emerge</p>
                  </div>
                </div>
              </div>

              {/* Growth Highlight */}
              <div className="bg-gradient-to-r from-green-700/30 to-emerald-600/30 border-2 border-green-500/60 rounded-xl p-6 text-center mb-8">
                <p className="text-3xl mb-3">📊</p>
                <p className="text-2xl font-bold text-green-400 mb-2">Identify Winning Stocks in Real-Time</p>
                <p className="text-muted-foreground">Never miss a top gainer opportunity again with our advanced tracking system</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-4 rounded-xl border-2 border-muted-foreground hover:border-foreground hover:bg-muted/50 transition font-bold text-lg text-foreground"
              >
                ✕ Cancel
              </button>
              <button
                onClick={verifyPayment}
                disabled={isRefreshingPayment}
                className="px-8 py-4 rounded-xl border-2 border-amber-500/50 hover:border-amber-500 hover:bg-amber-500/10 transition font-bold text-lg text-amber-500 disabled:opacity-50"
              >
                {isRefreshingPayment ? '⏳ Checking...' : '🔄 Verify Payment'}
              </button>
              <button
                onClick={async () => {
                  try {
                    console.log('🎬 Payment button clicked...')
                    const res = await fetch('/api/top-gainers/create-payment', { method: 'POST' })
                    const data = await res.json()
                    if (!res.ok) {
                      alert(`Payment error: ${data.error || 'Unknown error'}`)
                      return
                    }
                    if (data.paymentLink) {
                      const orderId = data.orderId || data.order_id || data.order || null
                      const paymentWindow = window.open(data.paymentLink, '_blank', 'width=500,height=700')
                      const checkPayment = setInterval(async () => {
                        if (paymentWindow && paymentWindow.closed) {
                          clearInterval(checkPayment)
                          
                          // Retry logic with exponential backoff (1s, 2s, 3s, 4s, 5s)
                          const delays = [1000, 2000, 3000, 4000, 5000]
                          let verified = false
                          
                          for (let i = 0; i < delays.length && !verified; i++) {
                            await new Promise(resolve => setTimeout(resolve, delays[i]))
                            
                            try {
                              const verifyRes = await fetch(`/api/auth/me?t=${Date.now()}`, {
                                cache: 'no-store',
                                credentials: 'include',
                                headers: {
                                  'Cache-Control': 'no-cache, no-store, must-revalidate',
                                  'Pragma': 'no-cache',
                                }
                              })
                              
                              if (verifyRes.ok) {
                                const userData = await verifyRes.json()
                                if (userData?.user?.isTopGainerPaid) {
                                  verified = true
                                  console.log('✅ Top Gainer payment verified from server: true')
                                  if (userData?.user && setUserFromData) {
                                    setUserFromData(userData.user)
                                  }
                                  setVerifiedPaymentStatus(true)
                                  setShowPaymentSuccessModal(true)
                                  break
                                }
                              }
                            } catch (err) {
                              console.warn(`Retry ${i + 1} failed:`, err)
                            }
                          }
                          
                          if (!verified) {
                            alert('Payment verification pending. Please refresh the page in a moment.')
                            window.location.reload()
                          }
                        }
                      }, 500)
                    }
                  } catch (err) {
                    console.error('Payment error:', err)
                    alert('Payment failed. Please try again.')
                  }
                }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/50 transition"
              >
                Unlock Now - ₹200 <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
