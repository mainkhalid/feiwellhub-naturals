'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Printer, MessageCircle, Edit2, Check, X } from 'lucide-react'
import {
  adminGetOrder, adminUpdateOrder,
  formatPrice, getStatusStyle, ORDER_STATUSES,
} from '@/lib/admin-api'

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder]       = useState<any>(null)
  const [loading, setLoading]   = useState(true)
  const [editNotes, setEditNotes] = useState(false)
  const [notes, setNotes]       = useState('')
  const [saving, setSaving]     = useState(false)

  useEffect(() => {
    adminGetOrder(parseInt(params.id))
      .then(res => {
        setOrder(res.data)
        setNotes(res.data?.notes ?? '')
      })
      .finally(() => setLoading(false))
  }, [params.id])

  async function handleStatusChange(newStatus: string) {
    setSaving(true)
    const res = await adminUpdateOrder(order.id, { status: newStatus })
    if (res.data) setOrder(res.data)
    setSaving(false)
  }

  async function saveNotes() {
    setSaving(true)
    const res = await adminUpdateOrder(order.id, { notes })
    if (res.data) setOrder(res.data)
    setEditNotes(false)
    setSaving(false)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-sage border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!order) return (
    <div className="text-center py-20 text-text-muted">
      Order not found.{' '}
      <Link href="/admin/dashboard/orders" className="text-sage hover:underline">Go back</Link>
    </div>
  )

  const waMessage = encodeURIComponent(
    `Hi ${order.customer_name}, your Feiwellhub Naturals order ${order.order_number} ` +
    `is now ${order.status}. Total: Ksh ${order.total_amount.toLocaleString()}. Thank you! 🌿`
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <Link href="/admin/dashboard/orders"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted
                       hover:text-bark transition-colors mb-3">
            <ArrowLeft size={14} /> Back to Orders
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-display text-3xl text-bark">{order.order_number}</h1>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full
              ${getStatusStyle(order.status)}`}>
              {order.status}
            </span>
          </div>
          <p className="text-sm text-text-muted mt-1">
            Created {new Date(order.created_at).toLocaleDateString('en-KE', {
              day: 'numeric', month: 'long', year: 'numeric',
              hour: '2-digit', minute: '2-digit',
            })}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {/* WhatsApp customer */}
          <a href={`https://wa.me/${order.customer_phone?.replace(/\D/g, '')}?text=${waMessage}`}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-sm bg-[#25D366] text-white border-[#25D366] hover:bg-[#22c55e]">
            <MessageCircle size={14} /> WhatsApp Customer
          </a>
          {/* Print */}
          <button onClick={() => window.print()}
            className="btn btn-ghost btn-sm">
            <Printer size={14} /> Print
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Left */}
        <div className="flex flex-col gap-5">

          {/* Order items */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-display text-lg text-bark">Order Items</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-cream/30">
                  {['Product', 'Qty', 'Unit Price', 'Subtotal'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold
                                           tracking-wider uppercase text-text-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {order.items?.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-5 py-3 font-medium text-bark">{item.product_name}</td>
                    <td className="px-5 py-3 text-text-muted text-center">{item.quantity}</td>
                    <td className="px-5 py-3 text-text-muted">{formatPrice(item.unit_price)}</td>
                    <td className="px-5 py-3 font-semibold text-bark">{formatPrice(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-100 bg-cream/20">
                  <td colSpan={3} className="px-5 py-3 text-sm font-medium text-text-muted text-right">
                    Subtotal
                  </td>
                  <td className="px-5 py-3 font-semibold text-bark">
                    {formatPrice(order.total_amount - order.delivery_fee)}
                  </td>
                </tr>
                <tr className="bg-cream/20">
                  <td colSpan={3} className="px-5 py-2 text-sm font-medium text-text-muted text-right">
                    Delivery Fee
                  </td>
                  <td className="px-5 py-2 text-bark">{formatPrice(order.delivery_fee)}</td>
                </tr>
                <tr className="bg-cream/40 font-semibold border-t border-gray-100">
                  <td colSpan={3} className="px-5 py-3 text-base text-bark text-right font-semibold">
                    Total
                  </td>
                  <td className="px-5 py-3 font-display text-xl text-bark">
                    {formatPrice(order.total_amount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Notes */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-lg text-bark">Notes</h2>
              {!editNotes && (
                <button onClick={() => setEditNotes(true)}
                  className="p-1.5 text-text-muted hover:text-sage transition-colors rounded">
                  <Edit2 size={14} />
                </button>
              )}
            </div>
            {editNotes ? (
              <div>
                <textarea rows={3} className="form-input resize-none mb-3"
                  value={notes} onChange={e => setNotes(e.target.value)}
                  placeholder="Add notes about this order…" />
                <div className="flex gap-2">
                  <button onClick={saveNotes} disabled={saving}
                    className="btn btn-sm bg-sage text-white border-sage hover:bg-sage/90
                               disabled:opacity-60">
                    <Check size={13} /> Save
                  </button>
                  <button onClick={() => { setEditNotes(false); setNotes(order.notes ?? '') }}
                    className="btn btn-ghost btn-sm">
                    <X size={13} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-text-muted leading-relaxed">
                {order.notes || <em className="text-bark/30">No notes added.</em>}
              </p>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-5">
          {/* Customer */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="font-display text-lg text-bark mb-4">Customer</h2>
            <div className="flex flex-col gap-2.5 text-sm">
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-text-muted">Name</span>
                <p className="font-medium text-bark mt-0.5">{order.customer_name}</p>
              </div>
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-text-muted">Phone</span>
                <a href={`tel:${order.customer_phone}`}
                  className="block font-medium text-sage mt-0.5 hover:underline">
                  {order.customer_phone}
                </a>
              </div>
              {order.customer_email && (
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-text-muted">Email</span>
                  <a href={`mailto:${order.customer_email}`}
                    className="block text-sage mt-0.5 hover:underline truncate">
                    {order.customer_email}
                  </a>
                </div>
              )}
              {order.delivery_address && (
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-text-muted">
                    Delivery Address
                  </span>
                  <p className="text-text-muted mt-0.5">{order.delivery_address}</p>
                </div>
              )}
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-text-muted">Source</span>
                <p className="text-text-muted mt-0.5 capitalize">{order.source}</p>
              </div>
            </div>
          </div>

          {/* Update Status */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="font-display text-lg text-bark mb-4">Update Status</h2>
            <div className="flex flex-col gap-2">
              {ORDER_STATUSES.map(s => (
                <button key={s.value}
                  onClick={() => handleStatusChange(s.value)}
                  disabled={saving || order.status === s.value}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl
                    border text-sm font-medium transition-all duration-150
                    disabled:cursor-default
                    ${order.status === s.value
                      ? `${s.color} border-transparent`
                      : 'border-gray-100 text-text-muted hover:border-sage/30 hover:text-sage'}`}>
                  {s.label}
                  {order.status === s.value && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
