'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface CartItem {
  id:                number
  name:              string
  slug:              string
  price:             number
  image_url:         string
  category_name:     string
  quantity:          number
}

interface CartContextType {
  items:       CartItem[]
  count:       number
  total:       number
  isOpen:      boolean
  openCart:    () => void
  closeCart:   () => void
  toggleCart:  () => void
  addItem:     (product: Omit<CartItem, 'quantity'>) => void
  removeItem:  (id: number) => void
  updateQty:   (id: number, quantity: number) => void
  clearCart:   () => void
  isInCart:    (id: number) => boolean
}

const CartContext = createContext<CartContextType | null>(null)

const CART_KEY = 'feiwellhub_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items,  setItems]  = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch {}
    setHydrated(true)
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items))
    } catch {}
  }, [items, hydrated])

  const count = items.reduce((sum, i) => sum + i.quantity, 0)
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const openCart   = useCallback(() => setIsOpen(true),  [])
  const closeCart  = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen(o => !o), [])

  const addItem = useCallback((product: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsOpen(true) // open drawer when item added
  }, [])

  const removeItem = useCallback((id: number) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQty = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.id !== id))
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
    }
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const isInCart = useCallback((id: number) => items.some(i => i.id === id), [items])

  return (
    <CartContext.Provider value={{
      items, count, total, isOpen,
      openCart, closeCart, toggleCart,
      addItem, removeItem, updateQty, clearCart, isInCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
