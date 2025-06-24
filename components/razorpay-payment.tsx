"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  CreditCard, 
  IndianRupee, 
  Crown, 
  CheckCircle, 
  Smartphone,
  Building,
  Wallet,
  Shield,
  Clock,
  Star,
  Zap
} from 'lucide-react'

interface RazorpayPaymentProps {
  planType: 'monthly' | 'yearly'
  amount: number
  onSuccess?: (paymentId: string, planType: string) => void
  onError?: (error: any) => void
  children?: React.ReactNode
}

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  popular?: boolean
}

export function RazorpayPayment({ 
  planType, 
  amount, 
  onSuccess, 
  onError, 
  children 
}: RazorpayPaymentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<string>('upi')
  const [showPaymentMethods, setShowPaymentMethods] = useState(false)

  console.log("Razorpay Payment component loaded for:", planType, "amount:", amount)

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      name: 'UPI',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Pay with Google Pay, PhonePe, Paytm',
      popular: true
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: <Building className="w-5 h-5" />,
      description: 'All major Indian banks supported'
    },
    {
      id: 'card',
      name: 'Debit/Credit Card',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Visa, Mastercard, RuPay'
    },
    {
      id: 'wallet',
      name: 'Wallets',
      icon: <Wallet className="w-5 h-5" />,
      description: 'Paytm, Mobikwik, FreeCharge'
    }
  ]

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    setIsLoading(true)
    
    try {
      // Initialize Razorpay
      const razorpayLoaded = await initializeRazorpay()
      
      if (!razorpayLoaded) {
        alert('Razorpay SDK failed to load. Please check your internet connection.')
        setIsLoading(false)
        return
      }

      // Create order on backend (this would be an API call in real implementation)
      const orderData = {
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      }

      console.log("Creating Razorpay order:", orderData)

      // Mock order creation - in real app, this would be an API call
      const mockOrder = {
        id: `order_${Date.now()}`,
        ...orderData
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_demo_key', // Replace with your Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'AutoFlow',
        description: `${planType === 'monthly' ? 'Monthly' : 'Yearly'} Premium Plan`,
        image: '/logo-192x192.png',
        order_id: mockOrder.id,
        handler: function (response: any) {
          console.log('Payment successful:', response)
          
          // Verify payment on backend (this would be an API call)
          // verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature)
          
          if (onSuccess) {
            onSuccess(response.razorpay_payment_id, planType)
          }
          
          alert('Payment successful! Your premium plan is now active.')
          setIsLoading(false)
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        notes: {
          plan_type: planType,
          subscription_type: 'premium'
        },
        theme: {
          color: '#6366f1'
        },
        method: {
          upi: selectedMethod === 'upi',
          card: selectedMethod === 'card',
          netbanking: selectedMethod === 'netbanking',
          wallet: selectedMethod === 'wallet'
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal closed')
            setIsLoading(false)
          }
        }
      }

      // @ts-ignore - Razorpay is loaded dynamically
      const razorpay = new window.Razorpay(options)
      razorpay.open()

    } catch (error) {
      console.error('Payment initialization error:', error)
      if (onError) {
        onError(error)
      }
      alert('Failed to initialize payment. Please try again.')
      setIsLoading(false)
    }
  }

  const planDetails = {
    monthly: {
      title: 'Premium Monthly',
      price: '₹1,699',
      period: 'per month',
      savings: null,
      features: [
        'Unlimited workflows',
        'All 50+ integrations',
        'Priority support',
        'Team collaboration',
        'Advanced analytics'
      ]
    },
    yearly: {
      title: 'Premium Yearly',
      price: '₹16,999',
      period: 'per year',
      savings: 'Save ₹3,389 (17% off)',
      features: [
        'Everything in Monthly',
        '2 months free',
        'Priority phone support',
        'Custom integrations',
        'White-label options'
      ]
    }
  }

  const currentPlan = planDetails[planType]

  return (
    <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
      <DialogTrigger asChild>
        {children || (
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white"
            onClick={() => setShowPaymentMethods(true)}
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-md bg-flow-surface border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-flow-text flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-green-500" />
            Secure Payment
          </DialogTitle>
          <DialogDescription>
            Powered by Razorpay - India's most trusted payment gateway
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Plan Summary */}
          <Card className="bg-gradient-to-r from-flow-primary/20 to-flow-secondary/20 border-flow-primary/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-flow-text">{currentPlan.title}</CardTitle>
                {planType === 'yearly' && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Star className="w-3 h-3 mr-1" />
                    Best Value
                  </Badge>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-flow-text">{currentPlan.price}</span>
                <span className="text-slate-400">{currentPlan.period}</span>
              </div>
              {currentPlan.savings && (
                <p className="text-green-400 text-sm font-medium">{currentPlan.savings}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentPlan.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
                <p className="text-xs text-slate-400 mt-2">+ {currentPlan.features.length - 3} more features</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div>
            <h3 className="text-sm font-medium text-flow-text mb-3">Choose Payment Method</h3>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedMethod === method.id
                      ? 'border-flow-primary bg-flow-primary/10'
                      : 'border-slate-600 hover:border-slate-500 bg-flow-dark'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`${selectedMethod === method.id ? 'text-flow-primary' : 'text-slate-400'}`}>
                      {method.icon}
                    </div>
                    <span className={`font-medium text-sm ${
                      selectedMethod === method.id ? 'text-flow-primary' : 'text-flow-text'
                    }`}>
                      {method.name}
                    </span>
                    {method.popular && (
                      <Badge variant="secondary" className="text-xs">Popular</Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{method.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Security Note */}
          <div className="bg-flow-dark/50 border border-slate-700 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">Secure Payment</span>
            </div>
            <p className="text-xs text-slate-400">
              Your payment is protected by bank-grade security. We don't store your card details.
            </p>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90 text-white font-medium"
            size="lg"
          >
            {isLoading ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                Initializing Payment...
              </>
            ) : (
              <>
                <IndianRupee className="w-4 h-4 mr-2" />
                Pay {currentPlan.price} Securely
              </>
            )}
          </Button>

          {/* Terms */}
          <p className="text-xs text-slate-500 text-center">
            By proceeding, you agree to our Terms of Service and Privacy Policy. 
            You can cancel your subscription anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Hook for easier usage
export function useRazorpayPayment() {
  const handlePayment = (planType: 'monthly' | 'yearly') => {
    const amount = planType === 'monthly' ? 1699 : 16999
    
    // This would typically open a payment modal or redirect
    console.log(`Initiating Razorpay payment for ${planType} plan: ₹${amount}`)
    
    return {
      amount,
      planType,
      // In a real app, you'd return the actual payment function
      initiate: () => {
        // Payment logic would go here
        alert(`Payment initiated for ${planType} plan - ₹${amount}`)
      }
    }
  }

  return { handlePayment }
}