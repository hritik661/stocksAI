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
import { TrendingUp } from "lucide-react"

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

          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
        <div className="grid grid-cols-3 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
          <div className="text-center p-4 md:p-8 rounded-2xl bg-secondary/50 border border-primary/20 md:border-border">
            <div className="text-2xl md:text-4xl font-black text-primary mb-2 md:mb-3">10K+</div>
            <p className="text-muted-foreground font-medium text-sm md:text-base">Active Traders</p>
            <p className="text-xs text-muted-foreground mt-1 md:mt-2">Trading on daily basis</p>
          </div>

          <div className="text-center p-4 md:p-8 rounded-2xl bg-secondary/50 border border-primary/20 md:border-border">
            <div className="text-2xl md:text-4xl font-black text-primary mb-2 md:mb-3">50+</div>
            <p className="text-muted-foreground font-medium text-sm md:text-base">Nifty Stocks Tracked</p>
            <p className="text-xs text-muted-foreground mt-1 md:mt-2">With AI predictions & analytics</p>
          </div>

          <div className="text-center p-4 md:p-8 rounded-2xl bg-secondary/50 border border-primary/20 md:border-border">
            <div className="text-2xl md:text-4xl font-black text-primary mb-2 md:mb-3">24/7</div>
            <p className="text-muted-foreground font-medium text-sm md:text-base">Market Coverage</p>
            <p className="text-xs text-muted-foreground mt-1 md:mt-2">Real-time insights & updates</p>
          </div>
        </div>

        {/* About Us Section */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-center">About Stocks AI</h2>
          
          <div className="space-y-6 md:space-y-8">
           

           

            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-400/20">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Why Trade with Us?</h3>
              <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-muted-foreground">
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Real Market Data:</strong> Track actual NSE stocks with live price updates and accurate market movements</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>AI Predictions:</strong> Advanced ML models predicting stock movements with 85%+ accuracy for select stocks</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Virtual Trading:</strong> Practice with ₹10,00,000 virtual capital, no real money required</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Options Trading:</strong> Learn and trade stock options with detailed greeks, P&L calculations, and risk management tools</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Persistent Portfolio:</strong> Your trades, P&L, and balance sync across devices and sessions</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Security First:</strong> OAuth authentication, encrypted data, and bank-grade security</span>
                </li>
              </ul>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-400/20">
              <h3 className="text-lg md:text-xl font-bold mb-4">Before Everything You Need to Trade</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                Our comprehensive prediction service is your complete trading companion, designed to help you make informed decisions before every trade. We provide AI-powered stock predictions for 50+ Nifty stocks, identifying top gainer stocks and analyzing market trends. Every prediction comes with confidence scores, growth targets, and actionable insights so you understand exactly what to expect before risking your capital. Our prediction engine analyzes years of historical data combined with real-time market movements to deliver 85%+ accurate predictions. Whether you're tracking momentum plays, value stocks, or seeking the next big gainer, our service covers all trading styles with detailed technical analysis, fundamental insights, and market alerts to keep you ahead of the curve.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-amber-500/5 border border-yellow-400/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 md:h-7 md:w-7 text-amber-500" />
                <h3 className="text-lg md:text-xl font-bold">Premium Predictions - Only ₹200</h3>
              </div>
              <p className="text-muted-foreground text-sm md:text-base mb-4 leading-relaxed">
                Unlock our exclusive AI prediction engine for just <span className="font-bold text-amber-500">₹200</span> and enjoy unlimited access to all prediction services! Get institutional-grade market insights at fraction of the cost.
              </p>
              <div className="space-y-3 md:space-y-4">
                <p className="font-semibold text-sm md:text-base text-foreground">What You Get:</p>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-muted-foreground">
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>All Stock Predictions:</strong> AI-powered predictions for 50+ Nifty stocks with confidence scores and expected growth targets</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Top Gainers Predictions:</strong> Identify best performing stocks before they move with our top gainer analysis</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Top Losers Analysis:</strong> Get ahead of market downturns with predictive losers identification</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Fundamental Analysis:</strong> Deep insights into company fundamentals, P/E ratios, growth metrics, and financial health</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Technical Indicators:</strong> Advanced charting tools with 20+ technical indicators for informed decision-making</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Market Trends & Alerts:</strong> Real-time notifications for high-confidence predictions and market opportunities</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>One-Time Payment:</strong> Pay once and enjoy unlimited access with automatic sync across all your devices</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-6 border-t border-amber-200/30">
                <p className="text-center text-sm md:text-base font-semibold text-foreground mb-4">
                  85%+ Accuracy on Growth Predictions
                </p>
                <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 rounded-xl text-sm md:text-base">
                  <Link href="/predictions">
                    Unlock Predictions Now - ₹200
                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-400/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 md:h-7 md:w-7 text-emerald-500" />
                <h3 className="text-lg md:text-xl font-bold">Top Gainers Alert Service - Unlock Opportunities</h3>
              </div>
              <p className="text-muted-foreground text-sm md:text-base mb-4 leading-relaxed">
                Get exclusive early-bird notifications for stocks predicted to be top gainers before they move! Our AI system identifies high-momentum stocks with growth potential and alerts you in real-time so you can capitalize on market opportunities first.
              </p>
              <div className="space-y-3 md:space-y-4">
                <p className="font-semibold text-sm md:text-base text-foreground">Key Features:</p>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-muted-foreground">
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Real-Time Top Gainer Alerts:</strong> Get instant notifications when our AI identifies potential top gainer stocks</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Early Entry Advantage:</strong> Know about momentum plays before they become mainstream</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Detailed Analysis:</strong> Each top gainer recommendation includes entry points, expected targets, and risk levels</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Confidence Scores:</strong> Understand how confident our AI is about each prediction with detailed metrics</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Technical Breakdown:</strong> See the technical indicators and patterns that triggered each prediction</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-6 border-t border-emerald-200/30">
                <p className="text-center text-sm md:text-base font-semibold text-foreground mb-4">
                  Identify High-Potential Gainers Before They Move
                </p>
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-xl text-sm md:text-base">
                  <Link href="/predictions">
                    Explore Top Gainers - ₹200
                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

           

            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-400/20">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">How It Works</h3>
              <ol className="space-y-3 md:space-y-4 text-sm md:text-base text-muted-foreground">
                <li className="flex gap-3 items-start">
                  <span className="font-bold text-primary bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                  <span><strong>Sign Up:</strong> Register with your email or Google account</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="font-bold text-primary bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                  <span><strong>Get Virtual Capital:</strong> Start with ₹10,00,000 virtual currency</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="font-bold text-primary bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                  <span><strong>Explore Market:</strong> Browse stocks, check AI predictions, and analyze charts</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="font-bold text-primary bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                  <span><strong>Place Trades:</strong> Buy/Sell stocks and trade options with no real risk</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="font-bold text-primary bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">5</span>
                  <span><strong>Learn & Improve:</strong> Track your P&L, learn from mistakes, and refine your strategy</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Team/Vision */}
        <div className="rounded-2xl md:rounded-[2rem] bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 p-6 md:p-12 text-center mb-12 md:mb-20">
          

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
                a: "Currently, Stock AI virtual trading with ₹10,00,000 starting balance so you can practice without real capital. Your portfolio, trades and P&L persist across logins on this device. Real (broker-connected) trading may be supported in a future release.",
              },
              {
                q: "How can I restore my virtual balance?",
                a: "If you want to reset your virtual balance to ₹10,00,000, use the Reset Balance option in your user menu or visit the admin reset tools (for admins).",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept UPI, debit cards, credit cards, net banking, and all major payment apps (Google Pay, PhonePe, Paytm, etc.) via the secure UPIPG gateway for all premium features and prediction unlocks.",
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
