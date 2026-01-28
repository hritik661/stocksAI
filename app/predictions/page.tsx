"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { IndicesTicker } from "@/components/indices-ticker"
import { PredictionsList } from "@/components/predictions-list"
import PredictionsHero from "@/components/predictions-hero"
import { NewsSection } from "@/components/news-section"
import { PaymentButton } from "@/components/payment-button"
import { useAuth } from "@/contexts/auth-context"
import { usePrediction } from "@/contexts/prediction-context"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Sparkles } from "lucide-react"

export default function PredictionsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // No payment logic needed

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="hidden md:block">
          <IndicesTicker />
        </div>

        <main className="container mx-auto px-4 py-12 text-center">
            <div className="max-w-xl mx-auto">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Stock Predictions</h1>
              <p className="text-muted-foreground mb-6">Please sign in to view AI-powered predictions.</p>
              <div className="flex justify-center gap-4">
                <Button asChild className="rounded-xl">
                  <Link href="/login?callbackUrl=/predictions">Sign In</Link>
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

  // All signed-in users get predictions

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="hidden md:block">
        <IndicesTicker />
      </div>

      <main className="container mx-auto px-3 py-4 md:px-4 md:py-8">
        <PredictionsHero />
        
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          <div className="flex-1">
            <PredictionsList />
          </div>

          <div className="w-full lg:w-80 space-y-4 md:space-y-8">
            <NewsSection limit={8} />
          </div>
        </div>
      </main>
    </div>
  )
}
