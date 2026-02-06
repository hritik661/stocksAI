"use client"

import { CheckCircle2, Rocket, Target, Brain } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function WhyChooseSection() {
  const reasons = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      items: ["85%+ accurate predictions", "ML models analyzing real-time data", "Smart alerts for opportunities"],
    },
    {
      icon: Target,
      title: "Precision Trading",
      items: ["Professional candlestick charts", "Technical indicators included", "Multiple timeframe analysis"],
    },
    {
      icon: Rocket,
      title: "Lightning Fast",
      items: ["Real-time market updates", "Instant order execution", "Sub-second data refresh"],
    },
    {
      icon: CheckCircle2,
      title: "100% Secure",
      items: ["Bank-grade encryption", "OAuth authentication", "Protected transactions"],
    },
  ]

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-background">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 lg:mb-20 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 md:mb-6">
            Why Choose Stocks AI?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            The only platform combining AI predictions, professional trading tools, and community insights
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon
            return (
              <Card
                key={idx}
                className="border-2 border-border/50 md:border-2 md:border-border/50 bg-gradient-to-br from-card/80 to-card/40 hover:border-border/70 transition-all duration-300 animate-fade-in-up card-hover"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-4">{reason.title}</h3>
                  <ul className="space-y-3">
                    {reason.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { stat: "50+", label: "Nifty Stocks", desc: "Tracked with AI" },
            { stat: "85%+", label: "Prediction Accuracy", desc: "Proven results" },
            { stat: "10K+", label: "Active Traders", desc: "Trusting us daily" },
          ].map((item, idx) => (
            <Card key={idx} className="border-2 border-border/50 bg-gradient-to-br from-primary/10 to-accent/5 text-center p-6 md:p-8 animate-fade-in-up card-hover hover:border-border/70" style={{ animationDelay: `${(idx + 4) * 100}ms` }}>
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-gradient mb-2 md:mb-3">{item.stat}</div>
              <div className="font-bold text-foreground mb-1">{item.label}</div>
              <div className="text-sm text-muted-foreground">{item.desc}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
