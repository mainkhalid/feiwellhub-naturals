'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, Search } from 'lucide-react'
import { adminCreateOrder, adminGetProducts, formatPrice } from '@/lib/admin-api'

interface OrderItem {
  product_id:   number | null
  product_name: string
  quantity:     number
  unit_price:   number
}

export default function NewOrderPage() {
  const router = useRouter()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState<Record<string, any>>({})
  const [productSearch, setProductSearch] = useState('')

  const [form, setForm] = useState({
    customer_name:    '',
    customer_phone:   '',
    customer_email:   '',
    delivery_address: '',
    delivery_fee:     200,
    source:           'whatsapp',
    notes:            '',
  })

  const [items, setItems] = useState<OrderItem[]>([
    { product_id: null, product_name: '', quantity: 1, unit_price: 0 },
  ])

  useEffect(() => {
    adminGetProducts().then(res => setProducts(res.data ?? []))
  }, [])

  function updateForm(field: string, value: any) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function addItem() {
    setItems(i => [...i, { product_id: null, product_name: '', quantity: 1, unit_price: 0 }])
  }

  function removeItem(index: number) {
    setItems(i => i.filter((_, idx) => idx !== index))
  }

  function updateItem(index: number, field: string, value: any) {
    setItems(items => items.map((item, idx) => {
      if (idx !== index) return item
      if (field === 'product_id') {
        const product = products.find(p => p.id === parseInt(value))
        return {
          ...item,
          product_id:   product?.id ?? null,
          product_name: product?.name ?? item.product_name,
          unit_price:   product?.price ?? item.unit_price,
        }
      }
      return { ...item, [field]: value }
    }))
  }

  const subtotal    = items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0)
  const total       = subtotal + Number(form.delivery_fee)
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (items.some(i => !i.product_name || i.unit_price <= 0)) {
      setErrors({ items: 'All items must have a name and price.' })
      return
    }
    setLoading(true)
    setErrors({})
    try {
      const res = await adminCreateOrder({
        ...form,
        delivery_fee: Number(form.delivery_fee),
        items: items.map(i => ({
          ...i,
          quantity:   Number(i.quantity),
          unit_price: Number(i.unit_price),
        })),
      })
      if (res.data) {
        router.push(`/admin/dashboard/orders/${res.data.id}`)
      } else {
        setErrors(res.errors ?? { general: 'Something went wrong.' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/dashboard/orders"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted
                     hover:text-bark transition-colors mb-4">
          <ArrowLeft size={14} /> Back to Orders
        </Link>
        <h1 className="font-display text-3xl text-bark">New Order</h1>
        <p className="text-sm text-text-muted mt-1">Manually create an order from a WhatsApp or phone enquiry.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Left — customer + items */}
        <div className="flex flex-col gap-5">

          {/* Customer details */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="font-display text-lg text-bark mb-5">Customer Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Full Name *</label>
                <input type="text" className="form-input" placeholder="e.g. Amina Odhiambo"
                  value={form.customer_name}
                  onChange={e => updateForm('customer_name', e.target.value)} required />
              </div>
              <div>
                <label className="form-label">Phone *</label>
                <input type="tel" className="form-input" placeholder="+254 700 000 000"
                  value={form.customer_phone}
                  onChange={e => updateForm('customer_phone', e.target.value)} required />
              </div>
              <div>
                <label className="form-label">Email <span className="text-text-muted font-normal text-xs">(optional)</span></label>
                <input type="email" className="form-input" placeholder="email@example.com"
                  value={form.customer_email}
                  onChange={e => updateForm('customer_email', e.target.value)} />
              </div>
              <div>
                <label className="form-label">Order Source</label>
                <select className="form-input cursor-pointer" value={form.source}
                  onChange={e => updateForm('source', e.target.value)}>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="phone">Phone Call</option>
                  <option value="walk-in">Walk-in</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="form-label">Delivery Address</label>
                <input type="text" className="form-input" placeholder="e.g. Westlands, Nairobi"
                  value={form.delivery_address}
                  onChange={e => updateForm('delivery_address', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Order items */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg text-bark">Order Items</h2>
              <button type="button" onClick={addItem}
                className="btn btn-ghost btn-sm text-xs">
                <Plus size={13} /> Add Item
              </button>
            </div>

            {/* Product quick search */}
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="search" placeholder="Search products to add…"
                className="form-input pl-9 py-2 text-sm"
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)} />
            </div>

            {productSearch && (
              <div className="border border-gray-100 rounded-xl mb-4 max-h-[200px] overflow-y-auto">
                {filteredProducts.slice(0, 8).map(p => (
                  <button key={p.id} type="button"
                    onClick={() => {
                      const existing = items.findIndex(i => i.product_id === p.id)
                      if (existing >= 0) {
                        updateItem(existing, 'quantity', items[existing].quantity + 1)
                      } else {
                        setItems(i => [...i, {
                          product_id:   p.id,
                          product_name: p.name,
                          quantity:     1,
                          unit_price:   p.price,
                        }])
                      }
                      setProductSearch('')
                    }}
                    className="flex items-center justify-between w-full px-4 py-2.5
                               hover:bg-sage-pale transition-colors text-sm text-left
                               border-b border-gray-50 last:border-0">
                    <span className="text-bark">{p.name}</span>
                    <span className="text-sage font-semibold">{formatPrice(p.price)}</span>
                  </button>
                ))}
              </div>
            )}

            {errors.items && (
              <p className="text-xs text-red-500 mb-3">{errors.items}</p>
            )}

            <div className="flex flex-col gap-3">
              {items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-[1fr_80px_110px_36px] gap-2 items-end">
                  <div>
                    {idx === 0 && <label className="form-label text-xs">Product Name</label>}
                    <input type="text" className="form-input py-2 text-sm"
                      placeholder="Product name"
                      value={item.product_name}
                      onChange={e => updateItem(idx, 'product_name', e.target.value)} required />
                  </div>
                  <div>
                    {idx === 0 && <label className="form-label text-xs">Qty</label>}
                    <input type="number" min="1" className="form-input py-2 text-sm text-center"
                      value={item.quantity}
                      onChange={e => updateItem(idx, 'quantity', e.target.value)} />
                  </div>
                  <div>
                    {idx === 0 && <label className="form-label text-xs">Unit Price (Ksh)</label>}
                    <input type="number" min="0" className="form-input py-2 text-sm"
                      placeholder="0"
                      value={item.unit_price}
                      onChange={e => updateItem(idx, 'unit_price', e.target.value)} />
                  </div>
                  <div className={idx === 0 ? 'mt-6' : ''}>
                    {items.length > 1 && (
                      <button type="button" onClick={() => removeItem(idx)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg
                                   text-text-muted hover:text-red-500 hover:bg-red-50
                                   transition-colors">
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <label className="form-label">Order Notes</label>
            <textarea rows={3} className="form-input resize-none"
              placeholder="Any special instructions or notes about this order…"
              value={form.notes}
              onChange={e => updateForm('notes', e.target.value)} />
          </div>
        </div>

        {/* Right — summary + submit */}
        <div className="flex flex-col gap-5">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 sticky top-6">
            <h2 className="font-display text-lg text-bark mb-5">Order Summary</h2>

            <div className="flex flex-col gap-2 mb-5">
              {items.filter(i => i.product_name).map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-text-muted truncate flex-1 mr-2">
                    {item.product_name} × {item.quantity}
                  </span>
                  <span className="text-bark font-medium shrink-0">
                    {formatPrice(item.quantity * item.unit_price)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 flex flex-col gap-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="text-bark font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Delivery Fee</span>
                <input type="number" min="0"
                  className="w-28 form-input py-1.5 text-sm text-right"
                  value={form.delivery_fee}
                  onChange={e => updateForm('delivery_fee', e.target.value)} />
              </div>
              <div className="flex justify-between text-base font-semibold border-t border-gray-100 pt-3">
                <span className="text-bark">Total</span>
                <span className="text-bark font-display text-xl">{formatPrice(total)}</span>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn btn-primary w-full justify-center disabled:opacity-60">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-cream border-t-transparent
                                   rounded-full animate-spin" />
                  Creating…
                </span>
              ) : 'Create Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
