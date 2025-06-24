import React from 'react'
import { 
  Mail, 
  MessageSquare, 
  Database, 
  Calendar, 
  FileText, 
  Globe, 
  Clock, 
  Filter, 
  Zap,
  Twitter,
  Send,
  Bot,
  Webhook,
  Sheet,
  Image,
  Video,
  Music,
  ShoppingCart,
  CreditCard,
  Cloud,
  Server,
  Smartphone,
  Monitor,
  Users,
  Lock,
  Key,
  Settings,
  BarChart,
  PieChart,
  TrendingUp,
  Package,
  Truck,
  MapPin,
  Phone,
  Mic,
  Camera,
  Upload,
  Download,
  RefreshCw,
  Bell,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Star,
  Heart,
  Bookmark,
  Tag,
  Hash,
  AtSign,
  Link,
  Search,
  Copy,
  Archive,
  Trash2,
  Edit,
  Plus,
  Minus,
  X
} from 'lucide-react'

export interface ServiceTemplate {
  id: string
  service: string
  name: string
  description: string
  icon: React.ReactNode
  type: 'trigger' | 'action' | 'condition'
  category: string
  premium?: boolean
  popular?: boolean
}

export const serviceTemplates: ServiceTemplate[] = [
  // Email Integrations
  {
    id: 'gmail-new-email',
    service: 'Gmail',
    name: 'New Email Received',
    description: 'Trigger when a new email arrives in Gmail',
    icon: <Mail className="w-4 h-4" />,
    type: 'trigger',
    category: 'Email',
    popular: true
  },
  {
    id: 'gmail-send-email',
    service: 'Gmail',
    name: 'Send Email',
    description: 'Send an email through Gmail',
    icon: <Send className="w-4 h-4" />,
    type: 'action',
    category: 'Email',
    popular: true
  },
  {
    id: 'gmail-reply-email',
    service: 'Gmail',
    name: 'Reply to Email',
    description: 'Reply to a specific email in Gmail',
    icon: <Mail className="w-4 h-4" />,
    type: 'action',
    category: 'Email'
  },
  {
    id: 'gmail-mark-read',
    service: 'Gmail',
    name: 'Mark as Read',
    description: 'Mark an email as read in Gmail',
    icon: <CheckCircle className="w-4 h-4" />,
    type: 'action',
    category: 'Email'
  },

  // Communication - Slack
  {
    id: 'slack-new-message',
    service: 'Slack',
    name: 'New Message',
    description: 'Trigger when new message is posted in Slack',
    icon: <MessageSquare className="w-4 h-4" />,
    type: 'trigger',
    category: 'Communication',
    popular: true
  },
  {
    id: 'slack-send-message',
    service: 'Slack',
    name: 'Send Message',
    description: 'Post a message to Slack channel',
    icon: <Send className="w-4 h-4" />,
    type: 'action',
    category: 'Communication',
    popular: true
  },
  {
    id: 'slack-send-dm',
    service: 'Slack',
    name: 'Send Direct Message',
    description: 'Send a direct message to a Slack user',
    icon: <MessageSquare className="w-4 h-4" />,
    type: 'action',
    category: 'Communication'
  },
  {
    id: 'slack-add-reaction',
    service: 'Slack',
    name: 'Add Reaction',
    description: 'Add emoji reaction to a Slack message',
    icon: <Heart className="w-4 h-4" />,
    type: 'action',
    category: 'Communication'
  },

  // Communication - Telegram
  {
    id: 'telegram-new-message',
    service: 'Telegram',
    name: 'New Message',
    description: 'Trigger when new message received in Telegram',
    icon: <Bot className="w-4 h-4" />,
    type: 'trigger',
    category: 'Communication'
  },
  {
    id: 'telegram-send-message',
    service: 'Telegram',
    name: 'Send Message',
    description: 'Send a message via Telegram bot',
    icon: <Send className="w-4 h-4" />,
    type: 'action',
    category: 'Communication'
  },
  {
    id: 'telegram-send-photo',
    service: 'Telegram',
    name: 'Send Photo',
    description: 'Send a photo via Telegram bot',
    icon: <Image className="w-4 h-4" />,
    type: 'action',
    category: 'Communication'
  },

  // Social Media - Twitter/X
  {
    id: 'twitter-new-tweet',
    service: 'Twitter/X',
    name: 'New Tweet',
    description: 'Trigger when you post a new tweet',
    icon: <Twitter className="w-4 h-4" />,
    type: 'trigger',
    category: 'Social Media'
  },
  {
    id: 'twitter-new-mention',
    service: 'Twitter/X',
    name: 'New Mention',
    description: 'Trigger when someone mentions you',
    icon: <AtSign className="w-4 h-4" />,
    type: 'trigger',
    category: 'Social Media'
  },
  {
    id: 'twitter-post-tweet',
    service: 'Twitter/X',
    name: 'Post Tweet',
    description: 'Post a new tweet to Twitter/X',
    icon: <Send className="w-4 h-4" />,
    type: 'action',
    category: 'Social Media',
    popular: true
  },
  {
    id: 'twitter-retweet',
    service: 'Twitter/X',
    name: 'Retweet',
    description: 'Retweet a specific tweet',
    icon: <RefreshCw className="w-4 h-4" />,
    type: 'action',
    category: 'Social Media'
  },
  {
    id: 'twitter-like-tweet',
    service: 'Twitter/X',
    name: 'Like Tweet',
    description: 'Like a specific tweet',
    icon: <Heart className="w-4 h-4" />,
    type: 'action',
    category: 'Social Media'
  },

  // Productivity - Google Sheets
  {
    id: 'sheets-new-row',
    service: 'Google Sheets',
    name: 'New Row Added',
    description: 'Trigger when a new row is added to spreadsheet',
    icon: <Plus className="w-4 h-4" />,
    type: 'trigger',
    category: 'Productivity',
    popular: true
  },
  {
    id: 'sheets-add-row',
    service: 'Google Sheets',
    name: 'Add Row',
    description: 'Add a new row to Google Sheets',
    icon: <Database className="w-4 h-4" />,
    type: 'action',
    category: 'Productivity',
    popular: true
  },
  {
    id: 'sheets-update-row',
    service: 'Google Sheets',
    name: 'Update Row',
    description: 'Update an existing row in Google Sheets',
    icon: <Edit className="w-4 h-4" />,
    type: 'action',
    category: 'Productivity'
  },
  {
    id: 'sheets-get-row',
    service: 'Google Sheets',
    name: 'Get Row Data',
    description: 'Retrieve data from a specific row',
    icon: <Search className="w-4 h-4" />,
    type: 'action',
    category: 'Productivity'
  },

  // Productivity - Notion
  {
    id: 'notion-new-page',
    service: 'Notion',
    name: 'New Page Created',
    description: 'Trigger when a new page is created in Notion',
    icon: <FileText className="w-4 h-4" />,
    type: 'trigger',
    category: 'Productivity'
  },
  {
    id: 'notion-create-page',
    service: 'Notion',
    name: 'Create Page',
    description: 'Create a new page in Notion',
    icon: <Plus className="w-4 h-4" />,
    type: 'action',
    category: 'Productivity',
    popular: true
  },
  {
    id: 'notion-update-page',
    service: 'Notion',
    name: 'Update Page',
    description: 'Update content of a Notion page',
    icon: <Edit className="w-4 h-4" />,
    type: 'action',
    category: 'Productivity'
  },
  {
    id: 'notion-add-database-item',
    service: 'Notion',
    name: 'Add Database Item',
    description: 'Add a new item to Notion database',
    icon: <Database className="w-4 h-4" />,
    type: 'action',
    category: 'Productivity'
  },

  // Productivity - Google Calendar
  {
    id: 'calendar-new-event',
    service: 'Google Calendar',
    name: 'New Event',
    description: 'Trigger when new event is created',
    icon: <Calendar className="w-4 h-4" />,
    type: 'trigger',
    category: 'Productivity'
  },
  {
    id: 'calendar-event-starts',
    service: 'Google Calendar',
    name: 'Event Starting Soon',
    description: 'Trigger before an event starts',
    icon: <Clock className="w-4 h-4" />,
    type: 'trigger',
    category: 'Productivity'
  },
  {
    id: 'calendar-create-event',
    service: 'Google Calendar',
    name: 'Create Event',
    description: 'Create a new calendar event',
    icon: <Plus className="w-4 h-4" />,
    type: 'action',
    category: 'Productivity'
  },
  {
    id: 'calendar-update-event',
    service: 'Google Calendar',
    name: 'Update Event',
    description: 'Update an existing calendar event',
    icon: <Edit className="w-4 h-4" />,
    type: 'action',
    category: 'Productivity'
  },

  // Forms & Data Collection
  {
    id: 'form-submission',
    service: 'Web Forms',
    name: 'Form Submitted',
    description: 'Trigger when a form is submitted on your website',
    icon: <FileText className="w-4 h-4" />,
    type: 'trigger',
    category: 'Forms',
    popular: true
  },
  {
    id: 'typeform-submission',
    service: 'Typeform',
    name: 'New Response',
    description: 'Trigger when someone submits a Typeform',
    icon: <FileText className="w-4 h-4" />,
    type: 'trigger',
    category: 'Forms'
  },
  {
    id: 'google-forms-submission',
    service: 'Google Forms',
    name: 'New Response',
    description: 'Trigger when Google Form receives a response',
    icon: <FileText className="w-4 h-4" />,
    type: 'trigger',
    category: 'Forms'
  },

  // API & Webhooks
  {
    id: 'webhook-trigger',
    service: 'Webhook',
    name: 'HTTP Request',
    description: 'Trigger via HTTP webhook',
    icon: <Globe className="w-4 h-4" />,
    type: 'trigger',
    category: 'API',
    premium: true
  },
  {
    id: 'http-request',
    service: 'HTTP',
    name: 'Make HTTP Request',
    description: 'Send HTTP request to any API',
    icon: <Send className="w-4 h-4" />,
    type: 'action',
    category: 'API',
    premium: true
  },
  {
    id: 'api-call',
    service: 'REST API',
    name: 'API Call',
    description: 'Make a REST API call',
    icon: <Globe className="w-4 h-4" />,
    type: 'action',
    category: 'API',
    premium: true
  },

  // File Storage
  {
    id: 'gdrive-new-file',
    service: 'Google Drive',
    name: 'New File',
    description: 'Trigger when new file is added to Google Drive',
    icon: <Upload className="w-4 h-4" />,
    type: 'trigger',
    category: 'File Storage'
  },
  {
    id: 'gdrive-create-file',
    service: 'Google Drive',
    name: 'Create File',
    description: 'Create a new file in Google Drive',
    icon: <Plus className="w-4 h-4" />,
    type: 'action',
    category: 'File Storage'
  },
  {
    id: 'dropbox-new-file',
    service: 'Dropbox',
    name: 'New File',
    description: 'Trigger when new file is added to Dropbox',
    icon: <Upload className="w-4 h-4" />,
    type: 'trigger',
    category: 'File Storage'
  },
  {
    id: 'dropbox-upload-file',
    service: 'Dropbox',
    name: 'Upload File',
    description: 'Upload a file to Dropbox',
    icon: <Cloud className="w-4 h-4" />,
    type: 'action',
    category: 'File Storage'
  },

  // E-commerce
  {
    id: 'shopify-new-order',
    service: 'Shopify',
    name: 'New Order',
    description: 'Trigger when new order is placed',
    icon: <ShoppingCart className="w-4 h-4" />,
    type: 'trigger',
    category: 'E-commerce',
    premium: true
  },
  {
    id: 'stripe-payment-success',
    service: 'Stripe',
    name: 'Payment Successful',
    description: 'Trigger when payment is completed',
    icon: <CreditCard className="w-4 h-4" />,
    type: 'trigger',
    category: 'E-commerce',
    premium: true
  },
  {
    id: 'woocommerce-new-order',
    service: 'WooCommerce',
    name: 'New Order',
    description: 'Trigger when new WooCommerce order is placed',
    icon: <Package className="w-4 h-4" />,
    type: 'trigger',
    category: 'E-commerce',
    premium: true
  },

  // Logic & Utilities
  {
    id: 'delay',
    service: 'Delay',
    name: 'Wait/Delay',
    description: 'Wait for specified time before continuing',
    icon: <Clock className="w-4 h-4" />,
    type: 'condition',
    category: 'Logic'
  },
  {
    id: 'filter-data',
    service: 'Filter',
    name: 'Filter Data',
    description: 'Filter data based on conditions',
    icon: <Filter className="w-4 h-4" />,
    type: 'condition',
    category: 'Logic'
  },
  {
    id: 'condition-check',
    service: 'Condition',
    name: 'If/Then',
    description: 'Execute actions based on conditions',
    icon: <Filter className="w-4 h-4" />,
    type: 'condition',
    category: 'Logic'
  },
  {
    id: 'format-data',
    service: 'Formatter',
    name: 'Format Data',
    description: 'Transform and format data',
    icon: <Edit className="w-4 h-4" />,
    type: 'action',
    category: 'Logic'
  },
  {
    id: 'split-text',
    service: 'Text',
    name: 'Split Text',
    description: 'Split text into multiple parts',
    icon: <Minus className="w-4 h-4" />,
    type: 'action',
    category: 'Logic'
  },

  // Notifications
  {
    id: 'send-notification',
    service: 'Push Notification',
    name: 'Send Notification',
    description: 'Send push notification to devices',
    icon: <Bell className="w-4 h-4" />,
    type: 'action',
    category: 'Notifications',
    premium: true
  },
  {
    id: 'sms-send',
    service: 'SMS',
    name: 'Send SMS',
    description: 'Send SMS message',
    icon: <Phone className="w-4 h-4" />,
    type: 'action',
    category: 'Notifications',
    premium: true
  },

  // Social Media - Extended
  {
    id: 'instagram-new-post',
    service: 'Instagram',
    name: 'New Post',
    description: 'Trigger when you post on Instagram',
    icon: <Camera className="w-4 h-4" />,
    type: 'trigger',
    category: 'Social Media',
    premium: true
  },
  {
    id: 'linkedin-post',
    service: 'LinkedIn',
    name: 'Create Post',
    description: 'Post content to LinkedIn',
    icon: <Users className="w-4 h-4" />,
    type: 'action',
    category: 'Social Media',
    premium: true
  },
  {
    id: 'youtube-new-video',
    service: 'YouTube',
    name: 'New Video',
    description: 'Trigger when new video is uploaded',
    icon: <Video className="w-4 h-4" />,
    type: 'trigger',
    category: 'Social Media',
    premium: true
  },

  // Analytics & Tracking
  {
    id: 'google-analytics-event',
    service: 'Google Analytics',
    name: 'Track Event',
    description: 'Send event to Google Analytics',
    icon: <BarChart className="w-4 h-4" />,
    type: 'action',
    category: 'Analytics',
    premium: true
  },
  {
    id: 'mixpanel-track',
    service: 'Mixpanel',
    name: 'Track Event',
    description: 'Send event to Mixpanel',
    icon: <TrendingUp className="w-4 h-4" />,
    type: 'action',
    category: 'Analytics',
    premium: true
  }
]

export const getTemplatesByCategory = (category: string) => {
  if (category === 'All') return serviceTemplates
  return serviceTemplates.filter(template => template.category === category)
}

export const getPopularTemplates = () => {
  return serviceTemplates.filter(template => template.popular)
}

export const getPremiumTemplates = () => {
  return serviceTemplates.filter(template => template.premium)
}

export const getCategories = () => {
  const categories = ['All', ...Array.from(new Set(serviceTemplates.map(t => t.category)))]
  return categories
}

export const searchTemplates = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return serviceTemplates.filter(template => 
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.service.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.category.toLowerCase().includes(lowercaseQuery)
  )
}