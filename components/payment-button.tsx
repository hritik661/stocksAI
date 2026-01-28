"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { CreditCard, Loader2 } from "lucide-react"

export function PaymentButton() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handlePayment = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/predictions/create-payment', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment')
      }

      // Redirect to Instamojo payment page
      window.location.href = data.paymentLink

    } catch (error) {
      console.error('Payment error:', error)
      toast({
        title: 'Payment Error',
        description: error instanceof Error ? error.message : 'Failed to initiate payment',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="rounded-xl bg-primary hover:bg-primary/90"
      size="lg"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          Pay ₹1 - Unlock Predictions
        </>
      )}
    </Button>
  )
}