'use client'

import { useState, useCallback } from 'react'

let toastCounter = 0

export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((data) => {
    const id = `toast-${++toastCounter}`
    const duration = data.duration ?? 4000

    setToasts((prev) => [...prev, { ...data, id }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)

    return id
  }, [])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, toast, dismiss }
}
