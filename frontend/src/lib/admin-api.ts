const API_BASE = process.env.NEXT_PUBLIC_API_URL

if (!API_BASE) {
  throw new Error('NEXT_PUBLIC_API_URL is missing')
}
// ── Token helpers ─────────────────────────────────────
export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('feiwellhub_admin_token')
}
export function setToken(token: string): void {
  localStorage.setItem('feiwellhub_admin_token', token)
}
export function removeToken(): void {
  localStorage.removeItem('feiwellhub_admin_token')
}

// ── Base fetch ────────────────────────────────────────
async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken()
  const res = await fetch(`${API_BASE}/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  })
  if (res.status === 401) {
    removeToken()
    if (typeof window !== 'undefined') window.location.href = '/admin/login'
    throw new Error('Unauthenticated')
  }
  return res
}

// ── Auth ──────────────────────────────────────────────
export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return res.json()
}
export async function logout() {
  await apiFetch('/auth/logout', { method: 'POST' })
  removeToken()
}
export async function getMe() {
  const res = await apiFetch('/auth/me')
  return res.json()
}

// ── Dashboard ─────────────────────────────────────────
export async function getStats() {
  const res = await apiFetch('/admin/stats')
  return res.json()
}
export async function getNotifications() {
  const res = await apiFetch('/admin/notifications')
  return res.json()
}

// ── Products ──────────────────────────────────────────
export async function adminGetProducts() {
  const res = await apiFetch('/admin/products')
  return res.json()
}
export async function adminGetProduct(id: number) {
  const res = await apiFetch(`/admin/products/${id}`)
  return res.json()
}
export async function adminCreateProduct(data: object) {
  const res = await apiFetch('/admin/products', { method: 'POST', body: JSON.stringify(data) })
  return res.json()
}
export async function adminUpdateProduct(id: number, data: object) {
  const res = await apiFetch(`/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  return res.json()
}
export async function adminDeleteProduct(id: number) {
  const res = await apiFetch(`/admin/products/${id}`, { method: 'DELETE' })
  return res.json()
}

// ── Categories ────────────────────────────────────────
export async function adminGetCategories() {
  const res = await apiFetch('/admin/categories')
  return res.json()
}
export async function adminCreateCategory(data: object) {
  const res = await apiFetch('/admin/categories', { method: 'POST', body: JSON.stringify(data) })
  return res.json()
}
export async function adminUpdateCategory(id: number, data: object) {
  const res = await apiFetch(`/admin/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  return res.json()
}
export async function adminDeleteCategory(id: number) {
  const res = await apiFetch(`/admin/categories/${id}`, { method: 'DELETE' })
  return res.json()
}

// ── Orders ────────────────────────────────────────────
export async function adminGetOrders(params?: { status?: string; search?: string; page?: number }) {
  const q = new URLSearchParams()
  if (params?.status && params.status !== 'all') q.set('status', params.status)
  if (params?.search) q.set('search', params.search)
  if (params?.page)   q.set('page', String(params.page))
  const res = await apiFetch(`/admin/orders?${q}`)
  return res.json()
}
export async function adminGetOrderStats() {
  const res = await apiFetch('/admin/orders/stats')
  return res.json()
}
export async function adminGetOrder(id: number) {
  const res = await apiFetch(`/admin/orders/${id}`)
  return res.json()
}
export async function adminCreateOrder(data: object) {
  const res = await apiFetch('/admin/orders', { method: 'POST', body: JSON.stringify(data) })
  return res.json()
}
export async function adminUpdateOrder(id: number, data: object) {
  const res = await apiFetch(`/admin/orders/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  return res.json()
}
export async function adminDeleteOrder(id: number) {
  const res = await apiFetch(`/admin/orders/${id}`, { method: 'DELETE' })
  return res.json()
}

// ── Messages ──────────────────────────────────────────
export async function adminGetMessages() {
  const res = await apiFetch('/admin/messages')
  return res.json()
}
export async function adminGetMessage(id: number) {
  const res = await apiFetch(`/admin/messages/${id}`)
  return res.json()
}
export async function adminToggleMessageRead(id: number) {
  const res = await apiFetch(`/admin/messages/${id}/read`, { method: 'PUT' })
  return res.json()
}
export async function adminDeleteMessage(id: number) {
  const res = await apiFetch(`/admin/messages/${id}`, { method: 'DELETE' })
  return res.json()
}

// ── Settings ──────────────────────────────────────────
export async function adminGetSettings() {
  const res = await apiFetch('/admin/settings')
  return res.json()
}
export async function adminUpdateSettings(data: object) {
  const res = await apiFetch('/admin/settings', { method: 'PUT', body: JSON.stringify(data) })
  return res.json()
}

// ── Cloudinary ────────────────────────────────────────
export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName    = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  const formData     = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset!)
  formData.append('folder', 'feiwellhub-products')
  const res  = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST', body: formData,
  })
  const data = await res.json()
  if (!data.secure_url) throw new Error('Upload failed')
  return data.secure_url
}

// ── Helpers ───────────────────────────────────────────
export function formatPrice(price: number): string {
  return `Ksh ${price.toLocaleString('en-KE', { maximumFractionDigits: 0 })}`
}

export const ORDER_STATUSES = [
  { value: 'pending',    label: 'Pending',    color: 'bg-yellow-100 text-yellow-700'  },
  { value: 'confirmed',  label: 'Confirmed',  color: 'bg-blue-100 text-blue-700'      },
  { value: 'processing', label: 'Processing', color: 'bg-purple-100 text-purple-700'  },
  { value: 'shipped',    label: 'Shipped',    color: 'bg-indigo-100 text-indigo-700'  },
  { value: 'delivered',  label: 'Delivered',  color: 'bg-green-100 text-green-700'    },
  { value: 'cancelled',  label: 'Cancelled',  color: 'bg-red-100 text-red-600'        },
]

export function getStatusStyle(status: string): string {
  return ORDER_STATUSES.find(s => s.value === status)?.color ?? 'bg-gray-100 text-gray-600'
}
