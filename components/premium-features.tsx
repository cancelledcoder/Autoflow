"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Crown, 
  Users, 
  Globe, 
  Zap, 
  Shield, 
  Rocket,
  Star,
  Heart,
  Share2,
  Download,
  Upload,
  Settings,
  Play,
  Pause,
  BarChart3,
  CreditCard,
  Smartphone,
  MessageSquare,
  BookOpen,
  TrendingUp
} from 'lucide-react'

interface PremiumFeaturesProps {
  isPremium: boolean
  onUpgrade: () => void
}

export function PremiumFeatures({ isPremium, onUpgrade }: PremiumFeaturesProps) {
  const [activeTab, setActiveTab] = useState('collaboration')

  console.log("Premium features rendered, isPremium:", isPremium)

  const features = [
    {
      id: 'collaboration',
      name: 'Team Collaboration',
      icon: <Users className="w-5 h-5" />,
      description: 'Work together on workflows in real-time',
      component: <TeamCollaboration isPremium={isPremium} />
    },
    {
      id: 'marketplace',
      name: 'Workflow Marketplace',
      icon: <Globe className="w-5 h-5" />,
      description: 'Share and discover community workflows',
      component: <WorkflowMarketplace isPremium={isPremium} />
    },
    {
      id: 'simulation',
      name: 'Simulation Mode',
      icon: <Play className="w-5 h-5" />,
      description: 'Test workflows without real API calls',
      component: <SimulationMode isPremium={isPremium} />
    },
    {
      id: 'analytics',
      name: 'Advanced Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Track workflow performance and usage',
      component: <AdvancedAnalytics isPremium={isPremium} />
    },
    {
      id: 'mobile',
      name: 'Mobile PWA',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Install as an app on mobile devices',
      component: <MobilePWA isPremium={isPremium} />
    },
    {
      id: 'security',
      name: 'Enterprise Security',
      icon: <Shield className="w-5 h-5" />,
      description: 'OAuth vault and role-based access',
      component: <EnterpriseSecurity isPremium={isPremium} />
    }
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-flow-primary to-flow-secondary hover:opacity-90 text-white">
          <Crown className="w-4 h-4 mr-2" />
          Premium Features
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-flow-surface border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-flow-text flex items-center gap-2">
            <Crown className="w-6 h-6 text-flow-primary" />
            Premium Features
          </DialogTitle>
          <DialogDescription>
            Unlock advanced automation capabilities with our premium features
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Feature Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {features.map((feature) => (
                <Button
                  key={feature.id}
                  variant={activeTab === feature.id ? "default" : "ghost"}
                  className={`w-full justify-start h-auto p-3 ${
                    activeTab === feature.id 
                      ? "bg-flow-primary text-white" 
                      : "text-slate-400 hover:text-flow-text hover:bg-slate-800"
                  }`}
                  onClick={() => setActiveTab(feature.id)}
                >
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <div className="text-left">
                      <div className="font-medium text-sm">{feature.name}</div>
                      <div className="text-xs opacity-70 line-clamp-2">{feature.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            {!isPremium && (
              <Card className="mt-4 bg-gradient-to-br from-flow-primary/20 to-flow-secondary/20 border-flow-primary/30">
                <CardContent className="p-4 text-center">
                  <Crown className="w-8 h-8 text-flow-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-flow-text mb-2">Upgrade to Premium</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Unlock all features for just ₹1,699/mo
                  </p>
                  <Button 
                    onClick={onUpgrade} 
                    className="w-full bg-gradient-to-r from-flow-primary to-flow-secondary hover:opacity-90 text-white"
                    size="sm"
                  >
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Feature Content */}
          <div className="lg:col-span-3">
            <ScrollArea className="h-96">
              {features.find(f => f.id === activeTab)?.component}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function TeamCollaboration({ isPremium }: { isPremium: boolean }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Users className="w-12 h-12 text-flow-secondary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-flow-text mb-2">Team Collaboration</h3>
        <p className="text-slate-400">Work together on workflows in real-time with your team</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-flow-dark border-slate-700">
          <CardHeader>
            <CardTitle className="text-flow-text text-lg">Real-time Editing</CardTitle>
            <CardDescription>See changes as teammates edit workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-flow-primary rounded-full flex items-center justify-center text-xs text-white">AS</div>
              <div className="w-6 h-6 bg-flow-secondary rounded-full flex items-center justify-center text-xs text-white">JD</div>
              <div className="w-6 h-6 bg-flow-accent rounded-full flex items-center justify-center text-xs text-white">SM</div>
              <span className="text-xs text-slate-400 ml-2">3 editors online</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-flow-dark border-slate-700">
          <CardHeader>
            <CardTitle className="text-flow-text text-lg">Role Management</CardTitle>
            <CardDescription>Control who can view, edit, or admin workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Admin</span>
                <Badge variant="secondary">Full Access</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Editor</span>
                <Badge variant="outline">Edit Only</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Viewer</span>
                <Badge variant="outline">Read Only</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {!isPremium && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
          <p className="text-slate-400 text-sm">Upgrade to Premium to collaborate with your team</p>
        </div>
      )}
    </div>
  )
}

function WorkflowMarketplace({ isPremium }: { isPremium: boolean }) {
  const marketplaceWorkflows = [
    {
      id: 1,
      title: "Email to Slack Automation",
      author: "john_doe",
      rating: 4.8,
      downloads: 1245,
      category: "Communication",
      price: "Free"
    },
    {
      id: 2,
      title: "Social Media Content Scheduler",
      author: "social_guru",
      rating: 4.9,
      downloads: 892,
      category: "Marketing",
      price: "Premium"
    },
    {
      id: 3,
      title: "Database Backup System",
      author: "devops_pro",
      rating: 4.7,
      downloads: 567,
      category: "DevOps",
      price: "Free"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Globe className="w-12 h-12 text-flow-accent mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-flow-text mb-2">Workflow Marketplace</h3>
        <p className="text-slate-400">Discover and share workflows with the community</p>
      </div>

      <div className="space-y-4">
        {marketplaceWorkflows.map((workflow) => (
          <Card key={workflow.id} className="bg-flow-dark border-slate-700 hover:border-slate-600 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-flow-text">{workflow.title}</h4>
                    <Badge variant="outline" className="text-xs">{workflow.category}</Badge>
                    {workflow.price === "Premium" && <Crown className="w-3 h-3 text-flow-primary" />}
                  </div>
                  <p className="text-sm text-slate-400 mb-2">by @{workflow.author}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span>{workflow.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      <span>{workflow.downloads}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                    <Heart className="w-3 h-3 mr-1" />
                    Like
                  </Button>
                  <Button size="sm" className="bg-flow-primary hover:bg-flow-primary/90">
                    Install
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isPremium && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
          <p className="text-slate-400 text-sm">Upgrade to Premium to access premium workflows and publish your own</p>
        </div>
      )}
    </div>
  )
}

function SimulationMode({ isPremium }: { isPremium: boolean }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Play className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-flow-text mb-2">Simulation Mode</h3>
        <p className="text-slate-400">Test your workflows safely without real API calls</p>
      </div>

      <div className="bg-flow-dark border border-slate-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-flow-text">Simulation Controls</h4>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="border-green-500 text-green-500">
              <Play className="w-3 h-3 mr-1" />
              Start Test
            </Button>
            <Button size="sm" variant="outline" className="border-red-500 text-red-500">
              <Pause className="w-3 h-3 mr-1" />
              Stop
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 bg-green-500/10 border border-green-500/20 rounded">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">Gmail trigger simulated</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-400">Data processing simulated</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-purple-500/10 border border-purple-500/20 rounded">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-purple-400">Slack message simulated</span>
          </div>
        </div>
      </div>

      {!isPremium && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
          <p className="text-slate-400 text-sm">Upgrade to Premium to test workflows in simulation mode</p>
        </div>
      )}
    </div>
  )
}

function AdvancedAnalytics({ isPremium }: { isPremium: boolean }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <BarChart3 className="w-12 h-12 text-flow-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-flow-text mb-2">Advanced Analytics</h3>
        <p className="text-slate-400">Track workflow performance and usage metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-flow-dark border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-flow-primary mb-1">2,847</div>
            <div className="text-sm text-slate-400">Total Executions</div>
          </CardContent>
        </Card>
        <Card className="bg-flow-dark border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">98.2%</div>
            <div className="text-sm text-slate-400">Success Rate</div>
          </CardContent>
        </Card>
        <Card className="bg-flow-dark border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-flow-accent mb-1">1.2s</div>
            <div className="text-sm text-slate-400">Avg Runtime</div>
          </CardContent>
        </Card>
      </div>

      {!isPremium && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
          <p className="text-slate-400 text-sm">Upgrade to Premium to access detailed analytics and performance insights</p>
        </div>
      )}
    </div>
  )
}

function MobilePWA({ isPremium }: { isPremium: boolean }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Smartphone className="w-12 h-12 text-flow-accent mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-flow-text mb-2">Mobile PWA</h3>
        <p className="text-slate-400">Install AutoFlow as an app on your mobile device</p>
      </div>

      <div className="bg-flow-dark border border-slate-700 rounded-lg p-6 text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-gradient-flow rounded-2xl mx-auto mb-3 flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-medium text-flow-text mb-2">AutoFlow Mobile</h4>
          <p className="text-sm text-slate-400">Access your workflows on the go</p>
        </div>
        
        <div className="space-y-2 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-flow-primary rounded-full"></div>
            <span>Offline workflow viewing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-flow-primary rounded-full"></div>
            <span>Push notifications</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-flow-primary rounded-full"></div>
            <span>Mobile-optimized interface</span>
          </div>
        </div>
      </div>

      {!isPremium && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
          <p className="text-slate-400 text-sm">Upgrade to Premium to install AutoFlow as a mobile app</p>
        </div>
      )}
    </div>
  )
}

function EnterpriseSecurity({ isPremium }: { isPremium: boolean }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="w-12 h-12 text-orange-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-flow-text mb-2">Enterprise Security</h3>
        <p className="text-slate-400">Advanced security features for teams and organizations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-flow-dark border-slate-700">
          <CardHeader>
            <CardTitle className="text-flow-text text-lg">OAuth Token Vault</CardTitle>
            <CardDescription>Securely store and manage API tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Google OAuth</span>
                <Badge variant="secondary" className="text-xs">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Slack API</span>
                <Badge variant="secondary" className="text-xs">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">GitHub</span>
                <Badge variant="outline" className="text-xs">Not Connected</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-flow-dark border-slate-700">
          <CardHeader>
            <CardTitle className="text-flow-text text-lg">Access Control</CardTitle>
            <CardDescription>Role-based permissions and audit logs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">2FA Required</span>
                <Badge variant="secondary" className="text-xs">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Audit Logging</span>
                <Badge variant="secondary" className="text-xs">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">IP Restrictions</span>
                <Badge variant="outline" className="text-xs">Optional</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {!isPremium && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
          <p className="text-slate-400 text-sm">Upgrade to Premium to access enterprise security features</p>
        </div>
      )}
    </div>
  )
}