'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Settings } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/planner', label: 'Planner' },
  { href: '/library', label: 'Library' },
  { href: '/shop',    label: 'Shop'    },
] as const

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLibrary = pathname === '/library' || pathname.startsWith('/library/')

  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">

        {/* Top header — hidden on library pages */}
        {!isLibrary && (
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
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto" style={{ paddingBottom: '100px' }}>
          {children}
        </main>

        {/* Bottom nav — text only, no icons */}
        <nav
          className="fixed bottom-0 left-0 right-0 z-30 border-t"
          style={{
            height: '100px',
            backgroundColor: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(50px)',
            WebkitBackdropFilter: 'blur(50px)',
            borderColor: 'rgba(0,0,0,0.08)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div className="mx-auto flex max-w-md">
            {NAV_ITEMS.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex flex-1 justify-center transition-colors"
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: '16px',
                    fontWeight: active ? 600 : 400,
                    color: active ? '#000000' : 'rgba(0,0,0,0.5)',
                    textDecoration: 'none',
                    paddingTop: '20px',
                    alignItems: 'flex-start',
                  }}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </nav>

      </div>
    </div>
  )
}
