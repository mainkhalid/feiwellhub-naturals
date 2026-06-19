'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react'
import {
  adminGetCategories, adminCreateCategory,
  adminUpdateCategory, adminDeleteCategory,
} from '@/lib/admin-api'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading]       = useState(true)
  const [editing, setEditing]       = useState<number | null>(null)
  const [showNew, setShowNew]       = useState(false)

  const EMPTY = { name: '', description: '', icon: '' }
  const [newForm, setNewForm]   = useState(EMPTY)
  const [editForm, setEditForm] = useState(EMPTY)

  async function load() {
    const res = await adminGetCategories()
    setCategories(res.data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function handleCreate() {
    if (!newForm.name.trim()) return
    const res = await adminCreateCategory(newForm)
    if (res.data) {
      setCategories(c => [...c, res.data])
      setNewForm(EMPTY)
      setShowNew(false)
    }
  }

  async function handleUpdate(id: number) {
    const res = await adminUpdateCategory(id, editForm)
    if (res.data) {
      setCategories(c => c.map(x => x.id === id ? res.data : x))
      setEditing(null)
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete category "${name}"? Products in this category will be unlinked.`)) return
    await adminDeleteCategory(id)
    setCategories(c => c.filter(x => x.id !== id))
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
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-bark">Categories</h1>
          <p className="text-sm text-text-muted mt-1">{categories.length} categories</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn btn-primary">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="bg-white border border-bark/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-bark/10 bg-cream/50">
              {['Name', 'Slug', 'Products', 'Description', ''].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-medium
                                       tracking-wider uppercase text-text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-bark/5">
            {/* New row */}
            {showNew && (
              <tr className="bg-sage-pale">
                <td className="px-5 py-3">
                  <input autoFocus className="form-input text-sm py-1.5"
                    placeholder="Category name"
                    value={newForm.name}
                    onChange={e => setNewForm(f => ({ ...f, name: e.target.value }))} />
                </td>
                <td className="px-5 py-3 text-text-muted text-xs">auto-generated</td>
                <td className="px-5 py-3">—</td>
                <td className="px-5 py-3">
                  <input className="form-input text-sm py-1.5"
                    placeholder="Short description"
                    value={newForm.description}
                    onChange={e => setNewForm(f => ({ ...f, description: e.target.value }))} />
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button onClick={handleCreate}
                      className="p-1.5 text-sage hover:text-bark transition-colors">
                      <Check size={16} />
                    </button>
                    <button onClick={() => { setShowNew(false); setNewForm(EMPTY) }}
                      className="p-1.5 text-text-muted hover:text-red-500 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-cream/30 transition-colors">
                <td className="px-5 py-3">
                  {editing === cat.id ? (
                    <input autoFocus className="form-input text-sm py-1.5"
                      value={editForm.name}
                      onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
                  ) : (
                    <span className="font-medium text-bark">{cat.name}</span>
                  )}
                </td>
                <td className="px-5 py-3 text-text-muted font-mono text-xs">{cat.slug}</td>
                <td className="px-5 py-3 text-center">
                  <span className="bg-sage-pale text-sage text-xs font-medium px-2 py-0.5 rounded-full">
                    {cat.products_count ?? 0}
                  </span>
                </td>
                <td className="px-5 py-3 text-text-muted max-w-[240px]">
                  {editing === cat.id ? (
                    <input className="form-input text-sm py-1.5"
                      value={editForm.description}
                      onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} />
                  ) : (
                    <span className="line-clamp-1">{cat.description}</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    {editing === cat.id ? (
                      <>
                        <button onClick={() => handleUpdate(cat.id)}
                          className="p-1.5 text-sage hover:text-bark transition-colors">
                          <Check size={15} />
                        </button>
                        <button onClick={() => setEditing(null)}
                          className="p-1.5 text-text-muted hover:text-red-500 transition-colors">
                          <X size={15} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => { setEditing(cat.id); setEditForm({ name: cat.name, description: cat.description ?? '', icon: cat.icon ?? '' }) }}
                          className="p-1.5 text-text-muted hover:text-bark transition-colors">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => handleDelete(cat.id, cat.name)}
                          className="p-1.5 text-text-muted hover:text-red-500 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
