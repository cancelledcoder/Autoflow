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
  ChevronRight
} from 'lucide-react'

export function LandingPage() {
  const [currentView, setCurrentView] = useState<'landing' | 'builder'>('landing')
  const [showPayment, setShowPayment] = useState(false)

  console.log("LandingPage rendered, current view:", currentView)

  if (currentView === 'builder') {
    return <WorkflowBuilder />
  }

  const handlePayment = () => {
    // Razorpay payment integration placeholder
    // Example: open Razorpay checkout here
    alert("Razorpay Integration: Open payment modal for premium membership");
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
                <p className="text-sm text-slate-400">Premium Automation Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('builder')}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Try Builder
              </Button>
              <Button 
                onClick={handlePayment}
                className="bg-gradient-flow hover:opacity-90 text-white font-medium"
              >
                <Crown className="w-4 h-4 mr-2" />
                Go Premium - $24.99
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
              30+ Premium Features Added
            </Badge>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Automate Everything.{' '}
            <span className="bg-gradient-flow bg-clip-text text-transparent">Build Anything.</span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            The most advanced visual automation platform with AI assistance, team collaboration, 
            workflow marketplace, and premium integrations. Build complex automations in minutes, not hours.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => setCurrentView('builder')}
              className="bg-gradient-flow hover:opacity-90 text-white font-medium px-8 py-3"
            >
              Start Building Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handlePayment}
              className="border-flow-accent text-flow-accent hover:bg-flow-accent/10 px-8 py-3"
            >
              <Crown className="w-5 h-5 mr-2" />
              Premium Features
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-flow-primary mb-2">10,000+</div>
              <div className="text-slate-400">Workflows Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-flow-secondary mb-2">500+</div>
              <div className="text-slate-400">Premium Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-flow-accent mb-2">50+</div>
              <div className="text-slate-400">Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
              <div className="text-slate-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Premium Features That Set Us Apart</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to build, share, and monetize your automation workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Assistant */}
            <Card className="bg-flow-surface/50 border-slate-700 hover:border-flow-primary/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-flow-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-flow-primary" />
                </div>
                <CardTitle className="text-flow-text">AI Node Assistant</CardTitle>
                <CardDescription>GPT-powered suggestions and workflow generation</CardDescription>
              </CardHeader>
            </Card>

            {/* Team Collaboration */}
            <Card className="bg-flow-surface/50 border-slate-700 hover:border-flow-secondary/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-flow-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-flow-secondary" />
                </div>
                <CardTitle className="text-flow-text">Team Collaboration</CardTitle>
                <CardDescription>Share workflows and collaborate in real-time</CardDescription>
              </CardHeader>
            </Card>

            {/* Workflow Marketplace */}
            <Card className="bg-flow-surface/50 border-slate-700 hover:border-flow-accent/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-flow-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-flow-accent" />
                </div>
                <CardTitle className="text-flow-text">Public Marketplace</CardTitle>
                <CardDescription>Share and discover community workflows</CardDescription>
              </CardHeader>
            </Card>

            {/* Simulation Mode */}
            <Card className="bg-flow-surface/50 border-slate-700 hover:border-green-500/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Workflow className="w-6 h-6 text-green-500" />
                </div>
                <CardTitle className="text-flow-text">Simulation Mode</CardTitle>
                <CardDescription>Test workflows without real API calls</CardDescription>
              </CardHeader>
            </Card>

            {/* Mobile PWA */}
            <Card className="bg-flow-surface/50 border-slate-700 hover:border-purple-500/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-purple-500" />
                </div>
                <CardTitle className="text-flow-text">Mobile PWA</CardTitle>
                <CardDescription>Install as an app on mobile and desktop</CardDescription>
              </CardHeader>
            </Card>

            {/* Enterprise Security */}
            <Card className="bg-flow-surface/50 border-slate-700 hover:border-orange-500/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-orange-500" />
                </div>
                <CardTitle className="text-flow-text">Enterprise Security</CardTitle>
                <CardDescription>OAuth vault and role-based access control</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-flow-surface/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 text-lg mb-12">
            Start free, upgrade when you need premium features
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <Card className="bg-flow-surface border-slate-700 p-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Free</CardTitle>
                <div className="text-4xl font-bold mb-4">$0</div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-flow-primary rounded-full"></div>
                  <span>2 workflows</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-flow-primary rounded-full"></div>
                  <span>Basic integrations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-flow-primary rounded-full"></div>
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

            {/* Premium Tier */}
            <Card className="bg-gradient-to-br from-flow-primary/20 to-flow-secondary/20 border-flow-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-flow text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                POPULAR
              </div>
              <CardHeader className="text-center p-8">
                <CardTitle className="text-2xl mb-2 text-flow-text">Premium</CardTitle>
                <div className="text-4xl font-bold mb-1 text-flow-text">$24.99</div>
                <div className="text-sm text-slate-400 mb-4">one-time payment</div>
                <CardDescription>Everything you need to scale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-8 pb-8">
                <div className="flex items-center gap-3 text-flow-text">
                  <div className="w-2 h-2 bg-flow-primary rounded-full"></div>
                  <span>Unlimited workflows</span>
                </div>
                <div className="flex items-center gap-3 text-flow-text">
                  <div className="w-2 h-2 bg-flow-primary rounded-full"></div>
                  <span>Premium integrations</span>
                </div>
                <div className="flex items-center gap-3 text-flow-text">
                  <div className="w-2 h-2 bg-flow-primary rounded-full"></div>
                  <span>AI assistant</span>
                </div>
                <div className="flex items-center gap-3 text-flow-text">
                  <div className="w-2 h-2 bg-flow-primary rounded-full"></div>
                  <span>Team collaboration</span>
                </div>
                <div className="flex items-center gap-3 text-flow-text">
                  <div className="w-2 h-2 bg-flow-primary rounded-full"></div>
                  <span>Priority support</span>
                </div>
                <Button 
                  className="w-full mt-6 bg-gradient-flow hover:opacity-90 text-white font-medium"
                  onClick={handlePayment}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
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
                  and open-source systems. AutoFlow is built to empower creators and professionals to automate 
                  without limits, making complex workflows accessible to everyone.
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
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-flow-text">AutoFlow</div>
                <div className="text-sm text-slate-400">Premium Automation Platform</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>© 2024 Ayush Shah</span>
              <span>Made with <Heart className="w-4 h-4 text-red-500 inline mx-1" /> for creators</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}