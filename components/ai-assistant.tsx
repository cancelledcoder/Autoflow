"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Sparkles, 
  Send, 
  Wand2, 
  Lightbulb, 
  Code, 
  Zap,
  MessageSquare,
  Crown
} from 'lucide-react'

interface AiSuggestion {
  id: string
  type: 'workflow' | 'node' | 'optimization'
  title: string
  description: string
  confidence: number
  implementation: string
}

interface AiAssistantProps {
  currentNodes: any[]
  onSuggestionApply: (suggestion: AiSuggestion) => void
  isPremium?: boolean
}

export function AiAssistant({ currentNodes, onSuggestionApply, isPremium = false }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [userQuery, setUserQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<AiSuggestion[]>([])

  console.log("AI Assistant rendered, current nodes:", currentNodes.length)

  const mockSuggestions: AiSuggestion[] = [
    {
      id: 'ai-1',
      type: 'workflow',
      title: 'Email to Slack Integration',
      description: 'Automatically post important emails to your Slack channel',
      confidence: 95,
      implementation: 'Add Gmail trigger → Filter important emails → Post to Slack'
    },
    {
      id: 'ai-2',
      type: 'optimization',
      title: 'Add Error Handling',
      description: 'Include retry logic and error notifications for better reliability',
      confidence: 88,
      implementation: 'Add delay nodes and error handling branches'
    },
    {
      id: 'ai-3',
      type: 'node',
      title: 'Data Transformation',
      description: 'Transform email data before sending to Slack',
      confidence: 92,
      implementation: 'Add data mapper node between email and Slack'
    }
  ]

  const handleGenerateSuggestions = async () => {
    if (!isPremium) {
      alert('AI Assistant is a premium feature. Upgrade to access GPT-powered suggestions!')
      return
    }

    console.log("Generating AI suggestions for query:", userQuery)
    setIsLoading(true)
    
    // Simulate AI API call
    setTimeout(() => {
      setSuggestions(mockSuggestions)
      setIsLoading(false)
    }, 2000)
  }

  const handleApplySuggestion = (suggestion: AiSuggestion) => {
    console.log("Applying AI suggestion:", suggestion)
    onSuggestionApply(suggestion)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-flow-primary to-flow-secondary hover:opacity-90 text-white shadow-lg animate-flow-glow"
          size="lg"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          AI Assistant
          {!isPremium && <Crown className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-96">
      <Card className="bg-flow-surface/95 backdrop-blur-sm border-slate-700 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-flow-primary to-flow-secondary rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-flow-text text-lg">AI Assistant</CardTitle>
                <CardDescription className="text-xs">
                  {isPremium ? 'GPT-powered workflow suggestions' : 'Premium feature'}
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-flow-text"
            >
              ×
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {!isPremium && (
            <div className="bg-gradient-to-r from-flow-primary/20 to-flow-secondary/20 border border-flow-primary/30 rounded-lg p-4 text-center">
              <Crown className="w-6 h-6 text-flow-primary mx-auto mb-2" />
              <p className="text-sm text-flow-text font-medium">Premium Feature</p>
              <p className="text-xs text-slate-400 mt-1">
                Upgrade to access AI-powered workflow suggestions
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Textarea
              placeholder="Describe what you want to automate..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="bg-flow-dark border-slate-600 text-flow-text placeholder:text-slate-500 resize-none"
              rows={3}
              disabled={!isPremium}
            />
            
            <Button
              onClick={handleGenerateSuggestions}
              disabled={!userQuery.trim() || isLoading || !isPremium}
              className="w-full bg-gradient-to-r from-flow-primary to-flow-secondary hover:opacity-90 text-white"
            >
              {isLoading ? (
                <>
                  <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Generate Suggestions
                </>
              )}
            </Button>
          </div>

          {suggestions.length > 0 && (
            <ScrollArea className="max-h-64">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-flow-text flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-flow-accent" />
                  AI Suggestions
                </h4>
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="bg-flow-dark/50 border border-slate-700 rounded-lg p-3 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="text-sm font-medium text-flow-text">{suggestion.title}</h5>
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.confidence}% match
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400">{suggestion.description}</p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        {suggestion.type === 'workflow' && <Zap className="w-3 h-3 text-flow-primary" />}
                        {suggestion.type === 'node' && <Code className="w-3 h-3 text-flow-secondary" />}
                        {suggestion.type === 'optimization' && <Sparkles className="w-3 h-3 text-flow-accent" />}
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded p-2">
                      <p className="text-xs text-slate-300 font-mono">{suggestion.implementation}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleApplySuggestion(suggestion)}
                      className="w-full bg-flow-primary/20 hover:bg-flow-primary/30 text-flow-primary border border-flow-primary/30"
                    >
                      Apply Suggestion
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          <div className="pt-2 border-t border-slate-700">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MessageSquare className="w-3 h-3" />
              <span>Powered by GPT-4 • {currentNodes.length} nodes analyzed</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}