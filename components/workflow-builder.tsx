"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { toast } from '@/hooks/use-toast'
import { SmartSuggestions } from './smart-suggestions'
import { NodeConfigPanel } from './node-config-panel'
import { EnhancedWorkflowCanvas } from './workflow-canvas'
import { AiAssistant } from './ai-assistant'
import { PremiumFeatures } from './premium-features'
import { OnboardingTour } from './onboarding-tour'
import { FeedbackWidget } from './feedback-widget'
import { useWorkflowHistory } from '@/hooks/use-workflow-history'
import { useAutoSave } from '@/hooks/use-auto-save'
import { 
  Play, 
  Plus, 
  Settings, 
  Zap, 
  Mail, 
  Calendar, 
  Database, 
  Globe, 
  MessageSquare,
  FileText,
  Clock,
  Filter,
  ArrowRight,
  Download,
  Sparkles,
  Undo2,
  Redo2,
  Save,
  CheckCircle,
  Crown,
  Users,
  Share2,
  BarChart3,
  Shield,
  Bell,
  Home
} from 'lucide-react'

interface WorkflowNode {
  id: string
  type: 'trigger' | 'action' | 'condition'
  service: string
  name: string
  description: string
  icon: React.ReactNode
  x: number
  y: number
  connections: string[]
}

interface ServiceTemplate {
  id: string
  service: string
  name: string
  description: string
  icon: React.ReactNode
  type: 'trigger' | 'action' | 'condition'
  category: string
}

const serviceTemplates: ServiceTemplate[] = [
  // Triggers
  { id: 'email-trigger', service: 'Gmail', name: 'New Email', description: 'Trigger when new email arrives', icon: <Mail className="w-4 h-4" />, type: 'trigger', category: 'Email' },
  { id: 'calendar-trigger', service: 'Google Calendar', name: 'New Event', description: 'Trigger on calendar events', icon: <Calendar className="w-4 h-4" />, type: 'trigger', category: 'Calendar' },
  { id: 'webhook-trigger', service: 'Webhook', name: 'HTTP Request', description: 'Trigger via HTTP webhook', icon: <Globe className="w-4 h-4" />, type: 'trigger', category: 'API' },
  
  // Actions
  { id: 'send-email', service: 'Gmail', name: 'Send Email', description: 'Send an email message', icon: <Mail className="w-4 h-4" />, type: 'action', category: 'Email' },
  { id: 'slack-message', service: 'Slack', name: 'Send Message', description: 'Post to Slack channel', icon: <MessageSquare className="w-4 h-4" />, type: 'action', category: 'Communication' },
  { id: 'save-to-db', service: 'Database', name: 'Save Data', description: 'Store data in database', icon: <Database className="w-4 h-4" />, type: 'action', category: 'Storage' },
  { id: 'create-file', service: 'Google Drive', name: 'Create File', description: 'Create a new file', icon: <FileText className="w-4 h-4" />, type: 'action', category: 'Files' },
  
  // Conditions
  { id: 'filter-data', service: 'Filter', name: 'Filter Data', description: 'Filter based on conditions', icon: <Filter className="w-4 h-4" />, type: 'condition', category: 'Logic' },
  { id: 'delay', service: 'Wait', name: 'Delay', description: 'Wait for specified time', icon: <Clock className="w-4 h-4" />, type: 'condition', category: 'Logic' },
]

function DraggableServiceItem({ template }: { template: ServiceTemplate }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: template.id,
    data: template,
  })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-move"
    >
      <Card className="p-3 hover:bg-flow-surface/50 transition-colors border-slate-700 bg-flow-surface/30">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${
            template.type === 'trigger' ? 'bg-flow-secondary/20 text-flow-secondary' :
            template.type === 'action' ? 'bg-flow-primary/20 text-flow-primary' :
            'bg-flow-accent/20 text-flow-accent'
          }`}>
            {template.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-sm text-flow-text truncate">{template.name}</h4>
              <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                {template.service}
              </Badge>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">{template.description}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

function WorkflowCanvas({ nodes, onAddNode, onNodeClick }: { 
  nodes: WorkflowNode[]
  onAddNode: (node: Omit<WorkflowNode, 'id'>) => void 
  onNodeClick: (node: WorkflowNode) => void
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'workflow-canvas',
  })

  console.log("Canvas rendered with nodes:", nodes)

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 relative bg-gradient-to-br from-flow-dark via-slate-900 to-flow-dark min-h-96 rounded-lg border-2 border-dashed transition-colors ${
        isOver ? 'border-flow-accent bg-flow-accent/5' : 'border-slate-700'
      }`}
    >
      {nodes.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-flow rounded-full flex items-center justify-center animate-flow-pulse">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-flow-text mb-2">Build Your First Automation</h3>
              <p className="text-slate-400 max-w-sm">
                Drag services from the sidebar to create powerful workflows. Start with a trigger to begin.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6">
          {nodes.map((node, index) => (
            <div key={node.id} className="flex items-center gap-4">
              <Card 
                className={`p-4 border-2 transition-all hover:scale-105 cursor-pointer ${
                  node.type === 'trigger' ? 'border-flow-secondary bg-flow-secondary/10 hover:bg-flow-secondary/20' :
                  node.type === 'action' ? 'border-flow-primary bg-flow-primary/10 hover:bg-flow-primary/20' :
                  'border-flow-accent bg-flow-accent/10 hover:bg-flow-accent/20'
                }`}
                onClick={() => onNodeClick(node)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    node.type === 'trigger' ? 'bg-flow-secondary text-white' :
                    node.type === 'action' ? 'bg-flow-primary text-white' :
                    'bg-flow-accent text-white'
                  }`}>
                    {node.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-flow-text">{node.name}</h3>
                    <p className="text-sm text-slate-400">{node.service}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-slate-400 hover:text-flow-text"
                    onClick={(e) => {
                      e.stopPropagation()
                      onNodeClick(node)
                    }}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
              {index < nodes.length - 1 && (
                <ArrowRight className="w-6 h-6 text-flow-accent animate-pulse" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function WorkflowBuilder() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null)
  const [configPanelOpen, setConfigPanelOpen] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [currentView, setCurrentView] = useState<'builder' | 'analytics' | 'marketplace'>('builder')
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  // History management for undo/redo
  const { saveState, undo, redo, canUndo, canRedo } = useWorkflowHistory(nodes)

  // Auto-save functionality
  useAutoSave(nodes, (savedNodes) => {
    setLastSaved(new Date())
    toast({
      title: "Workflow Saved",
      description: "Your changes have been automatically saved.",
      duration: 2000,
    })
  })

  console.log("WorkflowBuilder rendered with nodes:", nodes)

  const categories = ['All', ...Array.from(new Set(serviceTemplates.map(t => t.category)))]
  
  const filteredTemplates = selectedCategory === 'All' 
    ? serviceTemplates 
    : serviceTemplates.filter(t => t.category === selectedCategory)

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    console.log("Drag end event:", event)
    const { active, over } = event

    if (over && over.id === 'workflow-canvas' && active.data.current) {
      const template = active.data.current as ServiceTemplate
      console.log("Adding node from template:", template)
      
      const newNode: Omit<WorkflowNode, 'id'> = {
        type: template.type,
        service: template.service,
        name: template.name,
        description: template.description,
        icon: template.icon,
        x: 0,
        y: 0,
        connections: []
      }

      setNodes(prev => {
        const updated = [...prev, { ...newNode, id: `node-${Date.now()}` }]
        console.log("Updated nodes:", updated)
        saveState(updated, `Added ${template.name} node`)
        return updated
      })
    }
  }, [saveState])

  const handleNodeClick = useCallback((node: WorkflowNode) => {
    console.log("Node clicked:", node)
    setSelectedNode(node)
    setConfigPanelOpen(true)
  }, [])

  const handleSuggestionClick = useCallback((suggestion: any) => {
    console.log("Suggestion clicked:", suggestion)
    // Convert suggestion to node and add it
    const newNode: Omit<WorkflowNode, 'id'> = {
      type: suggestion.type,
      service: suggestion.title,
      name: suggestion.title,
      description: suggestion.description,
      icon: <Sparkles className="w-4 h-4" />,
      x: 0,
      y: 0,
      connections: []
    }

    setNodes(prev => {
      const updated = [...prev, { ...newNode, id: `node-${Date.now()}` }]
      saveState(updated, `Added suggested ${suggestion.title}`)
      return updated
    })
  }, [saveState])

  const handleConfigSave = useCallback((config: any) => {
    console.log("Config saved:", config)
    if (selectedNode) {
      setNodes(prev => {
        const updated = prev.map(node => 
          node.id === selectedNode.id 
            ? { ...node, name: config.name, description: config.description }
            : node
        )
        saveState(updated, `Configured ${selectedNode.name}`)
        return updated
      })
    }
  }, [selectedNode, saveState])

  const handleNodeDelete = useCallback((nodeId: string) => {
    setNodes(prev => {
      const nodeToDelete = prev.find(n => n.id === nodeId)
      const updated = prev.filter(n => n.id !== nodeId)
      saveState(updated, `Deleted ${nodeToDelete?.name || 'node'}`)
      return updated
    })
  }, [saveState])

  const handleNodeDuplicate = useCallback((node: WorkflowNode) => {
    const duplicatedNode: Omit<WorkflowNode, 'id'> = {
      ...node,
      name: `${node.name} (Copy)`,
      connections: []
    }
    
    setNodes(prev => {
      const updated = [...prev, { ...duplicatedNode, id: `node-${Date.now()}` }]
      saveState(updated, `Duplicated ${node.name}`)
      return updated
    })
  }, [saveState])

  const handleUndo = useCallback(() => {
    const previousState = undo()
    if (previousState) {
      setNodes(previousState)
      toast({
        title: "Undone",
        description: "Reverted to previous state",
        duration: 1500,
      })
    }
  }, [undo])

  const handleRedo = useCallback(() => {
    const nextState = redo()
    if (nextState) {
      setNodes(nextState)
      toast({
        title: "Redone", 
        description: "Restored next state",
        duration: 1500,
      })
    }
  }, [redo])

  const exportToN8n = () => {
    console.log("Exporting workflow to n8n format:", nodes)
    const workflow = {
      name: "AutoFlow Workflow",
      nodes: nodes.map((node, index) => ({
        id: node.id,
        name: node.name,
        type: node.service.toLowerCase().replace(/\s+/g, ''),
        position: [100 + (index * 200), 100],
        parameters: {}
      })),
      connections: {}
    }
    
    const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'autoflow-workflow.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleUpgradeToPremium = () => {
    console.log("Opening PayPal payment for premium upgrade")
    // PayPal payment link with the specified email
    const paypalLink = `https://www.paypal.com/paypalme/ayushbusinessmail/24.99USD`
    window.open(paypalLink, '_blank')
  }

  const handleOnboardingComplete = () => {
    console.log("Onboarding completed")
    setHasCompletedOnboarding(true)
    setShowOnboarding(false)
    // Could save to localStorage to remember completion
  }

  const handleAiSuggestionApply = (suggestion: any) => {
    console.log("Applying AI suggestion:", suggestion)
    // Convert AI suggestion to workflow nodes
    const newNode: Omit<WorkflowNode, 'id'> = {
      type: 'action',
      service: suggestion.title,
      name: suggestion.title,
      description: suggestion.description,
      icon: <Sparkles className="w-4 h-4" />,
      x: 0,
      y: 0,
      connections: []
    }

    setNodes(prev => {
      const updated = [...prev, { ...newNode, id: `ai-${Date.now()}` }]
      saveState(updated, `Added AI suggestion: ${suggestion.title}`)
      return updated
    })
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-screen bg-flow-dark text-flow-text flex">
        {/* Sidebar */}
        <div className="w-80 bg-flow-surface border-r border-slate-700 flex flex-col">
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-flow rounded-lg flex items-center justify-center animate-flow-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-flow-text">AutoFlow</h1>
                <p className="text-sm text-slate-400">
                  Premium Automation Platform
                  {isPremium && <Crown className="w-3 h-3 text-flow-primary inline ml-1" />}
                </p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex gap-2">
                <Button size="sm" className="bg-flow-primary hover:bg-flow-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                  Templates
                </Button>
              </div>
              
              <div className="flex gap-2">
                <PremiumFeatures isPremium={isPremium} onUpgrade={handleUpgradeToPremium} />
              </div>

              {!isPremium && (
                <div className="bg-gradient-to-r from-flow-primary/20 to-flow-secondary/20 border border-flow-primary/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-4 h-4 text-flow-primary" />
                    <span className="text-sm font-medium text-flow-text">Upgrade to Premium</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    Unlock AI assistant, team collaboration, and 25+ premium features
                  </p>
                  <Button 
                    size="sm" 
                    onClick={handleUpgradeToPremium}
                    className="w-full bg-gradient-flow hover:opacity-90 text-white"
                  >
                    Upgrade for $24.99
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-b border-slate-700">
            <h3 className="text-sm font-medium text-flow-text mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  size="sm"
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-flow-primary hover:bg-flow-primary/90" 
                    : "border-slate-600 text-slate-300 hover:bg-slate-700"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-flow-text mb-3">Services</h3>
              {filteredTemplates.map(template => (
                <DraggableServiceItem key={template.id} template={template} />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-slate-700 bg-flow-surface/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-flow-text">Untitled Workflow</h2>
                <p className="text-sm text-slate-400">{nodes.length} nodes</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Navigation Tabs */}
                <div className="flex bg-flow-surface rounded-lg p-1 mr-4">
                  <Button
                    size="sm"
                    variant={currentView === 'builder' ? 'default' : 'ghost'}
                    onClick={() => setCurrentView('builder')}
                    className={currentView === 'builder' ? 'bg-flow-primary text-white' : 'text-slate-400'}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Builder
                  </Button>
                  <Button
                    size="sm"
                    variant={currentView === 'analytics' ? 'default' : 'ghost'}
                    onClick={() => setCurrentView('analytics')}
                    className={currentView === 'analytics' ? 'bg-flow-primary text-white' : 'text-slate-400'}
                    disabled={!isPremium}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics
                    {!isPremium && <Crown className="w-3 h-3 ml-1" />}
                  </Button>
                  <Button
                    size="sm"
                    variant={currentView === 'marketplace' ? 'default' : 'ghost'}
                    onClick={() => setCurrentView('marketplace')}
                    className={currentView === 'marketplace' ? 'bg-flow-primary text-white' : 'text-slate-400'}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Marketplace
                  </Button>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleUndo}
                        disabled={!canUndo}
                        className="border-slate-600 text-slate-300"
                      >
                        <Undo2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Undo (Ctrl+Z)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleRedo}
                        disabled={!canRedo}
                        className="border-slate-600 text-slate-300"
                      >
                        <Redo2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Redo (Ctrl+Y)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Separator orientation="vertical" className="h-6 bg-slate-600" />

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-slate-600 text-slate-300"
                        disabled={!isPremium}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {isPremium ? 'Simulate' : 'Test'}
                        {!isPremium && <Crown className="w-3 h-3 ml-1" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isPremium ? 'Run in simulation mode' : 'Premium feature - Simulation mode'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-slate-600 text-slate-300"
                        disabled={!isPremium}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                        {!isPremium && <Crown className="w-3 h-3 ml-1" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isPremium ? 'Share with team' : 'Premium feature - Team sharing'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="sm" 
                        onClick={exportToN8n}
                        className="bg-flow-accent hover:bg-flow-accent/90"
                        disabled={nodes.length === 0}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download workflow as n8n JSON</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {lastSaved && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 ml-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>Saved {lastSaved.toLocaleTimeString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 space-y-6">
            {currentView === 'builder' && (
              <>
                <EnhancedWorkflowCanvas 
                  nodes={nodes} 
                  onNodeClick={handleNodeClick}
                  onNodeDelete={handleNodeDelete}
                  onNodeDuplicate={handleNodeDuplicate}
                  onWorkflowChange={setNodes}
                />
                
                {/* Smart Suggestions */}
                <SmartSuggestions 
                  currentNodes={nodes} 
                  onSuggestionClick={handleSuggestionClick}
                />
              </>
            )}

            {currentView === 'analytics' && (
              <div className="text-center py-20">
                <BarChart3 className="w-16 h-16 text-flow-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-flow-text mb-4">Workflow Analytics</h3>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                  Track your workflow performance, execution rates, and optimization opportunities.
                </p>
                {!isPremium && (
                  <div className="bg-gradient-to-r from-flow-primary/20 to-flow-secondary/20 border border-flow-primary/30 rounded-lg p-6 max-w-md mx-auto">
                    <Crown className="w-8 h-8 text-flow-primary mx-auto mb-3" />
                    <p className="text-flow-text font-medium mb-2">Premium Feature</p>
                    <p className="text-slate-400 text-sm mb-4">
                      Upgrade to access detailed analytics and performance insights
                    </p>
                    <Button 
                      onClick={handleUpgradeToPremium}
                      className="bg-gradient-flow hover:opacity-90 text-white"
                    >
                      Upgrade to Premium
                    </Button>
                  </div>
                )}
              </div>
            )}

            {currentView === 'marketplace' && (
              <div className="text-center py-20">
                <Globe className="w-16 h-16 text-flow-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-flow-text mb-4">Workflow Marketplace</h3>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                  Discover community workflows, share your creations, and find inspiration for your next automation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-flow-surface/50 border border-slate-700 rounded-lg p-6 text-left">
                      <div className="w-12 h-12 bg-gradient-flow rounded-lg flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-medium text-flow-text mb-2">Sample Workflow {item}</h4>
                      <p className="text-sm text-slate-400 mb-4">
                        A powerful automation workflow created by the community
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-xs">★</span>
                            ))}
                          </div>
                          <span className="text-xs text-slate-500 ml-1">(24)</span>
                        </div>
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                          Install
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Node Configuration Panel */}
        <NodeConfigPanel
          node={selectedNode}
          isOpen={configPanelOpen}
          onClose={() => setConfigPanelOpen(false)}
          onSave={handleConfigSave}
        />

        {/* AI Assistant */}
        <AiAssistant 
          currentNodes={nodes}
          onSuggestionApply={handleAiSuggestionApply}
          isPremium={isPremium}
        />

        {/* Onboarding Tour */}
        <OnboardingTour
          isOpen={showOnboarding && !hasCompletedOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={handleOnboardingComplete}
        />

        {/* Feedback Widget */}
        <FeedbackWidget position="bottom-left" />
      </div>
    </DndContext>
  )
}