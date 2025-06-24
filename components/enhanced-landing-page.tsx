"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { WorkflowBuilder } from './workflow-builder'
import { 
  Zap, 
  ArrowRight, 
  Star, 
  Users, 
  Workflow, 
  Shield, 
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Crown,
  CreditCard,
  Rocket,
  Globe,
  MessageCircle,
  Heart,
  ChevronRight,
  Play,
  CheckCircle,
  Clock,
  IndianRupee,
  Smartphone,
  Database,
  Calendar,
  FileText,
  MessageSquare,
  Filter,
  X
} from 'lucide-react'

interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
  buttonText: string
  buttonAction: () => void
}

export function EnhancedLandingPage() {
  const [currentView, setCurrentView] = useState<'landing' | 'builder' | 'pricing' | 'auth'>('landing')
  const [showDemo, setShowDemo] = useState(false)

  console.log("Enhanced Landing Page rendered, current view:", currentView)

  if (currentView === 'builder') {
    return <WorkflowBuilder />
  }

  const handleRazorpayPayment = (planType: 'monthly' | 'yearly') => {
    const amount = planType === 'monthly' ? 169900 : 1699900 // Amount in paise
    console.log(`Opening Razorpay payment for ${planType} plan: ₹${amount/100}`)
    
    // This would integrate with Razorpay - for now showing alert
    alert(`Razorpay Integration: ${planType} plan - ₹${amount/100}`)
  }

  const integrations = [
    { name: 'Gmail', icon: <Mail className="w-6 h-6" />, category: 'Email' },
    { name: 'Slack', icon: <MessageSquare className="w-6 h-6" />, category: 'Communication' },
    { name: 'Google Sheets', icon: <Database className="w-6 h-6" />, category: 'Productivity' },
    { name: 'Twitter/X', icon: <X className="w-6 h-6" />, category: 'Social' },
    { name: 'Telegram', icon: <MessageCircle className="w-6 h-6" />, category: 'Communication' },
    { name: 'Notion', icon: <FileText className="w-6 h-6" />, category: 'Productivity' },
    { name: 'Google Calendar', icon: <Calendar className="w-6 h-6" />, category: 'Productivity' },
    { name: 'Webhooks', icon: <Globe className="w-6 h-6" />, category: 'API' }
  ]

  const pricingTiers: PricingTier[] = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '3 workflows',
        'Basic integrations',
        'Community support',
        'Manual triggers only',
        'Basic templates'
      ],
      buttonText: 'Get Started Free',
      buttonAction: () => setCurrentView('builder')
    },
    {
      name: 'Premium',
      price: '₹1,699',
      period: 'per month',
      description: 'Everything you need to scale',
      popular: true,
      features: [
        'Unlimited workflows',
        'All 50+ integrations',
        'Priority support',
        'Advanced triggers & actions',
        'Team collaboration',
        'Webhook/API access',
        'Premium templates',
        'Analytics dashboard',
        'Mobile app access'
      ],
      buttonText: 'Start Premium Trial',
      buttonAction: () => handleRazorpayPayment('monthly')
    },
    {
      name: 'Premium Yearly',
      price: '₹16,999',
      period: 'per year',
      description: 'Best value - Save 2 months!',
      features: [
        'Everything in Premium',
        '2 months free',
        'Priority phone support',
        'Custom integrations',
        'Advanced analytics',
        'White-label options',
        'Dedicated account manager'
      ],
      buttonText: 'Get Yearly Plan',
      buttonAction: () => handleRazorpayPayment('yearly')
    }
  ]

  if (currentView === 'pricing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-flow-dark via-slate-900 to-flow-dark text-flow-text">
        {/* Header */}
        <header className="border-b border-slate-800 bg-flow-surface/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-flow rounded-lg flex items-center justify-center animate-flow-glow">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-flow-text">AutoFlow</h1>
                  <p className="text-sm text-slate-400">Visual Workflow Automation for Everyone</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentView('landing')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Back to Home
                </Button>
                <Button 
                  onClick={() => setCurrentView('builder')}
                  className="bg-gradient-flow hover:opacity-90 text-white font-medium"
                >
                  Try Free
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Pricing Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-flow-secondary/20 text-flow-secondary border-flow-secondary/30 mb-4">
                <IndianRupee className="w-3 h-3 mr-1" />
                Indian Pricing
              </Badge>
              <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Choose the perfect plan for your automation needs. All plans include 14-day free trial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <Card 
                  key={tier.name}
                  className={`relative overflow-hidden transition-all hover:scale-105 ${
                    tier.popular 
                      ? 'bg-gradient-to-br from-flow-primary/20 to-flow-secondary/20 border-flow-primary shadow-xl' 
                      : 'bg-flow-surface border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-flow text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <CardHeader className="text-center p-8">
                    <CardTitle className="text-2xl mb-2 text-flow-text">{tier.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-flow-text">{tier.price}</span>
                      <span className="text-slate-400 ml-1">/{tier.period}</span>
                    </div>
                    <CardDescription className="text-lg">{tier.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="px-8 pb-8">
                    <div className="space-y-4 mb-8">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={tier.buttonAction}
                      className={`w-full ${
                        tier.popular 
                          ? 'bg-gradient-flow hover:opacity-90 text-white' 
                          : 'bg-flow-surface border border-slate-600 hover:bg-slate-700 text-flow-text'
                      }`}
                      size="lg"
                    >
                      {tier.popular && <Crown className="w-4 h-4 mr-2" />}
                      {tier.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Feature Comparison Table */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
              <div className="bg-flow-surface/50 rounded-xl border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-flow-dark">
                      <tr>
                        <th className="text-left p-6 text-flow-text font-semibold">Feature</th>
                        <th className="text-center p-6 text-flow-text font-semibold">Free Plan</th>
                        <th className="text-center p-6 text-flow-text font-semibold">Premium Plan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {[
                        ['Number of workflows', '3', 'Unlimited'],
                        ['Supported integrations', 'Basic only', 'All 50+'],
                        ['Webhook/API access', '❌', '✅'],
                        ['Priority support', '❌', '✅'],
                        ['Template marketplace', 'Limited', 'Full access'],
                        ['Team collaboration', '❌', '✅'],
                        ['Advanced triggers', '❌', '✅'],
                        ['Analytics dashboard', '❌', '✅'],
                        ['Mobile app access', '❌', '✅']
                      ].map(([feature, free, premium], idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30">
                          <td className="p-6 text-slate-300 font-medium">{feature}</td>
                          <td className="p-6 text-center text-slate-400">{free}</td>
                          <td className="p-6 text-center text-green-400 font-medium">{premium}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-flow-dark via-slate-900 to-flow-dark text-flow-text">
      {/* Header */}
      <header className="border-b border-slate-800 bg-flow-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-flow rounded-lg flex items-center justify-center animate-flow-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-flow-text">AutoFlow</h1>
                <p className="text-sm text-slate-400">Visual Workflow Automation for Everyone</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('pricing')}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Pricing
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('builder')}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Try Builder
              </Button>
              <Button 
                onClick={() => handleRazorpayPayment('monthly')}
                className="bg-gradient-flow hover:opacity-90 text-white font-medium"
              >
                <Crown className="w-4 h-4 mr-2" />
                Go Premium - ₹1,699/mo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <Badge className="bg-flow-secondary/20 text-flow-secondary border-flow-secondary/30 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              50+ Integrations • Made in India 🇮🇳
            </Badge>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Visual Workflow Automation{' '}
            <span className="bg-gradient-flow bg-clip-text text-transparent">for Everyone</span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect Gmail, Slack, Twitter, Google Sheets, and 50+ popular apps. 
            Build powerful automations with our intuitive drag-and-drop interface. 
            No coding required - perfect for Indian businesses and creators.
          </p>
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              onClick={() => setShowDemo(true)}
              className="bg-gradient-flow hover:opacity-90 text-white font-medium px-8 py-3"
            >
              Start Building Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Demo Coming Soon */}
      <section className="relative py-0 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-flow-primary/20 to-flow-secondary/20 p-1 rounded-xl">
            <div className="bg-flow-dark rounded-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-flow rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-flow-text mb-2">Interactive Demo Coming Soon</h3>
                  <p className="text-slate-400">Experience the power of visual automation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Showcase */}
      <section className="py-20 px-6 bg-flow-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Connect Your Favorite Apps</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Seamlessly integrate with 50+ popular services. More integrations added every month.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {integrations.map((integration, idx) => (
              <Card key={idx} className="bg-flow-surface border-slate-700 hover:border-slate-600 transition-all p-6 text-center">
                <div className="text-flow-primary mb-3 flex justify-center">
                  {integration.icon}
                </div>
                <h4 className="font-medium text-flow-text text-sm">{integration.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{integration.category}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              View All 50+ Integrations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose AutoFlow?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Built specifically for Indian users with local payment options and dedicated support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-flow-primary" />,
                title: "No-Code Automation",
                description: "Build powerful workflows without writing a single line of code. Perfect for non-technical users."
              },
              {
                icon: <IndianRupee className="w-8 h-8 text-green-500" />,
                title: "Affordable Indian Pricing",
                description: "Transparent pricing in INR with support for UPI, NetBanking, and all Indian payment methods."
              },
              {
                icon: <Smartphone className="w-8 h-8 text-flow-secondary" />,
                title: "Mobile Optimized",
                description: "Manage your workflows on-the-go with our fully responsive mobile interface."
              },
              {
                icon: <Clock className="w-8 h-8 text-flow-accent" />,
                title: "Save Hours Daily",
                description: "Automate repetitive tasks and focus on what matters most to your business."
              },
              {
                icon: <Shield className="w-8 h-8 text-orange-500" />,
                title: "Enterprise Security",
                description: "Bank-grade security with OAuth integration and encrypted data storage."
              },
              {
                icon: <Users className="w-8 h-8 text-purple-500" />,
                title: "Team Collaboration",
                description: "Work together with your team on complex automation workflows."
              }
            ].map((feature, idx) => (
              <Card key={idx} className="bg-flow-surface/50 border-slate-700 hover:border-slate-600 transition-all p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-flow-text mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-6 bg-flow-surface/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Simple, Affordable Pricing</h2>
          <p className="text-slate-400 text-lg mb-12">
            Start free and upgrade as you grow. All plans include 14-day free trial.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-flow-surface border-slate-700 p-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Free Plan</CardTitle>
                <div className="text-4xl font-bold mb-4">₹0</div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>3 workflows</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Basic integrations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Community support</span>
                </div>
                <Button 
                  className="w-full mt-6" 
                  variant="outline"
                  onClick={() => setCurrentView('builder')}
                >
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-flow-primary/20 to-flow-secondary/20 border-flow-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-flow text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                MOST POPULAR
              </div>
              <CardHeader className="text-center p-8">
                <CardTitle className="text-2xl mb-2 text-flow-text">Premium Plan</CardTitle>
                <div className="text-4xl font-bold mb-1 text-flow-text">₹1,699</div>
                <div className="text-sm text-slate-400 mb-4">per month</div>
                <CardDescription>Everything you need to scale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-8 pb-8">
                <div className="flex items-center gap-3 text-flow-text">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Unlimited workflows</span>
                </div>
                <div className="flex items-center gap-3 text-flow-text">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>All 50+ integrations</span>
                </div>
                <div className="flex items-center gap-3 text-flow-text">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center gap-3 text-flow-text">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Team collaboration</span>
                </div>
                <Button 
                  className="w-full mt-6 bg-gradient-flow hover:opacity-90 text-white font-medium"
                  onClick={() => handleRazorpayPayment('monthly')}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Start Premium Trial
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('pricing')}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              View Detailed Pricing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Creator Section */}
      <section className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-flow-surface/50 rounded-xl p-8 border border-slate-700">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-flow rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                AS
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-flow-text mb-4">About the Creator</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Hi, I'm <strong>Ayush Shah</strong> — a passionate developer focused on automation, productivity tools, 
                  and building solutions for the Indian market. AutoFlow is designed to make powerful automation 
                  accessible to everyone, with affordable pricing and local payment support.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://github.com/cancelledcoder" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-flow-text transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    @cancelledcoder
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/ayushshah30/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-flow-text transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    Ayush Shah
                  </a>
                  <a 
                    href="mailto:ayushbusinessmail@gmail.com"
                    className="flex items-center gap-2 text-slate-400 hover:text-flow-text transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    ayushbusinessmail@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800 bg-flow-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-flow rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-flow-text">AutoFlow</div>
                <div className="text-sm text-slate-400">Visual Workflow Automation for Everyone</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>© 2025 Ayush Shah</span>
              <span>
                Made with <span className="inline mx-1 text-red-500">♥</span> in India 🇮🇳
              </span>
              <span>
                <a
                  href="https://github.com/cancelledcoder/Autoflow/tree/main"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-flow-accent hover:underline"
                >
                  ⭐ Star us on GitHub
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}