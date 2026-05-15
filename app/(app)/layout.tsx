'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, BookOpen, ShoppingCart, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/planner', label: 'Planner', icon: CalendarDays },
  { href: '/library', label: 'Library', icon: BookOpen },
  { href: '/shop',    label: 'Shop',    icon: ShoppingCart },
] as const

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">

        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-100 bg-white px-4">
          <span className="text-lg font-semibold text-gray-900">Meal Planner</span>
          <Link
            href="/settings"
            aria-label="Settings"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Settings size={20} />
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-100 bg-white">
          <div className="mx-auto flex max-w-md">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors',
                    active ? 'text-brand-400' : 'text-gray-400 hover:text-gray-600'
                  )}
                >
                  <Icon size={22} strokeWidth={active ? 2.5 : 1.75} />
                  <span>{label}</span>
                </Link>
              )
            })}
          </div>
        </nav>

      </div>
    </div>
  )
}
