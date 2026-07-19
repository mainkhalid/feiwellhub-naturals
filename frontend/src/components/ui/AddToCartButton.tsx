'use client'

import { useState } from 'react'
import { ShoppingBag, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types'

interface Props {
  product: Product
  size?: 'sm' | 'md'
}

export default function AddToCartButton({ product, size = 'sm' }: Props) {
  const { addItem, isInCart } = useCart()
  const [added, setAdded] = useState(false)
  const inCart = isInCart(product.id)

  function handleAdd() {
    addItem({
      id:            product.id,
      name:          product.name,
      slug:          product.slug,
      price:         product.price,
      image_url:     product.image_url,
      category_name: product.category_name ?? '',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (product.stock_qty === 0) {
    return (
      <span className="text-xs text-text-muted font-medium px-3 py-1.5
                       bg-gray-100 rounded-full">
        Out of Stock
      </span>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full
        transition-all duration-200
        ${size === 'sm'
          ? 'text-xs px-3.5 py-2'
          : 'text-sm px-5 py-2.5'}
        ${added
          ? 'bg-sage text-white'
          : inCart
          ? 'bg-sage-pale text-sage hover:bg-sage hover:text-white'
          : 'bg-bark text-cream hover:bg-bark-mid'
        }`}
      aria-label={`Add ${product.name} to cart`}
    >
      {added ? (
        <><Check size={13} /> Added!</>
      ) : inCart ? (
        <><ShoppingBag size={13} /> In Cart</>
      ) : (
        <><ShoppingBag size={13} /> Add to Cart</>
      )}
    </button>
  )
}
