"use client"

import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, ArrowRight, Sparkles } from 'lucide-react'

interface Suggestion {
  id: string
  title: string
  description: string
  type: 'trigger' | 'action' | 'condition'
  confidence: number
  nextSteps: string[]
}

interface SmartSuggestionsProps {
  currentNodes: any[]
  onSuggestionClick: (suggestion: Suggestion) => void
}

export function SmartSuggestions({ currentNodes, onSuggestionClick }: SmartSuggestionsProps) {
  console.log("SmartSuggestions rendered with nodes:", currentNodes)

  const getSuggestions = (): Suggestion[] => {
    if (currentNodes.length === 0) {
      return [
        {
          id: 'email-start',
          title: 'Start with Email Trigger',
          description: 'Monitor incoming emails and automate responses',
          type: 'trigger',
          confidence: 95,
          nextSteps: ['Add email filters', 'Set up auto-reply', 'Save to database']
        },
        {
          id: 'webhook-start',
          title: 'Create API Webhook',
          description: 'Accept data from external services via HTTP',
          type: 'trigger', 
          confidence: 90,
          nextSteps: ['Process data', 'Send notifications', 'Store results']
        },
        {
          id: 'schedule-start',
          title: 'Schedule Regular Tasks',
          description: 'Run automations on a time-based schedule',
          type: 'trigger',
          confidence: 85,
          nextSteps: ['Check conditions', 'Fetch data', 'Generate reports']
        }
      ]
    }

    const lastNode = currentNodes[currentNodes.length - 1]
    
    if (lastNode?.type === 'trigger') {
      return [
        {
          id: 'filter-suggestion',
          title: 'Add Data Filter',
          description: 'Filter incoming data based on conditions',
          type: 'condition',
          confidence: 92,
          nextSteps: ['Set filter criteria', 'Handle true/false paths']
        },
        {
          id: 'transform-suggestion', 
          title: 'Transform Data',
          description: 'Modify and format the incoming data',
          type: 'action',
          confidence: 88,
          nextSteps: ['Map fields', 'Apply formatting', 'Validate output']
        }
      ]
    }

    if (lastNode?.type === 'condition') {
      return [
        {
          id: 'action-suggestion',
          title: 'Add Action Step',
          description: 'Perform an action with the filtered data',
          type: 'action',
          confidence: 94,
          nextSteps: ['Send notification', 'Save data', 'Call API']
        }
      ]
    }

    return [
      {
        id: 'workflow-complete',
        title: 'Workflow Complete!',
        description: 'Consider adding error handling or additional actions',
        type: 'action',
        confidence: 80,
        nextSteps: ['Add error handling', 'Set up logging', 'Test workflow']
      }
    ]
  }

  const suggestions = getSuggestions()

  if (suggestions.length === 0) return null

  return (
    <Card className="p-4 bg-gradient-to-r from-flow-primary/10 to-flow-secondary/10 border-flow-primary/30">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-gradient-flow rounded-full flex items-center justify-center animate-flow-pulse">
          <Lightbulb className="w-3 h-3 text-white" />
        </div>
        <h3 className="font-medium text-flow-text">Smart Suggestions</h3>
        <Sparkles className="w-4 h-4 text-flow-accent" />
      </div>

      <div className="space-y-3">
        {suggestions.map(suggestion => (
          <div
            key={suggestion.id}
            className="p-3 bg-flow-surface/50 rounded-lg border border-slate-700 hover:border-flow-accent/50 transition-colors cursor-pointer"
            onClick={() => onSuggestionClick(suggestion)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-flow-text">{suggestion.title}</h4>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      suggestion.type === 'trigger' ? 'bg-flow-secondary/20 text-flow-secondary' :
                      suggestion.type === 'action' ? 'bg-flow-primary/20 text-flow-primary' :
                      'bg-flow-accent/20 text-flow-accent'
                    }`}
                  >
                    {suggestion.type}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mb-2">{suggestion.description}</p>
                
                {suggestion.nextSteps.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500">Next steps:</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestion.nextSteps.slice(0, 2).map((step, index) => (
                        <span key={index} className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 ml-3">
                <div className="text-xs text-slate-500">
                  {suggestion.confidence}% match
                </div>
                <ArrowRight className="w-4 h-4 text-flow-accent" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-700">
        <Button size="sm" variant="ghost" className="text-xs text-slate-400 hover:text-flow-text">
          View All Suggestions
        </Button>
      </div>
    </Card>
  )
}