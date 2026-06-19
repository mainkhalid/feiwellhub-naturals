import { Product, Category, ContactFormData } from '@/types'

const API_BASE = typeof window === 'undefined'
  ? 'http://api:8000'        // server-side inside Docker → uses service name
  : 'http://localhost:8000'  // client-side in browser → uses localhost


export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const url = categorySlug
    ? `${API_BASE}/api/products?category=${categorySlug}`
    : `${API_BASE}/api/products`

  const res = await fetch(url, {
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data ?? []
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/api/products/featured?limit=${limit}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data ?? []
}

export async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`${API_BASE}/api/products/${slug}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return null
  const json = await res.json()
  return json.data ?? null
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/api/categories`, {
    next: { revalidate: 3600 }, // categories change rarely
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data ?? []
}

export async function getProductSlugs(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/products/slugs`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data ?? []
}

// ── CLIENT-SIDE ──────────────────────────────────────────────────────────────

export async function submitContact(data: ContactFormData) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

// ── HELPERS ──────────────────────────────────────────────────────────────────

export function formatPrice(price: number): string {
  return `Ksh ${price.toLocaleString('en-KE', { maximumFractionDigits: 0 })}`
}
