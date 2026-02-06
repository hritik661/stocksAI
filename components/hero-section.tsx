"use client"

import { ArrowRight, TrendingUp, Zap, BarChart3, Target, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Removed background circles */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32 flex flex-col items-center justify-center">
        {/* StockAI Logo */}
        <div className="mb-6 md:mb-8 animate-fade-in-up">
          <img src="/stockai-logo.png" alt="StockAI" className="h-24 md:h-32 w-auto object-contain drop-shadow-2xl" onError={(e) => { e.currentTarget.src = '/stockai-logo.svg' }} />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 md:mb-8">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold text-primary uppercase tracking-wider">Welcome to StockAI - India's #1 Trading Platform</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-center text-foreground mb-4 md:mb-6 max-w-4xl leading-tight">
          Master Stock Market Trading with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            StockAI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-muted-foreground text-center mb-4 md:mb-6 max-w-2xl">
          Learn to trade stocks and options with real market data, AI predictions, and professional tools—completely risk-free with ₹10 lakh virtual capital.
        </p>

        {/* Additional tagline */}
        <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center mb-8 md:mb-12 text-xs md:text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-green-500" /> Real NSE stock data</span>
          <span className="flex items-center gap-2"><Target className="h-4 w-4 text-blue-500" /> 85%+ accurate AI predictions</span>
          <span className="flex items-center gap-2"><Users className="h-4 w-4 text-purple-500" /> 10K+ active traders</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-12 md:mb-16">
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
                    <Link href="/about">Learn More</Link>
                  </Button>
                </>
              );
            } else {
              return (
                <Button asChild size="lg" className="rounded-full text-base md:text-lg font-semibold h-12 md:h-14 px-8 md:px-10">
                  <Link href="/">Start Trading</Link>
                </Button>
              );
            }
          })()}
        </div>

        {/* Feature highlights - improved */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl w-full">
          {[
            {
              icon: TrendingUp,
              title: "Real-Time Market Data",
              desc: "Live NSE stock quotes with instant updates and accurate pricing",
            },
            {
              icon: Target,
              title: "AI Predictions",
              desc: "Advanced ML models predicting 50+ Nifty stocks with 85%+ confidence",
            },
            {
              icon: BarChart3,
              title: "Professional Charts",
              desc: "Advanced candlestick charts, 20+ indicators, multiple timeframes",
            },
          ].map((feature, index) => (
            <div key={index} className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg">
              <feature.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-sm md:text-base mb-2">{feature.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-border/20 w-full max-w-3xl">
          <p className="text-center text-xs md:text-sm text-muted-foreground mb-6">Trusted by thousands of Indian investors and traders</p>
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-primary">10,000+</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-primary">₹10,00,000</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Starting Capital</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-primary">50+</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Stocks & Options</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
