"use client"

import { useState, useCallback } from 'react'

interface WorkflowState {
  nodes: any[]
  timestamp: number
  action: string
}

export function useWorkflowHistory(initialNodes: any[] = []) {
  const [history, setHistory] = useState<WorkflowState[]>([
    { nodes: initialNodes, timestamp: Date.now(), action: 'Initial state' }
  ])
  const [currentIndex, setCurrentIndex] = useState(0)

  const saveState = useCallback((nodes: any[], action: string) => {
    console.log("Saving workflow state:", action, nodes)
    
    const newState: WorkflowState = {
      nodes: JSON.parse(JSON.stringify(nodes)), // Deep copy
      timestamp: Date.now(),
      action
    }

    setHistory(prev => {
      // Remove any future states if we're not at the end
      const newHistory = prev.slice(0, currentIndex + 1)
      newHistory.push(newState)
      
      // Keep only last 50 states to prevent memory issues
      if (newHistory.length > 50) {
        return newHistory.slice(-50)
      }
      
      return newHistory
    })
    
    setCurrentIndex(prev => prev + 1)
  }, [currentIndex])

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      console.log("Undoing to previous state")
      setCurrentIndex(prev => prev - 1)
      return history[currentIndex - 1].nodes
    }
    return null
  }, [currentIndex, history])

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      console.log("Redoing to next state")
      setCurrentIndex(prev => prev + 1)
      return history[currentIndex + 1].nodes
    }
    return null
  }, [currentIndex, history])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  const getCurrentState = useCallback(() => {
    return history[currentIndex]
  }, [history, currentIndex])

  return {
    saveState,
    undo,
    redo,
    canUndo,
    canRedo,
    getCurrentState,
    historyLength: history.length,
    currentIndex
  }
}