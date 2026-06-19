'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Plus, Search, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  adminGetOrders, adminDeleteOrder, adminUpdateOrder,
  formatPrice, getStatusStyle, ORDER_STATUSES,
} from '@/lib/admin-api'
import ConfirmModal from '@/components/admin/ConfirmModal'

export default function OrdersPage() {
  const [orders, setOrders]       = useState<any[]>([])
  const [pagination, setPagination] = useState<any>(null)
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [status, setStatus]       = useState('all')
  const [page, setPage]           = useState(1)
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: number; name: string }>({
    open: false, id: 0, name: '',
  })

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await adminGetOrders({ status, search, page })
      setOrders(res.data ?? [])
      setPagination(res.pagination)
    } finally {
      setLoading(false)
    }
  }, [status, search, page])

  useEffect(() => { load() }, [load])

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setPage(1); load() }, 400)
    return () => clearTimeout(t)
  }, [search]) // eslint-disable-line

  async function handleDelete() {
    await adminDeleteOrder(deleteModal.id)
    setDeleteModal({ open: false, id: 0, name: '' })
    load()
  }

  async function handleStatusChange(id: number, newStatus: string) {
    await adminUpdateOrder(id, { status: newStatus })
    setOrders(o => o.map(x => x.id === id ? { ...x, status: newStatus } : x))
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-bark">Orders</h1>
          <p className="text-sm text-text-muted mt-1">
            {pagination?.total ?? 0} total orders
          </p>
        </div>
        <Link href="/admin/dashboard/orders/new" className="btn btn-primary">
          <Plus size={16} /> New Order
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="search" placeholder="Search by name, phone or order #…"
            className="form-input pl-10 py-2.5 text-sm"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Status filter */}
        <div className="flex gap-1.5 flex-wrap">
          {[{ value: 'all', label: 'All' }, ...ORDER_STATUSES].map(s => (
            <button key={s.value}
              onClick={() => { setStatus(s.value); setPage(1) }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150
                ${status === s.value
                  ? 'bg-bark text-cream'
                  : 'bg-white border border-gray-200 text-text-muted hover:border-sage hover:text-sage'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-sage border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-text-muted text-sm">
            No orders found.{' '}
            <Link href="/admin/dashboard/orders/new" className="text-sage hover:underline">
              Create your first order
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-cream/40">
                  {['Order #', 'Customer', 'Phone', 'Items', 'Total', 'Source', 'Status', 'Date', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold
                                           tracking-wider uppercase text-text-muted whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-cream/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-bark font-semibold whitespace-nowrap">
                      {o.order_number}
                    </td>
                    <td className="px-4 py-3 font-medium text-bark whitespace-nowrap">
                      {o.customer_name}
                    </td>
                    <td className="px-4 py-3 text-text-muted whitespace-nowrap">
                      {o.customer_phone}
                    </td>
                    <td className="px-4 py-3 text-center text-text-muted">
                      {o.items?.length ?? 0}
                    </td>
                    <td className="px-4 py-3 font-semibold text-bark whitespace-nowrap">
                      {formatPrice(o.total_amount)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
                        {o.source}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={o.status}
                        onChange={e => handleStatusChange(o.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border-0
                          outline-none cursor-pointer appearance-none ${getStatusStyle(o.status)}`}>
                        {ORDER_STATUSES.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-text-muted whitespace-nowrap">
                      {new Date(o.created_at).toLocaleDateString('en-KE', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/dashboard/orders/${o.id}`}
                          className="p-1.5 text-text-muted hover:text-sage transition-colors rounded"
                          title="View order">
                          <Eye size={15} />
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ open: true, id: o.id, name: o.order_number })}
                          className="p-1.5 text-text-muted hover:text-red-500 transition-colors rounded"
                          title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
            <p className="text-xs text-text-muted">
              Page {pagination.current_page} of {pagination.last_page}
            </p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={pagination.current_page === 1}
                className="p-2 rounded-lg border border-gray-200 text-text-muted
                           hover:border-sage hover:text-sage transition-colors
                           disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronLeft size={15} />
              </button>
              <button onClick={() => setPage(p => Math.min(pagination.last_page, p + 1))}
                disabled={pagination.current_page === pagination.last_page}
                className="p-2 rounded-lg border border-gray-200 text-text-muted
                           hover:border-sage hover:text-sage transition-colors
                           disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        open={deleteModal.open}
        title="Delete Order"
        message={`Are you sure you want to delete order ${deleteModal.name}? This cannot be undone.`}
        confirmLabel="Delete Order"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: 0, name: '' })}
      />
    </div>
  )
}
