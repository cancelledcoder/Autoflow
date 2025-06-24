"use client"

import { useEffect, useRef } from 'react'

interface AutoSaveOptions {
  delay?: number
  key?: string
}

export function useAutoSave<T>(
  data: T,
  onSave: (data: T) => void,
  options: AutoSaveOptions = {}
) {
  const { delay = 2000, key = 'autoflow-workflow' } = options
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastSavedRef = useRef<string>('')

  useEffect(() => {
    const dataString = JSON.stringify(data)
    
    // Don't save if data hasn't changed
    if (dataString === lastSavedRef.current) {
      return
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(() => {
      console.log("Auto-saving workflow data")
      
      // Save to localStorage as backup
      try {
        localStorage.setItem(key, dataString)
        console.log("Workflow saved to localStorage")
      } catch (error) {
        console.warn("Failed to save to localStorage:", error)
      }

      // Call the provided save function
      onSave(data as T)
      lastSavedRef.current = dataString
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [data, onSave, delay, key])

  // Load from localStorage on mount
  const loadSavedData = () => {
    try {
      const saved = localStorage.getItem(key)
      if (saved) {
        console.log("Recovered workflow from localStorage")
        return JSON.parse(saved)
      }
    } catch (error) {
      console.warn("Failed to load from localStorage:", error)
    }
    return null
  }

  return {
    clearAutoSave: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      localStorage.removeItem(key)
    },
    loadSavedData
  }
}