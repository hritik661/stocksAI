"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { CTASection } from "@/components/cta-section"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Zap, Users, Award, ArrowRight, CheckCircle2, Globe, Lock, BarChart3, ShoppingCart, Smartphone } from "lucide-react"
import ChatSupport from "@/components/chat-support"

export default function AboutPage() {
  const { user } = useAuth();
  return (
    

  
    <div className="min-h-screen bg-background">
      <Header isLandingPage={true} />
      <HeroSection />

      <FeaturesSection />
      <WhyChooseSection />

      <main className="container mx-auto px-3 md:px-4 py-8 md:py-16">

        {/* Features Grid */}
        <div className="mb-12 md:mb-20">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">Why Choose Stocks?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Zap,
                title: "Lightning-Fast Data",
                desc: "Real-time stock quotes, indices, and market updates",
              },
              {
                icon: Target,
                title: "AI Predictions",
                desc: "Machine learning models tracking 50+ Nifty stocks with growth predictions and confidence scores",
              },
              {
                icon: BarChart3,
                title: "Advanced Charts",
                desc: "Professional candlestick charts, technical indicators, and multiple timeframe analysis",
              },
              {
                icon: ShoppingCart,
                title: "Trade Stocks & Options",
                desc: "Place simulated BUY/SELL orders for shares and option lots; view P&L, close/partially close positions",
              },
              {
                icon: Globe,
                title: "News & Alerts",
                desc: "Curated market news and alerts alongside quotes so you never miss important events",
              },
              {
                icon: Lock,
                title: "Secure Trading",
                desc: "Bank-grade security with OAuth authentication and encrypted transactions",
              },
              {
                icon: Users,
                title: "Community",
                desc: "Connect with Indian traders, share insights, and learn from market professionals",
              },
              {
                icon: Award,
                title: "Awards & Trust",
                desc: "Recognized as India's most innovative trading platform for retail investors",
              },
        {
  icon: Award,
  title: "Market Trust & Credibility",
  desc: "Trusted by thousands of Indian investors with reliable data and transparent analytics",
},
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <Card key={idx} className="border border-primary/20 md:border-border bg-card/50 hover:border-primary/30 md:hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                  <CardContent className="p-4 md:p-6">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-xs md:text-sm">{feature.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Company Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
          <div className="text-center p-4 md:p-8 rounded-2xl bg-secondary/50 border border-primary/20 md:border-border">
            <div className="text-2xl md:text-4xl font-black text-primary mb-2 md:mb-3">10K+</div>
            <p className="text-muted-foreground font-medium text-sm md:text-base">Active Traders</p>
            <p className="text-xs text-muted-foreground mt-1 md:mt-2">Trading on daily</p>
          </div>

          <div className="text-center p-4 md:p-8 rounded-2xl bg-secondary/50 border border-primary/20 md:border-border">
            <div className="text-2xl md:text-4xl font-black text-primary mb-2 md:mb-3">50+</div>
            <p className="text-muted-foreground font-medium text-sm md:text-base">Nifty Stocks Tracked</p>
            <p className="text-xs text-muted-foreground mt-1 md:mt-2">With AI predictions</p>
          </div>

          <div className="text-center p-4 md:p-8 rounded-2xl bg-secondary/50 border border-primary/20 md:border-border">
            <div className="text-2xl md:text-4xl font-black text-primary mb-2 md:mb-3">24/7</div>
            <p className="text-muted-foreground font-medium text-sm md:text-base">Market Coverage</p>
            <p className="text-xs text-muted-foreground mt-1 md:mt-2">Global market insights</p>
          </div>
        </div>

        {/* Team/Vision */}
        <div className="rounded-2xl md:rounded-[2rem] bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 p-6 md:p-12 text-center mb-12 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Our Vision for Indian Markets</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-10 leading-relaxed">
            We envision a future where every Indian has access to institutional-grade trading tools, real-time market
            insights, and AI-powered decision support. Hritik Stocks is building that future, one trader at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            {!user && (
              <Button asChild size="lg" className="rounded-xl text-sm md:text-base">
                <Link href="/">
                  Start Trading Now
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </Button>
            )}
            <Button size="lg" variant="outline" className="rounded-xl text-sm md:text-base bg-transparent" onClick={() => { document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Support
            </Button>
          </div>
        </div>

        {/* Quick sign-in removed from About page per UX preference */}

        {/* FAQ-style Info */}
        <div className="max-w-3xl mx-auto mb-12 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Frequently Asked Questions</h2>

          <div className="space-y-4 md:space-y-6">
            {[
              
              {
                q: "How accurate are your AI predictions?",
                a: "Our ML models achieve 85%+ confidence on predictions for stocks with 7% or more expected growth within 48 hours.",
              },
              {
                q: "Can I trade in real markets?",
                a: "Currently, Hrtik provides virtual trading with ₹10,00,000 starting balance so you can practice without real capital. Your portfolio, trades and P&L persist across logins on this device. Real (broker-connected) trading may be supported in a future release.",
              },
              {
                q: "How can I restore my virtual balance?",
                a: "If you want to reset your virtual balance to ₹10,00,000, use the Reset Balance option in your user menu or visit the admin reset tools (for admins).",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept UPI payments via UPIPG gateway for all premium features and prediction unlocks.",
                icon: <div className="flex items-center gap-1"><Smartphone className="h-3 w-3 md:h-4 md:w-4" /><span className="text-xs font-bold bg-blue-600 text-white px-1 py-0.5 rounded">UPI</span></div>
              },
              {
                q: "Is my data secure?",
                a: "Yes! We use bank-grade encryption, OAuth authentication, and never store sensitive payment information.",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-3 md:p-6 rounded-xl border border-primary/20 md:border-border bg-card/50">
                <div className="flex items-start gap-2 md:gap-3 mb-2">
                  {item.icon && <div className="mt-0.5 md:mt-1">{item.icon}</div>}
                  <h4 className="font-bold text-base md:text-lg">{item.q}</h4>
                </div>
                <p className="text-muted-foreground text-sm md:text-base">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Chat Support */}
        <div id="support" className="max-w-3xl mx-auto mb-12 md:mb-20">
          <ChatSupport />
        </div>

        {/* Contact/Links */}
        <div className="text-center py-8 md:py-12 border-t border-border/50">
          <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">Questions or suggestions? We'd love to hear from you.</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button asChild variant="outline" className="rounded-xl bg-transparent text-sm md:text-base">
              <Link href="mailto:hritikparmar800@gmail.com">hritikparmar800@gmail.com</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl bg-transparent text-sm md:text-base">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>

      <CTASection />
    </div>
  )
}
