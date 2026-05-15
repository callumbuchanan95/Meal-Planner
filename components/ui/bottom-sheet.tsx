'use client'

import { useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export function BottomSheet({ isOpen, onClose, children, className }: BottomSheetProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md rounded-t-xl bg-white',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-y-0' : 'translate-y-full',
          className
        )}
      >
        {/* Handle bar */}
        <div className="flex justify-center pb-1 pt-3">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>
        {children}
      </div>
    </>
  )
}
