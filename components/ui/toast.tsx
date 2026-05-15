'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'

export type ToastVariant = 'success' | 'error' | 'neutral'

export interface ToastProps {
  message: string
  variant?: ToastVariant
  onDismiss: () => void
}

const variantClasses: Record<ToastVariant, string> = {
  success: 'bg-brand-400 text-white',
  error:   'bg-red-500   text-white',
  neutral: 'bg-gray-800  text-white',
}

export function Toast({ message, variant = 'neutral', onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2500)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div
      className={cn(
        'fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-lg px-4 py-2.5',
        'text-sm font-medium shadow-lg',
        variantClasses[variant]
      )}
    >
      {message}
    </div>
  )
}
