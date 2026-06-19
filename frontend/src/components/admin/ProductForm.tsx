'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader } from 'lucide-react'
import { uploadToCloudinary, adminGetCategories } from '@/lib/admin-api'
import { useEffect } from 'react'

interface ProductFormData {
  name: string
  category_id: string
  short_description: string
  description: string
  price: string
  stock_qty: string
  image_url: string
  is_featured: boolean
  is_active: boolean
}

interface Props {
  initial?: Partial<ProductFormData>
  onSubmit: (data: ProductFormData) => Promise<void>
  submitLabel: string
  loading: boolean
  errors?: Record<string, string[]>
}

const EMPTY: ProductFormData = {
  name: '', category_id: '', short_description: '', description: '',
  price: '', stock_qty: '', image_url: '', is_featured: false, is_active: true,
}

export default function ProductForm({ initial, onSubmit, submitLabel, loading, errors }: Props) {
  const [form, setForm]           = useState<ProductFormData>({ ...EMPTY, ...initial })
  const [categories, setCategories] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    adminGetCategories().then(res => setCategories(res.data ?? []))
  }, [])

  function update(field: keyof ProductFormData, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError('')
    try {
      const url = await uploadToCloudinary(file)
      update('image_url', url)
    } catch {
      setUploadError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit(form)
  }

  function fieldError(field: string) {
    return errors?.[field]?.[0]
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label className="form-label">Product Name *</label>
            <input type="text" className={`form-input ${fieldError('name') ? 'border-red-500' : ''}`}
              value={form.name} onChange={e => update('name', e.target.value)}
              placeholder="e.g. Chamomile & Lavender Sleep Tea" required />
            {fieldError('name') && <p className="text-xs text-red-500 mt-1">{fieldError('name')}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="form-label">Category *</label>
            <select className={`form-input cursor-pointer ${fieldError('category_id') ? 'border-red-500' : ''}`}
              value={form.category_id} onChange={e => update('category_id', e.target.value)} required>
              <option value="">Select a category…</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {fieldError('category_id') && <p className="text-xs text-red-500 mt-1">{fieldError('category_id')}</p>}
          </div>

          {/* Short description */}
          <div>
            <label className="form-label">Short Description * <span className="text-text-muted font-normal text-xs">(shown on cards)</span></label>
            <input type="text" className="form-input"
              value={form.short_description}
              onChange={e => update('short_description', e.target.value)}
              placeholder="One-line summary" required maxLength={300} />
          </div>

          {/* Description */}
          <div>
            <label className="form-label">Full Description *</label>
            <textarea rows={5} className="form-input resize-y"
              value={form.description}
              onChange={e => update('description', e.target.value)}
              placeholder="Detailed product description…" required />
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Price (Ksh) *</label>
              <input type="number" className="form-input" min="0" step="0.01"
                value={form.price} onChange={e => update('price', e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Stock Qty *</label>
              <input type="number" className="form-input" min="0"
                value={form.stock_qty} onChange={e => update('stock_qty', e.target.value)} required />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            {(['is_featured', 'is_active'] as const).map(field => (
              <label key={field} className="flex items-center gap-2.5 cursor-pointer select-none">
                <div
                  onClick={() => update(field, !form[field])}
                  className={`w-10 h-5 rounded-full transition-colors relative
                    ${form[field] ? 'bg-sage' : 'bg-bark/20'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow
                                   transition-transform ${form[field] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-sm text-bark capitalize">{field.replace('is_', '')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Right column — image */}
        <div>
          <label className="form-label">Product Image *</label>

          {/* Preview */}
          {form.image_url ? (
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-bark/10 bg-cream-dark mb-3">
              <Image src={form.image_url} alt="Preview" fill className="object-cover" />
              <button
                type="button"
                onClick={() => update('image_url', '')}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-bark/70 text-cream
                           flex items-center justify-center hover:bg-bark transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileRef.current?.click()}
              className="aspect-[4/3] rounded-lg border-2 border-dashed border-bark/20
                         bg-cream-dark flex flex-col items-center justify-center gap-2
                         cursor-pointer hover:border-sage transition-colors mb-3 text-center px-4"
            >
              {uploading ? (
                <Loader size={24} className="text-sage animate-spin" />
              ) : (
                <>
                  <Upload size={24} className="text-text-muted" />
                  <p className="text-sm text-text-muted">Click to upload from your device</p>
                  <p className="text-xs text-text-muted/60">PNG, JPG, WEBP up to 10MB</p>
                </>
              )}
            </div>
          )}

          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={handleImageUpload} />

          {uploadError && <p className="text-xs text-red-500 mb-2">{uploadError}</p>}

          {/* Or paste URL */}
          <div>
            <label className="form-label text-xs text-text-muted">Or paste image URL</label>
            <input type="url" className="form-input text-sm"
              value={form.image_url}
              onChange={e => update('image_url', e.target.value)}
              placeholder="https://…" />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2 border-t border-bark/10">
        <button type="submit" disabled={loading || uploading}
          className="btn btn-primary disabled:opacity-60">
          {loading ? 'Saving…' : submitLabel}
        </button>
        <button type="button" onClick={() => history.back()}
          className="btn btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  )
}
