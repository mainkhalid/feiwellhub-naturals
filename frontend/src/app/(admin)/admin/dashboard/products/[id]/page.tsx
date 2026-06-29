'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProductForm from '@/components/admin/ProductForm'
import { adminGetProduct, adminUpdateProduct } from '@/lib/admin-api'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()

  const id = Number(params.id)

  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    console.log('params:', params)
    console.log('id:', id)

    if (!Number.isFinite(id)) return

    adminGetProduct(id).then(res => setProduct(res.data))
  }, [id, params])

  async function handleSubmit(data: any) {
    if (!Number.isFinite(id)) return

    setLoading(true)

    try {
      const res = await adminUpdateProduct(id, {
        ...data,
        price: parseFloat(data.price),
        stock_qty: parseInt(data.stock_qty),
        category_id: parseInt(data.category_id),
      })

      if (res.data) {
        router.push('/admin/dashboard/products')
      } else {
        setErrors(res.errors ?? {})
      }
    } finally {
      setLoading(false)
    }
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-sage border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/dashboard/products"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-bark transition-colors mb-4"
        >
          <ArrowLeft size={14} />
          Back to Products
        </Link>

        <h1 className="font-display text-3xl text-bark">
          Edit Product
        </h1>

        <p className="text-sm text-text-muted mt-1">
          {product.name}
        </p>
      </div>

      <div className="bg-white border border-bark/10 rounded-xl p-6 md:p-8">
        <ProductForm
          initial={{
            name: product.name,
            category_id: String(product.category_id),
            short_description: product.short_description,
            description: product.description,
            price: String(product.price),
            stock_qty: String(product.stock_qty),
            image_url: product.image_url,
            is_featured: product.is_featured,
            is_active: product.is_active,
          }}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          loading={loading}
          errors={errors}
        />
      </div>
    </div>
  )
}