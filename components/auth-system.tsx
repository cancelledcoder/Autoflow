"use client"

import React, { useState, createContext, useContext, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Github, 
  Chrome,
  Crown,
  Settings,
  LogOut,
  Workflow,
  BarChart3,
  CreditCard,
  Shield,
  Bell,
  Zap,
  CheckCircle,
  Calendar,
  Activity
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: 'free' | 'premium'
  workflowCount: number
  joinDate: string
  lastLogin: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithGithub: () => Promise<void>
  logout: () => void
  updatePlan: (plan: 'free' | 'premium') => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  console.log("Auth Provider initialized, user:", user?.email)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('autoflow_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing saved user data:', error)
        localStorage.removeItem('autoflow_user')
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    console.log('Login attempt:', email)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock user data
    const userData: User = {
      id: 'user_' + Date.now(),
      name: email.split('@')[0],
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      plan: 'free',
      workflowCount: 0,
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }
    
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('autoflow_user', JSON.stringify(userData))
  }

  const signup = async (name: string, email: string, password: string) => {
    console.log('Signup attempt:', name, email)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const userData: User = {
      id: 'user_' + Date.now(),
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      plan: 'free',
      workflowCount: 0,
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }
    
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('autoflow_user', JSON.stringify(userData))
  }

  const loginWithGoogle = async () => {
    console.log('Google OAuth login initiated')
    
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const userData: User = {
      id: 'google_user_' + Date.now(),
      name: 'Google User',
      email: 'user@gmail.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
      plan: 'free',
      workflowCount: 0,
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }
    
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('autoflow_user', JSON.stringify(userData))
  }

  const loginWithGithub = async () => {
    console.log('GitHub OAuth login initiated')
    
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const userData: User = {
      id: 'github_user_' + Date.now(),
      name: 'GitHub User',
      email: 'user@github.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=github',
      plan: 'free',
      workflowCount: 0,
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }
    
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('autoflow_user', JSON.stringify(userData))
  }

  const logout = () => {
    console.log('User logged out')
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('autoflow_user')
  }

  const updatePlan = (plan: 'free' | 'premium') => {
    if (user) {
      const updatedUser = { ...user, plan }
      setUser(updatedUser)
      localStorage.setItem('autoflow_user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      signup,
      loginWithGoogle,
      loginWithGithub,
      logout,
      updatePlan
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'login' | 'signup'
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [currentTab, setCurrentTab] = useState(defaultTab)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { login, signup, loginWithGoogle, loginWithGithub } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (currentTab === 'login') {
        await login(formData.email, formData.password)
      } else {
        await signup(formData.name, formData.email, formData.password)
      }
      onClose()
    } catch (error) {
      console.error('Auth error:', error)
      alert('Authentication failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true)
    try {
      if (provider === 'google') {
        await loginWithGoogle()
      } else {
        await loginWithGithub()
      }
      onClose()
    } catch (error) {
      console.error('OAuth error:', error)
      alert('OAuth login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-flow-surface border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-flow-text">Welcome to AutoFlow</DialogTitle>
          <DialogDescription>
            Sign in to access your workflows and premium features
          </DialogDescription>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as 'login' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2 bg-flow-dark">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-flow-primary data-[state=active]:text-white"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="signup"
              className="data-[state=active]:bg-flow-primary data-[state=active]:text-white"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-flow-text">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-flow-dark border-slate-600 text-flow-text"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-flow-text">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-flow-dark border-slate-600 text-flow-text pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-flow-text"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-flow hover:opacity-90 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-flow-text">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-flow-dark border-slate-600 text-flow-text"
                  required
                />
              </div>

              <div>
                <Label htmlFor="signup-email" className="text-flow-text">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-flow-dark border-slate-600 text-flow-text"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="signup-password" className="text-flow-text">Password</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-flow-dark border-slate-600 text-flow-text pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-flow-text"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-flow hover:opacity-90 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full bg-slate-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-flow-surface px-2 text-slate-400">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleOAuthLogin('google')}
            disabled={isLoading}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Chrome className="w-4 h-4 mr-2" />
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOAuthLogin('github')}
            disabled={isLoading}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function UserDashboard() {
  const { user, logout, updatePlan } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  if (!user) return null

  const mockWorkflows = [
    { id: 1, name: 'Gmail to Slack', status: 'active', executions: 142 },
    { id: 2, name: 'Twitter Auto-reply', status: 'paused', executions: 89 },
    { id: 3, name: 'Google Sheets Sync', status: 'active', executions: 234 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-flow-dark via-slate-900 to-flow-dark">
      {/* Header */}
      <header className="border-b border-slate-800 bg-flow-surface/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-flow rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-flow-text">AutoFlow Dashboard</h1>
                <p className="text-sm text-slate-400">Manage your workflows and account</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className={`${user.plan === 'premium' ? 'bg-gradient-flow' : 'bg-slate-700'} text-white`}>
                {user.plan === 'premium' ? (
                  <>
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </>
                ) : (
                  'Free Plan'
                )}
              </Badge>
              
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-flow-primary text-white">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <Button
                variant="outline"
                onClick={logout}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            {[
              { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'workflows', name: 'Workflows', icon: <Workflow className="w-4 h-4" /> },
              { id: 'billing', name: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
              { id: 'settings', name: 'Settings', icon: <Settings className="w-4 h-4" /> }
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className={`w-full justify-start ${
                  activeTab === item.id 
                    ? 'bg-flow-primary text-white' 
                    : 'text-slate-300 hover:text-flow-text hover:bg-slate-800'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Button>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-flow-surface border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-flow-primary/20 rounded-lg">
                          <Workflow className="w-5 h-5 text-flow-primary" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-flow-text">{user.workflowCount}</p>
                          <p className="text-sm text-slate-400">Active Workflows</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-flow-surface border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <Activity className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-flow-text">465</p>
                          <p className="text-sm text-slate-400">Total Executions</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-flow-surface border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-flow-accent/20 rounded-lg">
                          <Calendar className="w-5 h-5 text-flow-accent" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-flow-text">
                            {Math.ceil((Date.now() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
                          </p>
                          <p className="text-sm text-slate-400">Days Active</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Upgrade Banner for Free Users */}
                {user.plan === 'free' && (
                  <Card className="bg-gradient-to-r from-flow-primary/20 to-flow-secondary/20 border-flow-primary">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-flow-text mb-2">
                            Upgrade to Premium
                          </h3>
                          <p className="text-slate-400 mb-4">
                            Unlock unlimited workflows, all integrations, and premium features
                          </p>
                          <Button 
                            onClick={() => updatePlan('premium')}
                            className="bg-gradient-flow hover:opacity-90 text-white"
                          >
                            <Crown className="w-4 h-4 mr-2" />
                            Upgrade Now - ₹1,699/month
                          </Button>
                        </div>
                        <Crown className="w-16 h-16 text-flow-primary/30" />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {activeTab === 'workflows' && (
              <Card className="bg-flow-surface border-slate-700">
                <CardHeader>
                  <CardTitle className="text-flow-text">Your Workflows</CardTitle>
                  <CardDescription>Manage and monitor your automation workflows</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockWorkflows.map((workflow) => (
                      <div key={workflow.id} className="flex items-center justify-between p-4 bg-flow-dark rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-flow-primary/20 rounded-lg">
                            <Workflow className="w-4 h-4 text-flow-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-flow-text">{workflow.name}</h4>
                            <p className="text-sm text-slate-400">{workflow.executions} executions</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                            {workflow.status}
                          </Badge>
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                            <Settings className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'billing' && (
              <Card className="bg-flow-surface border-slate-700">
                <CardHeader>
                  <CardTitle className="text-flow-text">Billing & Subscription</CardTitle>
                  <CardDescription>Manage your payment methods and subscription</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-flow-dark rounded-lg border border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-flow-text">Current Plan</h4>
                        <p className="text-slate-400">
                          {user.plan === 'premium' ? 'Premium Monthly' : 'Free Plan'}
                        </p>
                      </div>
                      <Badge className={user.plan === 'premium' ? 'bg-gradient-flow' : 'bg-slate-700'}>
                        {user.plan === 'premium' ? '₹1,699/month' : '₹0'}
                      </Badge>
                    </div>
                    
                    {user.plan === 'free' ? (
                      <Button 
                        onClick={() => updatePlan('premium')}
                        className="w-full bg-gradient-flow hover:opacity-90 text-white"
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Premium
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">Premium features active</span>
                        </div>
                        <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                          Manage Subscription
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'settings' && (
              <Card className="bg-flow-surface border-slate-700">
                <CardHeader>
                  <CardTitle className="text-flow-text">Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-flow-text">Full Name</Label>
                      <Input 
                        value={user.name} 
                        className="bg-flow-dark border-slate-600 text-flow-text mt-2"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label className="text-flow-text">Email Address</Label>
                      <Input 
                        value={user.email} 
                        className="bg-flow-dark border-slate-600 text-flow-text mt-2"
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-flow-dark rounded-lg border border-slate-700">
                    <div>
                      <h4 className="font-medium text-flow-text">Email Notifications</h4>
                      <p className="text-sm text-slate-400">Receive workflow execution updates</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                      <Bell className="w-3 h-3 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}