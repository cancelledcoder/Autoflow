"use client"

import React, { useState, useCallback, useMemo } from 'react'
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  NodeTypes,
  MarkerType,
} from 'react-flow-renderer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
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
  Trash2,
  Copy,
  Play
} from 'lucide-react'

interface WorkflowNodeCanvas {
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

interface CustomNodeProps {
  data: {
    label: string
    service: string
    type: 'trigger' | 'action' | 'condition'
    icon: React.ReactNode
    onSettings: () => void
    onDelete: () => void
    onDuplicate: () => void
  }
  selected: boolean
}

function CustomNode({ data, selected }: CustomNodeProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <TooltipProvider>
      <div
        className={`relative transition-all duration-200 ${selected ? 'scale-105' : ''}`}
        onContextMenu={(e) => {
          e.preventDefault()
          setShowMenu(!showMenu)
        }}
      >
        <Card className={`p-4 border-2 transition-all hover:shadow-lg cursor-pointer min-w-48 ${
          data.type === 'trigger' 
            ? 'border-flow-secondary bg-flow-secondary/10 hover:bg-flow-secondary/20 hover:border-flow-secondary/80' :
          data.type === 'action' 
            ? 'border-flow-primary bg-flow-primary/10 hover:bg-flow-primary/20 hover:border-flow-primary/80' :
            'border-flow-accent bg-flow-accent/10 hover:bg-flow-accent/20 hover:border-flow-accent/80'
        } ${selected ? 'ring-2 ring-flow-accent/50' : ''}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              data.type === 'trigger' ? 'bg-flow-secondary text-white' :
              data.type === 'action' ? 'bg-flow-primary text-white' :
              'bg-flow-accent text-white'
            }`}>
              {data.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-flow-text truncate">{data.label}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                  {data.service}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs border ${
                    data.type === 'trigger' ? 'border-flow-secondary/50 text-flow-secondary' :
                    data.type === 'action' ? 'border-flow-primary/50 text-flow-primary' :
                    'border-flow-accent/50 text-flow-accent'
                  }`}
                >
                  {data.type}
                </Badge>
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-slate-400 hover:text-flow-text p-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    data.onSettings()
                  }}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configure node settings</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Card>

        {/* Context Menu */}
        {showMenu && (
          <div className="absolute top-full left-0 mt-2 bg-flow-surface border border-slate-700 rounded-lg shadow-lg z-50 min-w-40">
            <div className="p-1">
              <Button
                size="sm"
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-flow-text hover:bg-slate-700"
                onClick={() => {
                  data.onSettings()
                  setShowMenu(false)
                }}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-flow-text hover:bg-slate-700"
                onClick={() => {
                  data.onDuplicate()
                  setShowMenu(false)
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-flow-text hover:bg-slate-700"
                onClick={() => {
                  console.log("Testing individual node")
                  setShowMenu(false)
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                Test Node
              </Button>
              <div className="border-t border-slate-700 my-1" />
              <Button
                size="sm"
                variant="ghost"
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                onClick={() => {
                  data.onDelete()
                  setShowMenu(false)
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}

const nodeTypes: NodeTypes = {
  custom: CustomNode,
}

interface EnhancedWorkflowCanvasProps {
  nodes: any[]
  onNodeClick: (node: any) => void
  onNodeDelete: (nodeId: string) => void
  onNodeDuplicate: (node: any) => void
  onWorkflowChange: (nodes: any[]) => void
}

export function EnhancedWorkflowCanvas({ 
  nodes, 
  onNodeClick, 
  onNodeDelete, 
  onNodeDuplicate,
  onWorkflowChange 
}: EnhancedWorkflowCanvasProps) {
  console.log("Enhanced canvas rendered with nodes:", nodes)

  // Convert our nodes to React Flow format
  const reactFlowNodes: Node[] = useMemo(() => 
    nodes.map((node, index) => ({
      id: node.id,
      type: 'custom',
      position: { x: 100 + (index * 300), y: 100 },
      data: {
        label: node.name,
        service: node.service,
        type: node.type,
        icon: node.icon,
        onSettings: () => onNodeClick(node),
        onDelete: () => onNodeDelete(node.id),
        onDuplicate: () => onNodeDuplicate(node),
      },
      draggable: true,
    })), [nodes, onNodeClick, onNodeDelete, onNodeDuplicate]
  )

  // Create edges between sequential nodes
  const reactFlowEdges: Edge[] = useMemo(() => 
    nodes.slice(0, -1).map((_, index) => ({
      id: `e${index}-${index + 1}`,
      source: nodes[index].id,
      target: nodes[index + 1].id,
      type: 'smoothstep',
      animated: true,
      style: {
        stroke: '#06b6d4',
        strokeWidth: 2,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#06b6d4',
      },
    })), [nodes]
  )

  const [reactNodes, setReactNodes, onReactNodesChange] = useNodesState(reactFlowNodes)
  const [reactEdges, setReactEdges, onEdgesChange] = useEdgesState(reactFlowEdges)

  // Update React Flow nodes when our nodes change
  React.useEffect(() => {
    setReactNodes(reactFlowNodes)
  }, [reactFlowNodes, setReactNodes])

  React.useEffect(() => {
    setReactEdges(reactFlowEdges) 
  }, [reactFlowEdges, setReactEdges])

  const onConnect = useCallback(
    (params: Connection) => setReactEdges((eds) => addEdge(params, eds)),
    [setReactEdges]
  )

  if (nodes.length === 0) {
    return (
      <div className="flex-1 relative bg-gradient-to-br from-flow-dark via-slate-900 to-flow-dark min-h-96 rounded-lg border-2 border-dashed border-slate-700">
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
      </div>
    )
  }

  return (
    <div className="flex-1 h-full rounded-lg overflow-hidden border border-slate-700 bg-flow-dark">
      <ReactFlow
        nodes={reactNodes}
        edges={reactEdges}
        onNodesChange={onReactNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[20, 20]}
        defaultPosition={[0, 0]}
        defaultZoom={0.8}
        minZoom={0.2}
        maxZoom={2}
        attributionPosition="bottom-left"
      >
        <Controls 
          className="bg-flow-surface border-slate-700"
          showInteractive={false}
        />
        <MiniMap
          className="bg-flow-surface border border-slate-700"
          nodeColor={(node) => {
            const type = node.data?.type
            return type === 'trigger' ? '#8b5cf6' :
                   type === 'action' ? '#6366f1' : '#06b6d4'
          }}
          maskColor="rgba(15, 23, 42, 0.8)"
        />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          color="#334155"
        />
      </ReactFlow>
    </div>
  )
}