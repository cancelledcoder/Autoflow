"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  X, 
  Settings, 
  Save, 
  Play, 
  Code, 
  Eye,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

interface NodeConfigPanelProps {
  node: any
  isOpen: boolean
  onClose: () => void
  onSave: (config: any) => void
}

export function NodeConfigPanel({ node, isOpen, onClose, onSave }: NodeConfigPanelProps) {
  const [config, setConfig] = useState({
    name: node?.name || '',
    description: node?.description || '',
    enabled: true,
    parameters: {}
  })
  const [activeTab, setActiveTab] = useState<'config' | 'test' | 'code'>('config')
  const [testResult, setTestResult] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')

  console.log("NodeConfigPanel opened for node:", node)

  if (!isOpen || !node) return null

  const handleSave = () => {
    console.log("Saving node config:", config)
    onSave(config)
    onClose()
  }

  const handleTest = async () => {
    console.log("Testing node configuration")
    setTestResult('testing')
    
    // Simulate API call
    setTimeout(() => {
      setTestResult(Math.random() > 0.3 ? 'success' : 'error')
    }, 2000)
  }

  const renderConfigForm = () => {
    switch (node.type) {
      case 'trigger':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="trigger-type">Trigger Type</Label>
              <Select defaultValue="webhook">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="webhook">Webhook</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="schedule">Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input 
                id="webhook-url"
                placeholder="https://your-app.com/webhook"
                className="bg-flow-surface border-slate-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auth-required">Authentication Required</Label>
              <Switch id="auth-required" />
            </div>
          </div>
        )
      
      case 'action':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="action-type">Action Type</Label>
              <Select defaultValue="send-email">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="send-email">Send Email</SelectItem>
                  <SelectItem value="slack-message">Slack Message</SelectItem>
                  <SelectItem value="api-call">API Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="recipient">Email Recipient</Label>
              <Input 
                id="recipient"
                placeholder="user@example.com"
                className="bg-flow-surface border-slate-600"
              />
            </div>

            <div>
              <Label htmlFor="message-template">Message Template</Label>
              <Textarea 
                id="message-template"
                placeholder="Hello {{name}}, your order {{order_id}} has been processed."
                rows={3}
                className="bg-flow-surface border-slate-600"
              />
            </div>
          </div>
        )
      
      case 'condition':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="condition-field">Field to Check</Label>
              <Select defaultValue="email">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="operator">Condition</Label>
              <Select defaultValue="contains">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="greater">Greater than</SelectItem>
                  <SelectItem value="less">Less than</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="condition-value">Value</Label>
              <Input 
                id="condition-value"
                placeholder="Enter value to compare"
                className="bg-flow-surface border-slate-600"
              />
            </div>
          </div>
        )
      
      default:
        return <div>No configuration available for this node type.</div>
    }
  }

  const renderTestResults = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-flow-text">Test Configuration</h4>
          <Button 
            size="sm" 
            onClick={handleTest}
            disabled={testResult === 'testing'}
            className="bg-flow-accent hover:bg-flow-accent/90"
          >
            {testResult === 'testing' ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Test
              </>
            )}
          </Button>
        </div>

        {testResult !== 'idle' && (
          <Card className="p-3">
            {testResult === 'testing' && (
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Testing node configuration...</span>
              </div>
            )}
            
            {testResult === 'success' && (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>Configuration test passed successfully!</span>
              </div>
            )}
            
            {testResult === 'error' && (
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span>Configuration test failed. Check your settings.</span>
              </div>
            )}
          </Card>
        )}

        <div>
          <Label>Test Data Preview</Label>
          <Card className="p-3 bg-flow-surface/50 border-slate-700 mt-2">
            <pre className="text-xs text-slate-400 overflow-x-auto">
{JSON.stringify({
  timestamp: "2024-06-24T10:30:00Z",
  data: {
    email: "test@example.com",
    subject: "Test Email",
    body: "This is a test message"
  },
  metadata: {
    source: node.service,
    type: node.type
  }
}, null, 2)}
            </pre>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-flow-surface border-l border-slate-700 z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${
              node.type === 'trigger' ? 'bg-flow-secondary/20 text-flow-secondary' :
              node.type === 'action' ? 'bg-flow-primary/20 text-flow-primary' :
              'bg-flow-accent/20 text-flow-accent'
            }`}>
              {node.icon}
            </div>
            <div>
              <h3 className="font-medium text-flow-text">{node.name}</h3>
              <p className="text-sm text-slate-400">{node.service}</p>
            </div>
          </div>
          <Button size="sm" variant="ghost" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex gap-1">
          {['config', 'test', 'code'].map((tab) => (
            <Button
              key={tab}
              size="sm"
              variant={activeTab === tab ? "default" : "ghost"}
              onClick={() => setActiveTab(tab as any)}
              className={activeTab === tab 
                ? "bg-flow-primary hover:bg-flow-primary/90" 
                : "text-slate-400 hover:text-flow-text"
              }
            >
              {tab === 'config' && <Settings className="w-4 h-4 mr-1" />}
              {tab === 'test' && <Play className="w-4 h-4 mr-1" />}
              {tab === 'code' && <Code className="w-4 h-4 mr-1" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'config' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="node-name">Node Name</Label>
              <Input 
                id="node-name"
                value={config.name}
                onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                className="bg-flow-surface border-slate-600"
              />
            </div>

            <div>
              <Label htmlFor="node-description">Description</Label>
              <Textarea 
                id="node-description"
                value={config.description}
                onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
                className="bg-flow-surface border-slate-600"
              />
            </div>

            <Separator className="bg-slate-700" />

            {renderConfigForm()}
          </div>
        )}

        {activeTab === 'test' && renderTestResults()}

        {activeTab === 'code' && (
          <div className="space-y-4">
            <div>
              <Label>Generated Code</Label>
              <Card className="p-3 bg-flow-surface/50 border-slate-700 mt-2">
                <pre className="text-xs text-slate-300 overflow-x-auto">
{`// n8n Node Configuration
{
  "name": "${config.name}",
  "type": "${node.service.toLowerCase()}",
  "position": [200, 100],
  "parameters": {
    "operation": "${node.type}",
    "resource": "default"
  }
}`}
                </pre>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex-1 bg-flow-primary hover:bg-flow-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="outline" onClick={onClose} className="border-slate-600 text-slate-300">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}