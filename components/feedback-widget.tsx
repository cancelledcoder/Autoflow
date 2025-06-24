"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MessageCircle, 
  Send, 
  Heart, 
  Bug, 
  Lightbulb, 
  Star,
  X,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react'

interface FeedbackWidgetProps {
  position?: 'bottom-left' | 'bottom-right'
}

export function FeedbackWidget({ position = 'bottom-left' }: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('feedback')
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState<'bug' | 'feature' | 'general'>('general')
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  console.log("Feedback widget rendered, position:", position)

  const handleSubmit = async () => {
    if (!feedback.trim()) return

    console.log("Submitting feedback:", { feedback, email, category, rating })
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsOpen(false)
        setIsSubmitted(false)
        setFeedback('')
        setEmail('')
        setCategory('general')
        setRating(0)
      }, 2000)
    }, 1000)
  }

  const positionClasses = {
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6'
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-30`}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-flow-surface border border-slate-700 hover:bg-slate-700 text-flow-text shadow-lg"
            size="sm"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Feedback
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md bg-flow-surface border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-flow-text flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-flow-primary" />
              Share Your Feedback
            </DialogTitle>
            <DialogDescription>
              Help us improve AutoFlow with your suggestions and bug reports
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-medium text-flow-text mb-2">Thank You!</h3>
              <p className="text-slate-400 text-sm">
                Your feedback has been submitted successfully. We'll review it and get back to you soon.
              </p>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-flow-dark">
                <TabsTrigger 
                  value="feedback" 
                  className="data-[state=active]:bg-flow-primary data-[state=active]:text-white"
                >
                  <Heart className="w-3 h-3 mr-1" />
                  General
                </TabsTrigger>
                <TabsTrigger 
                  value="bug" 
                  className="data-[state=active]:bg-flow-primary data-[state=active]:text-white"
                >
                  <Bug className="w-3 h-3 mr-1" />
                  Bug
                </TabsTrigger>
                <TabsTrigger 
                  value="feature" 
                  className="data-[state=active]:bg-flow-primary data-[state=active]:text-white"
                >
                  <Lightbulb className="w-3 h-3 mr-1" />
                  Feature
                </TabsTrigger>
              </TabsList>

              <TabsContent value="feedback" className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="rating" className="text-flow-text mb-2 block">
                    How would you rate AutoFlow?
                  </Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-2xl transition-colors ${
                          star <= rating ? 'text-yellow-400' : 'text-slate-600'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="feedback" className="text-flow-text">
                    Your feedback
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us what you think about AutoFlow..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="bg-flow-dark border-slate-600 text-flow-text placeholder:text-slate-500 mt-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-flow-text">
                    Email (optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-flow-dark border-slate-600 text-flow-text placeholder:text-slate-500 mt-2"
                  />
                </div>
              </TabsContent>

              <TabsContent value="bug" className="space-y-4 mt-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Bug className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-medium text-red-400">Bug Report</span>
                  </div>
                  <p className="text-xs text-red-300">
                    Please describe the issue you encountered and steps to reproduce it.
                  </p>
                </div>

                <div>
                  <Label htmlFor="bug-description" className="text-flow-text">
                    Bug description
                  </Label>
                  <Textarea
                    id="bug-description"
                    placeholder="Describe the bug and how to reproduce it..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="bg-flow-dark border-slate-600 text-flow-text placeholder:text-slate-500 mt-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-flow-text">
                    Email (for follow-up)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-flow-dark border-slate-600 text-flow-text placeholder:text-slate-500 mt-2"
                  />
                </div>
              </TabsContent>

              <TabsContent value="feature" className="space-y-4 mt-4">
                <div className="bg-flow-primary/10 border border-flow-primary/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-flow-primary" />
                    <span className="text-sm font-medium text-flow-primary">Feature Request</span>
                  </div>
                  <p className="text-xs text-flow-primary/80">
                    Share your ideas for new features or improvements.
                  </p>
                </div>

                <div>
                  <Label htmlFor="feature-request" className="text-flow-text">
                    Feature request
                  </Label>
                  <Textarea
                    id="feature-request"
                    placeholder="Describe the feature you'd like to see..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="bg-flow-dark border-slate-600 text-flow-text placeholder:text-slate-500 mt-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-flow-text">
                    Email (optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-flow-dark border-slate-600 text-flow-text placeholder:text-slate-500 mt-2"
                  />
                </div>
              </TabsContent>

              <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="border-slate-600 text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!feedback.trim() || isSubmitting}
                  className="bg-gradient-flow hover:opacity-90 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}