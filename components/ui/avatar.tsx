import { cn } from '@/lib/utils'

type AvatarSize = 'sm' | 'lg'

export interface AvatarProps {
  name: string
  size?: AvatarSize
  className?: string
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-8  w-8  text-xs',
  lg: 'h-12 w-12 text-base',
}

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function Avatar({ name, size = 'sm', className }: AvatarProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-brand-100 font-medium text-brand-600',
        sizeClasses[size],
        className
      )}
    >
      {initials(name)}
    </div>
  )
}
