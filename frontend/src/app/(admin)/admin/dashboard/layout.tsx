'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Package, Tag, MessageSquare, ShoppingBag,
  Settings, LogOut, Leaf, ExternalLink, Menu, X,
  Bell, ChevronRight,
} from 'lucide-react'
import { getMe, logout, getToken, getNotifications } from '@/lib/admin-api'

const NAV = [
  { href: '/admin/dashboard',            icon: LayoutDashboard, label: 'Overview'   },
  { href: '/admin/dashboard/orders',     icon: ShoppingBag,     label: 'Orders'     },
  { href: '/admin/dashboard/products',   icon: Package,         label: 'Products'   },
  { href: '/admin/dashboard/categories', icon: Tag,             label: 'Categories' },
  { href: '/admin/dashboard/messages',   icon: MessageSquare,   label: 'Messages'   },
  { href: '/admin/dashboard/settings',   icon: Settings,        label: 'Settings'   },
]

const BREADCRUMB_MAP: Record<string, string> = {
  '/admin/dashboard':            'Overview',
  '/admin/dashboard/orders':     'Orders',
  '/admin/dashboard/orders/new': 'New Order',
  '/admin/dashboard/products':   'Products',
  '/admin/dashboard/categories': 'Categories',
  '/admin/dashboard/messages':   'Messages',
  '/admin/dashboard/settings':   'Settings',
}

function Breadcrumbs({ pathname }: { pathname: string }) {
  const parts  = pathname.split('/').filter(Boolean)
  const crumbs: { label: string; href: string }[] = []

  let path = ''
  for (const part of parts) {
    path += '/' + part
    const label = BREADCRUMB_MAP[path]
    if (label) crumbs.push({ label, href: path })
    else if (part !== 'admin' && part !== 'dashboard') {
      crumbs.push({ label: part.replace(/-/g, ' '), href: path })
    }
  }

  if (crumbs.length <= 1) return null

  return (
    <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-6" aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <span key={c.href} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={12} className="text-bark/30" />}
          {i === crumbs.length - 1
            ? <span className="text-bark font-medium capitalize">{c.label}</span>
            : <Link href={c.href} className="hover:text-sage transition-colors capitalize">{c.label}</Link>
          }
        </span>
      ))}
    </nav>
  )
}

function NotificationBell() {
  const [open, setOpen]               = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [count, setCount]             = useState(0)

  const load = useCallback(async () => {
    try {
      const res = await getNotifications()
      setNotifications(res.data ?? [])
      setCount(res.count ?? 0)
    } catch {}
  }, [])

  useEffect(() => {
    load()
    const timer = setInterval(load, 30000) // refresh every 30s
    return () => clearInterval(timer)
  }, [load])

  const COLOR_MAP: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    gold: 'bg-yellow-100 text-yellow-700',
    red:  'bg-red-100 text-red-600',
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="relative p-2 rounded-lg text-text-muted hover:text-bark
                   hover:bg-gray-100 transition-colors"
        aria-label="Notifications">
        <Bell size={18} />
        {count > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white
                           text-[0.6rem] font-bold rounded-full flex items-center justify-center">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[320px] bg-white rounded-2xl
                        border border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-bark">Notifications</span>
            {count > 0 && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                {count} new
              </span>
            )}
          </div>
          <div className="max-h-[320px] overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-sm text-text-muted text-center py-8">All caught up! 🎉</p>
            ) : (
              notifications.map((n, i) => (
                <Link key={i} href={n.href} onClick={() => setOpen(false)}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-cream/50
                             transition-colors border-b border-gray-50 last:border-0">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 mt-0.5
                    ${COLOR_MAP[n.color] ?? 'bg-gray-100 text-gray-600'}`}>
                    {n.type}
                  </span>
                  <span className="text-sm text-text-main">{n.text}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [admin, setAdmin]       = useState<{ name: string; email: string } | null>(null)
  const [sideOpen, setSideOpen] = useState(false)
  const [ready, setReady]       = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = getToken()
      if (!token) { router.replace('/admin/login'); return }
      getMe()
        .then(res => {
          if (!res.is_admin) { router.replace('/'); return }
          setAdmin({ name: res.name, email: res.email })
          setReady(true)
        })
        .catch(() => router.replace('/admin/login'))
    }, 50)
    return () => clearTimeout(timer)
  }, [router])

  async function handleLogout() {
    await logout()
    router.replace('/admin/login')
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-sage border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-text-muted">Loading dashboard…</p>
        </div>
      </div>
    )
  }

  const SidebarContent = () => (
    <aside className="flex flex-col h-full bg-bark text-cream w-[240px] shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-cream/10 flex items-center gap-2.5">
        <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center">
          <Leaf size={15} className="text-white" />
        </div>
        <div>
          <span className="font-display text-lg font-semibold text-cream leading-none block">
            Feiwellhub
          </span>
          <span className="text-[0.6rem] tracking-widest uppercase text-cream/40">Admin Panel</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5" aria-label="Admin navigation">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = pathname === href ||
            (href !== '/admin/dashboard' && pathname.startsWith(href))
          return (
            <Link key={href} href={href} onClick={() => setSideOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                transition-all duration-150
                ${active
                  ? 'bg-cream/10 text-cream font-medium shadow-sm'
                  : 'text-cream/60 hover:bg-cream/5 hover:text-cream'}`}>
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Visit Store */}
      <div className="px-3 pb-2">
        <Link href="/" target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                     text-cream/50 hover:text-cream hover:bg-cream/5 transition-all duration-150">
          <ExternalLink size={16} />
          Visit Store
        </Link>
      </div>

      {/* User */}
      <div className="px-4 py-4 border-t border-cream/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center
                          text-sm font-semibold text-white shrink-0">
            {admin?.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-cream truncate">{admin?.name}</p>
            <p className="text-xs text-cream/40 truncate">{admin?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-2 text-xs text-cream/50 hover:text-cream
                     transition-colors w-full">
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen bg-[#F7F5F1] overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      {sideOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="flex"><SidebarContent /></div>
          <div className="flex-1 bg-bark/40" onClick={() => setSideOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-4 md:px-8 h-14
                           flex items-center justify-between shrink-0">
          <button className="md:hidden p-2 text-bark" onClick={() => setSideOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="hidden md:block" /> {/* spacer */}
          <div className="flex items-center gap-2">
            <NotificationBell />
            <Link href="/admin/dashboard/settings"
              className="p-2 rounded-lg text-text-muted hover:text-bark
                         hover:bg-gray-100 transition-colors">
              <Settings size={18} />
            </Link>
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center
                            text-white text-xs font-semibold cursor-default">
              {admin?.name?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Breadcrumbs pathname={pathname} />
          {children}
        </main>
      </div>
    </div>
  )
}
