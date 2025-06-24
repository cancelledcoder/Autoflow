"use client"

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useDroppable } from '@dnd-kit/core'
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Grid3X3, 
  Maximize,
  Move,
  ArrowRight,
  Settings,
  Copy,
  Trash2,
  Play,
  Plus
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

interface EnhancedWorkflowCanvasProps {
  nodes: WorkflowNode[]
  onNodeClick: (node: WorkflowNode) => void
  onNodeDelete: (nodeId: string) => void
  onNodeDuplicate: (node: WorkflowNode) => void
  onWorkflowChange: (nodes: WorkflowNode[]) => void
}

export function EnhancedWorkflowCanvas({
  nodes,
  onNodeClick,
  onNodeDelete,
  onNodeDuplicate,
  onWorkflowChange
}: EnhancedWorkflowCanvasProps) {
  const [zoom, setZoom] = useState(100)
  const [gridEnabled, setGridEnabled] = useState(true)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 })
  
  const canvasRef = useRef<HTMLDivElement>(null)
  const { setNodeRef, isOver } = useDroppable({
    id: 'enhanced-workflow-canvas',
  })

  console.log("Enhanced Canvas rendered with nodes:", nodes.length, "zoom:", zoom)

  const GRID_SIZE = 20
  const SNAP_THRESHOLD = 10

  const snapToGrid = (value: number) => {
    if (!gridEnabled) return value
    return Math.round(value / GRID_SIZE) * GRID_SIZE
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25))
  }

  const handleResetView = () => {
    setZoom(100)
    setPanOffset({ x: 0, y: 0 })
  }

  const handleFitToScreen = () => {
    if (nodes.length === 0) return
    
    const minX = Math.min(...nodes.map(n => n.x))
    const maxX = Math.max(...nodes.map(n => n.x))
    const minY = Math.min(...nodes.map(n => n.y))
    const maxY = Math.max(...nodes.map(n => n.y))
    
    const width = maxX - minX + 200
    const height = maxY - minY + 200
    
    if (canvasRef.current) {
      const canvasWidth = canvasRef.current.clientWidth
      const canvasHeight = canvasRef.current.clientHeight
      
      const scaleX = canvasWidth / width
      const scaleY = canvasHeight / height
      const scale = Math.min(scaleX, scaleY, 1) * 80
      
      setZoom(scale)
      setPanOffset({
        x: (canvasWidth / 2) - ((minX + maxX) / 2) * (scale / 100),
        y: (canvasHeight / 2) - ((minY + maxY) / 2) * (scale / 100)
      })
    }
  }

  const handleNodeMouseDown = (nodeId: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    
    const node = nodes.find(n => n.id === nodeId)
    if (!node) return

    setDraggedNode(nodeId)
    
    const rect = event.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    })
  }

  const handleCanvasMouseDown = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsPanning(true)
      setLastPanPoint({ x: event.clientX, y: event.clientY })
    }
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (draggedNode) {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const canvasX = event.clientX - rect.left - dragOffset.x - panOffset.x
      const canvasY = event.clientY - rect.top - dragOffset.y - panOffset.y

      const scaledX = canvasX / (zoom / 100)
      const scaledY = canvasY / (zoom / 100)

      const snappedX = snapToGrid(scaledX)
      const snappedY = snapToGrid(scaledY)

      const updatedNodes = nodes.map(node => 
        node.id === draggedNode 
          ? { ...node, x: snappedX, y: snappedY }
          : node
      )
      
      onWorkflowChange(updatedNodes)
    } else if (isPanning) {
      const deltaX = event.clientX - lastPanPoint.x
      const deltaY = event.clientY - lastPanPoint.y
      
      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }))
      
      setLastPanPoint({ x: event.clientX, y: event.clientY })
    }
  }

  const handleMouseUp = () => {
    setDraggedNode(null)
    setIsPanning(false)
    setDragOffset({ x: 0, y: 0 })
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [draggedNode, isPanning, lastPanPoint, dragOffset, nodes, zoom, panOffset, gridEnabled])

  const canvasStyle = {
    transform: `scale(${zoom / 100}) translate(${panOffset.x / (zoom / 100)}px, ${panOffset.y / (zoom / 100)}px)`,
    transformOrigin: '0 0'
  }

  const gridPattern = gridEnabled ? (
    <defs>
      <pattern
        id="grid"
        width={GRID_SIZE}
        height={GRID_SIZE}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`}
          fill="none"
          stroke="rgba(100, 116, 139, 0.2)"
          strokeWidth="1"
        />
      </pattern>
    </defs>
  ) : null

  return (
    <div className="relative h-full flex flex-col">
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-flow-surface/90 backdrop-blur-sm border border-slate-700 rounded-lg p-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleZoomOut}
          disabled={zoom <= 25}
          className="text-slate-400 hover:text-flow-text"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        
        <span className="text-sm text-slate-400 min-w-[3rem] text-center">
          {zoom}%
        </span>
        
        <Button
          size="sm"
          variant="ghost"
          onClick={handleZoomIn}
          disabled={zoom >= 200}
          className="text-slate-400 hover:text-flow-text"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-slate-600 mx-1" />
        
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setGridEnabled(!gridEnabled)}
          className={`${gridEnabled ? 'text-flow-primary' : 'text-slate-400'} hover:text-flow-text`}
        >
          <Grid3X3 className="w-4 h-4" />
        </Button>
        
        <Button
          size="sm"
          variant="ghost"
          onClick={handleFitToScreen}
          className="text-slate-400 hover:text-flow-text"
        >
          <Maximize className="w-4 h-4" />
        </Button>
        
        <Button
          size="sm"
          variant="ghost"
          onClick={handleResetView}
          className="text-slate-400 hover:text-flow-text"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Canvas */}
      <div
        ref={(el) => {
          setNodeRef(el)
          canvasRef.current = el
        }}
        className={`flex-1 relative overflow-hidden bg-gradient-to-br from-flow-dark via-slate-900 to-flow-dark border-2 border-dashed transition-colors cursor-move ${
          isOver ? 'border-flow-accent bg-flow-accent/5' : 'border-slate-700'
        }`}
        onMouseDown={handleCanvasMouseDown}
      >
        {/* Grid Background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {gridPattern}
          <rect width="100%" height="100%" fill={gridEnabled ? "url(#grid)" : "transparent"} />
        </svg>

        {/* Canvas Content */}
        <div className="absolute inset-0" style={canvasStyle}>
          {nodes.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-flow rounded-full flex items-center justify-center animate-pulse">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-flow-text mb-2">Start Building Your Workflow</h3>
                  <p className="text-slate-400 max-w-sm">
                    Drag and drop components from the sidebar to create your automation workflow
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {nodes.map((node, index) => {
                  const nextNode = nodes[index + 1]
                  if (!nextNode) return null
                  
                  const startX = node.x + 150
                  const startY = node.y + 40
                  const endX = nextNode.x
                  const endY = nextNode.y + 40
                  
                  const midX = (startX + endX) / 2
                  
                  return (
                    <path
                      key={`connection-${node.id}-${nextNode.id}`}
                      d={`M ${startX} ${startY} C ${midX} ${startY} ${midX} ${endY} ${endX} ${endY}`}
                      stroke="url(#connection-gradient)"
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse"
                    />
                  )
                })}
                
                <defs>
                  <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Workflow Nodes */}
              {nodes.map((node, index) => (
                <div
                  key={node.id}
                  className="absolute group"
                  style={{
                    left: node.x,
                    top: node.y,
                    width: 300,
                    height: 80
                  }}
                >
                  <Card 
                    className={`h-full p-4 border-2 transition-all hover:scale-105 cursor-grab active:cursor-grabbing ${
                      node.type === 'trigger' ? 'border-flow-secondary bg-flow-secondary/10 hover:bg-flow-secondary/20' :
                      node.type === 'action' ? 'border-flow-primary bg-flow-primary/10 hover:bg-flow-primary/20' :
                      'border-flow-accent bg-flow-accent/10 hover:bg-flow-accent/20'
                    } ${draggedNode === node.id ? 'scale-105 shadow-xl' : ''}`}
                    onMouseDown={(e) => handleNodeMouseDown(node.id, e)}
                  >
                    <div className="flex items-center gap-3 h-full">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${
                        node.type === 'trigger' ? 'bg-flow-secondary text-white' :
                        node.type === 'action' ? 'bg-flow-primary text-white' :
                        'bg-flow-accent text-white'
                      }`}>
                        {node.icon}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-flow-text truncate">{node.name}</h3>
                        <p className="text-sm text-slate-400 truncate">{node.service}</p>
                      </div>

                      {/* Node Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-6 h-6 p-0 text-slate-400 hover:text-flow-text"
                          onClick={(e) => {
                            e.stopPropagation()
                            onNodeClick(node)
                          }}
                        >
                          <Settings className="w-3 h-3" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-6 h-6 p-0 text-slate-400 hover:text-blue-400"
                          onClick={(e) => {
                            e.stopPropagation()
                            onNodeDuplicate(node)
                          }}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-6 h-6 p-0 text-slate-400 hover:text-red-400"
                          onClick={(e) => {
                            e.stopPropagation()
                            onNodeDelete(node.id)
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Connection Point */}
                  {index < nodes.length - 1 && (
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-8 h-8 bg-gradient-flow rounded-full flex items-center justify-center animate-pulse">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Canvas Info */}
      <div className="absolute bottom-4 left-4 bg-flow-surface/90 backdrop-blur-sm border border-slate-700 rounded-lg px-3 py-2">
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>{nodes.length} nodes</span>
          <span>Zoom: {zoom}%</span>
          {gridEnabled && <span>Grid: {GRID_SIZE}px</span>}
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Canvas Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}