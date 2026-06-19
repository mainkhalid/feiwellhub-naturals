export interface Category {
  id: number
  name: string
  slug: string
  description: string
  icon: string
}

export interface Product {
  id: number
  category_id: number
  name: string
  slug: string
  description: string
  short_description: string
  price: number
  stock_qty: number
  image_url: string
  is_featured: boolean
  is_active: boolean
  created_at: string
  category_name: string
  category_slug: string
}

export interface ContactFormData {
  full_name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
}
