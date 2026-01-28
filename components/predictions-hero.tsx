"use client"

import { Sparkles, TrendingUp, Brain, Zap } from "lucide-react"
import React from 'react';


const handlePredictionClick = async () => {
  // Request backend to create Instamojo payment request and get payment link
  try {
    const res = await fetch('/api/predictions/create-payment', { method: 'POST' });
    const data = await res.json();
    if (data.paymentLink) {
      // Open payment link in new window
      const paymentWindow = window.open(
        data.paymentLink,
        '_blank',
        'width=500,height=700'
      );

      // Poll for payment completion (simulate for test mode)
      const checkPayment = setInterval(async () => {
        if (paymentWindow && paymentWindow.closed) {
          clearInterval(checkPayment);
          // Call backend to verify payment status from your database
          const verifyRes = await fetch('/api/predictions/check-access');
          if (verifyRes.ok) {
            window.location.href = '/predictions';
          } else {
            alert('Payment not verified. Please try again.');
          }
        }
      }, 2000);
    } else {
      alert(data.error || 'Failed to create payment.');
    }
  } catch (err) {
    alert('Error creating payment.');
  }
};


export default function PredictionsHero() {
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
            <h2 className="text-lg sm:text-2xl font-extrabold text-foreground mb-1 sm:mb-2">AI-Powered Stock Predictions</h2>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-xs sm:max-w-xl">Advanced machine learning models analyzing real-time market data to predict stock movements with 85%+ accuracy</p>
          </div>
        </div>

        {/* Smaller Payment Button */}
        <div className="mb-4 sm:mb-6">
          <button
            className="bg-primary text-white px-4 py-2 sm:px-8 sm:py-3 rounded-lg sm:rounded-xl font-bold shadow-lg hover:bg-primary/80 transition text-base sm:text-lg"
            onClick={handlePredictionClick}
          >
            Access Predictions (Pay to Continue)
          </button>
        </div>

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
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-tight">{item.label}</p>
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
