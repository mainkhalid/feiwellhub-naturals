import { Product, Category, ContactFormData } from '@/types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL

if (!API_BASE) {
  throw new Error('NEXT_PUBLIC_API_URL is missing')
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const url = categorySlug
    ? `${API_BASE}/api/products?category=${encodeURIComponent(categorySlug)}`
    : `${API_BASE}/api/products`

  const res = await fetch(url, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`)
  }

  const json = await res.json()
  return json.data ?? []
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const res = await fetch(
    `${API_BASE}/api/products/featured?limit=${limit}`,
    {
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch featured products (${res.status})`)
  }

  const json = await res.json()
  return json.data ?? []
}

export async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(
    `${API_BASE}/api/products/${encodeURIComponent(slug)}`,
    {
      cache: 'no-store',
    }
  )

  if (res.status === 404) {
    return null
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch product (${res.status})`)
  }

  const json = await res.json()
  return json.data ?? null
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/api/categories`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch categories (${res.status})`)
  }

  const json = await res.json()

  if (!Array.isArray(json.data)) {
    throw new Error('Invalid categories response')
  }

  return json.data
}

export async function getProductSlugs(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/products/slugs`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch product slugs (${res.status})`)
  }

  const json = await res.json()
  return json.data ?? []
}

export async function submitContact(data: ContactFormData) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error(`Failed to submit contact form (${res.status})`)
  }

  return res.json()
}

export function formatPrice(price: number): string {
  return `Ksh ${price.toLocaleString('en-KE', {
    maximumFractionDigits: 0,
  })}`
}