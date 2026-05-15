import { cn } from '@/lib/utils'

export interface BadgeProps {
  label: string
  colour?: string
  className?: string
}

export function Badge({ label, colour, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        !colour && 'bg-brand-100 text-brand-600',
        className
      )}
      style={colour ? { backgroundColor: `${colour}20`, color: colour } : undefined}
    >
      {label}
    </span>
  )
}
