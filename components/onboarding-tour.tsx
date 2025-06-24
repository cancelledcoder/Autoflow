"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Zap, 
  Sparkles, 
  Users, 
  Globe,
  Play,
  Crown,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  position: 'center' | 'left' | 'right'
  highlight?: string
}

interface OnboardingTourProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function OnboardingTour({ isOpen, onClose, onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  console.log("Onboarding tour rendered, current step:", currentStep)

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to AutoFlow!',
      description: 'The most advanced visual automation platform. Let\'s take a quick tour to get you started.',
      icon: <Zap className="w-8 h-8 text-flow-primary" />,
      position: 'center'
    },
    {
      id: 'drag-drop',
      title: 'Drag & Drop Interface',
      description: 'Simply drag services from the sidebar to create powerful automation workflows.',
      icon: <ArrowRight className="w-8 h-8 text-flow-secondary" />,
      position: 'left',
      highlight: 'sidebar'
    },
    {
      id: 'ai-assistant',
      title: 'AI-Powered Assistant',
      description: 'Get intelligent suggestions and let AI help you build better workflows.',
      icon: <Sparkles className="w-8 h-8 text-flow-accent" />,
      position: 'right',
      highlight: 'ai-button'
    },
    {
      id: 'premium-features',
      title: 'Premium Features',
      description: 'Unlock team collaboration, advanced analytics, and 25+ premium features.',
      icon: <Crown className="w-8 h-8 text-flow-primary" />,
      position: 'center'
    },
    {
      id: 'marketplace',
      title: 'Workflow Marketplace',
      description: 'Discover community workflows and share your own creations.',
      icon: <Globe className="w-8 h-8 text-flow-accent" />,
      position: 'center'
    },
    {
      id: 'ready',
      title: 'You\'re All Set!',
      description: 'Start building your first automation workflow. Need help? Check out our AI assistant.',
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      position: 'center'
    }
  ]

  const currentStepData = steps[currentStep]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsCompleted(true)
      setTimeout(() => {
        onComplete()
        onClose()
      }, 1000)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0)
      setIsCompleted(false)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-flow-surface border-slate-700">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-flow rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-flow-text">AutoFlow Tour</DialogTitle>
                <DialogDescription>
                  Step {currentStep + 1} of {steps.length}
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-slate-400 hover:text-flow-text"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="py-6">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-400">Progress</span>
              <span className="text-sm text-slate-400">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-flow h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-flow-surface rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-slate-700">
                {currentStepData.icon}
              </div>
              <h3 className="text-2xl font-bold text-flow-text mb-3">
                {currentStepData.title}
              </h3>
              <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            {/* Special content for specific steps */}
            {currentStep === 3 && (
              <div className="bg-gradient-to-r from-flow-primary/20 to-flow-secondary/20 border border-flow-primary/30 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-flow-primary" />
                  <span className="font-medium text-flow-text">Premium Features</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-flow-accent" />
                    <span>AI Assistant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-flow-secondary" />
                    <span>Team Collaboration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="w-3 h-3 text-green-500" />
                    <span>Simulation Mode</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3 text-flow-accent" />
                    <span>Marketplace</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-flow-dark border border-slate-700 rounded-lg p-3 text-left">
                    <div className="w-8 h-8 bg-gradient-flow rounded-lg flex items-center justify-center mb-2">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-sm font-medium text-flow-text mb-1">
                      Workflow {item}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Community automation
                    </p>
                  </div>
                ))}
              </div>
            )}

            {isCompleted && (
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-green-400 font-medium">Welcome to AutoFlow!</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-700">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0 || isCompleted}
            className="border-slate-600 text-slate-300"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-flow-primary' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={isCompleted}
            className="bg-gradient-flow hover:opacity-90 text-white"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="pt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="text-slate-400 hover:text-flow-text"
          >
            Skip tour
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}