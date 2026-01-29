"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { IndicesTicker } from "@/components/indices-ticker"
import { FiftyTwoWeekView } from "@/components/52-week-view"

export default function FiftyTwoWeekPage() {
  useEffect(() => {
    // Page analytics or tracking
    console.log("[52W] 52-Week High/Low page loaded")
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="hidden md:block">
        <IndicesTicker />
      </div>

      <main className="container mx-auto px-3 py-4 md:px-4 md:py-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">52-Week Analysis</h1>
          <p className="text-muted-foreground">
            Track Indian stocks at their 52-week highs and lows. Updated daily according to Indian share market hours.
          </p>
        </div>

        {/* Main Component */}
        <FiftyTwoWeekView
          type="all"
          limit={30}
          autoRefresh={true}
          refreshInterval={3600000} // Refresh every 1 hour
        />
      </main>
    </div>
  )
}
