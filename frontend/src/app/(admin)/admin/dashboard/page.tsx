'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Package, Tag, MessageSquare, ShoppingBag,
  ArrowRight, TrendingUp, AlertTriangle, Clock,
} from 'lucide-react'
import { getStats, adminGetOrders, formatPrice, getStatusStyle, ORDER_STATUSES } from '@/lib/admin-api'

export default function DashboardPage() {
  const [stats, setStats]     = useState<any>(null)
  const [orders, setOrders]   = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getStats(), adminGetOrders({ status: 'pending' })])
      .then(([s, o]) => {
        setStats(s.data)
        setOrders((o.data ?? []).slice(0, 6))
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-sage border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const STAT_CARDS = [
    {
      label: 'Total Revenue',
      value: formatPrice(stats?.revenue_total ?? 0),
      sub:   `${formatPrice(stats?.revenue_month ?? 0)} this month`,
      icon:  TrendingUp,
      color: 'bg-green-50 text-green-600',
      href:  '/admin/dashboard/orders',
    },
    {
      label: 'Pending Orders',
      value: stats?.pending_orders ?? 0,
      sub:   `${stats?.total_orders ?? 0} total orders`,
      icon:  ShoppingBag,
      color: 'bg-yellow-50 text-yellow-600',
      href:  '/admin/dashboard/orders?status=pending',
    },
    {
      label: 'Products',
      value: stats?.total_products ?? 0,
      sub:   `${stats?.active_products ?? 0} active`,
      icon:  Package,
      color: 'bg-sage-pale text-sage',
      href:  '/admin/dashboard/products',
    },
    {
      label: 'Messages',
      value: stats?.unread_messages ?? 0,
      sub:   `${stats?.total_messages ?? 0} total`,
      icon:  MessageSquare,
      color: 'bg-blue-50 text-blue-500',
      href:  '/admin/dashboard/messages',
    },
    {
      label: 'Categories',
      value: stats?.total_categories ?? 0,
      sub:   'product categories',
      icon:  Tag,
      color: 'bg-gold-pale text-gold',
      href:  '/admin/dashboard/categories',
    },
    {
      label: 'Low Stock',
      value: stats?.low_stock ?? 0,
      sub:   'items need restocking',
      icon:  AlertTriangle,
      color: 'bg-red-50 text-red-500',
      href:  '/admin/dashboard/products',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-bark">Overview</h1>
          <p className="text-sm text-text-muted mt-1">
            Welcome back — here's what's happening with your store.
          </p>
        </div>
        <Link href="/admin/dashboard/orders/new" className="btn btn-primary btn-sm">
          <ShoppingBag size={15} /> New Order
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {STAT_CARDS.map(({ label, value, sub, icon: Icon, color, href }) => (
          <Link key={label} href={href}
            className="bg-white border border-gray-100 rounded-2xl p-5
                       hover:border-sage/20 hover:-translate-y-0.5
                       hover:shadow-[0_8px_24px_rgba(61,43,31,0.08)]
                       transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={18} />
              </div>
              <ArrowRight size={14} className="text-text-muted/40 mt-1" />
            </div>
            <div className="font-display text-3xl font-semibold text-bark mb-0.5">{value}</div>
            <div className="text-sm font-medium text-bark">{label}</div>
            <div className="text-xs text-text-muted mt-0.5">{sub}</div>
          </Link>
        ))}
      </div>

      {/* Pending orders table */}
      <div className="bg-white border border-gray-100 rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <Clock size={16} className="text-yellow-500" />
            <h2 className="font-display text-lg text-bark">Pending Orders</h2>
            {(stats?.pending_orders ?? 0) > 0 && (
              <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold
                               px-2 py-0.5 rounded-full">
                {stats.pending_orders}
              </span>
            )}
          </div>
          <Link href="/admin/dashboard/orders"
            className="text-xs font-semibold text-sage hover:text-bark
                       transition-colors flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="px-6 py-12 text-center text-text-muted text-sm">
            No pending orders 🎉
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-cream/30">
                  {['Order #', 'Customer', 'Phone', 'Amount', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold
                                           tracking-wider uppercase text-text-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((o: any) => (
                  <tr key={o.id} className="hover:bg-cream/30 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-bark font-medium">
                      {o.order_number}
                    </td>
                    <td className="px-5 py-3 font-medium text-bark">{o.customer_name}</td>
                    <td className="px-5 py-3 text-text-muted">{o.customer_phone}</td>
                    <td className="px-5 py-3 font-semibold text-bark">
                      {formatPrice(o.total_amount)}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                        ${getStatusStyle(o.status)}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <Link href={`/admin/dashboard/orders/${o.id}`}
                        className="text-xs font-semibold text-sage hover:text-bark
                                   transition-colors flex items-center gap-1">
                        View <ArrowRight size={11} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
