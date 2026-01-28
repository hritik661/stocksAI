"use client"

import { ArrowRight, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Removed background circles */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32 flex flex-col items-center justify-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 md:mb-8">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold text-primary uppercase tracking-wider">AI-Powered Trading Platform</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-center text-foreground mb-4 md:mb-6 max-w-4xl leading-tight">
          Trade Stocks with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Professional Tools
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground text-center mb-8 md:mb-12 max-w-2xl">
          Real-time stock data, AI predictions, advanced charts. Start with ₹10 lakh virtual balance — no real money required.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-end mb-12 md:mb-16">
          {(() => {
            const { user } = useAuth();
            if (!user) {
              return (
                <>
                  <Button asChild size="lg" className="rounded-full text-base md:text-lg font-semibold h-12 md:h-14 px-8 md:px-10">
                    <Link href="/login" className="flex items-center gap-2">
                      Start Trading Now
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full text-base md:text-lg font-semibold h-12 md:h-14 px-8 md:px-10 bg-transparent">
                    <Link href="/#features">Learn More</Link>
                  </Button>
                </>
              );
            } else {
              return (
                <Button asChild size="lg" variant="outline" className="rounded-full text-base md:text-lg font-semibold h-12 md:h-14 px-8 md:px-10 bg-transparent">
                  <Link href="/#features">Learn More</Link>
                </Button>
              );
            }
          })()}
        </div>

        {/* Feature highlights - simplified */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl w-full">
          {[
            {
              icon: TrendingUp,
              title: "Real-time Data",
              desc: "Live stock quotes and market updates",
            },
            {
              icon: Zap,
              title: "AI Predictions",
              desc: "Machine learning models for growth predictions",
            },
            {
              icon: ArrowRight,
              title: "Advanced Charts",
              desc: "Professional candlestick charts and indicators",
            },
          ].map((feature, index) => (
            <div key={index} className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
              <feature.icon className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm md:text-base mb-1">{feature.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
