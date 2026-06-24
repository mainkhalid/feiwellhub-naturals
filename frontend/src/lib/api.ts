import { Product, Category, ContactFormData } from '@/types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL
  ?? (typeof window === 'undefined'
    ? 'http://api:8000'       // local Docker server-side
    : 'http://localhost:8000' // local Docker client-side
  )

// ── Products ──────────────────────────────────────────

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const url = categorySlug
    ? `${API_BASE}/api/products?category=${categorySlug}`
    : `${API_BASE}/api/products`
  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const json = await res.json()
    return json.data ?? []
  } catch { return [] }
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/api/products/featured?limit=${limit}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const json = await res.json()
    return json.data ?? []
  } catch { return [] }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/api/products/${slug}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const json = await res.json()
    return json.data ?? null
  } catch { return null }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE}/api/categories`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const json = await res.json()
    return json.data ?? []
  } catch { return [] }
}

export async function getProductSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE}/api/products/slugs`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const json = await res.json()
    return json.data ?? []
  } catch { return [] }
}

// ── Contact (client-side) ─────────────────────────────

export async function submitContact(data: ContactFormData) {
  // In production goes directly to the API
  // In local dev goes through Next.js rewrite
  const url = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/contact`
    : '/api/contact'

  const res = await fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  })
  return res.json()
}

// ── Helpers ───────────────────────────────────────────

export function formatPrice(price: number): string {
  return `Ksh ${price.toLocaleString('en-KE', { maximumFractionDigits: 0 })}`
}