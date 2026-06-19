'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Star } from 'lucide-react'
import { adminGetProducts, adminDeleteProduct, adminUpdateProduct, formatPrice } from '@/lib/admin-api'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)

  async function load() {
    const res = await adminGetProducts()
    setProducts(res.data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeleting(id)
    await adminDeleteProduct(id)
    setProducts(p => p.filter(x => x.id !== id))
    setDeleting(null)
  }

  async function toggleField(id: number, field: 'is_active' | 'is_featured', current: boolean) {
    await adminUpdateProduct(id, { [field]: !current })
    setProducts(p => p.map(x => x.id === id ? { ...x, [field]: !current } : x))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-sage border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-bark">Products</h1>
          <p className="text-sm text-text-muted mt-1">{products.length} total products</p>
        </div>
        <Link href="/admin/dashboard/products/new" className="btn btn-primary">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white border border-bark/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bark/10 bg-cream/50">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wider uppercase text-text-muted">
                  Product
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wider uppercase text-text-muted hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wider uppercase text-text-muted">
                  Price
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium tracking-wider uppercase text-text-muted hidden sm:table-cell">
                  Stock
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium tracking-wider uppercase text-text-muted hidden lg:table-cell">
                  Featured
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium tracking-wider uppercase text-text-muted hidden lg:table-cell">
                  Active
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium tracking-wider uppercase text-text-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bark/5">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-cream/30 transition-colors">
                  {/* Product */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-cream-dark shrink-0">
                        {p.image_url && (
                          <Image
                            src={p.image_url}
                            alt={p.name}
                            width={40} height={40}
                            className="object-cover w-full h-full"
                          />
                        )}
                      </div>
                      <span className="font-medium text-bark line-clamp-1">{p.name}</span>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="px-4 py-3 text-text-muted hidden md:table-cell">
                    {p.category_name}
                  </td>
                  {/* Price */}
                  <td className="px-4 py-3 font-medium text-bark">
                    {formatPrice(p.price)}
                  </td>
                  {/* Stock */}
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium
                      ${p.stock_qty <= 5
                        ? 'bg-red-50 text-red-500'
                        : 'bg-sage-pale text-sage'}`}>
                      {p.stock_qty}
                    </span>
                  </td>
                  {/* Featured */}
                  <td className="px-4 py-3 text-center hidden lg:table-cell">
                    <button
                      onClick={() => toggleField(p.id, 'is_featured', p.is_featured)}
                      className={`transition-colors ${p.is_featured ? 'text-gold' : 'text-bark/20 hover:text-gold'}`}
                      title={p.is_featured ? 'Remove from featured' : 'Mark as featured'}
                    >
                      <Star size={16} fill={p.is_featured ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  {/* Active */}
                  <td className="px-4 py-3 text-center hidden lg:table-cell">
                    <button
                      onClick={() => toggleField(p.id, 'is_active', p.is_active)}
                      className={p.is_active ? 'text-sage' : 'text-bark/20'}
                      title={p.is_active ? 'Deactivate' : 'Activate'}
                    >
                      {p.is_active
                        ? <ToggleRight size={20} />
                        : <ToggleLeft size={20} />}
                    </button>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/dashboard/products/${p.id}`}
                        className="p-1.5 text-text-muted hover:text-bark rounded transition-colors"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deleting === p.id}
                        className="p-1.5 text-text-muted hover:text-red-500 rounded
                                   transition-colors disabled:opacity-40"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="text-center py-16 text-text-muted text-sm">
              No products yet.{' '}
              <Link href="/admin/dashboard/products/new" className="text-sage hover:underline">
                Add your first product
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
