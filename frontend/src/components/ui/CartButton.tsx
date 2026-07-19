'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartButton() {
  const { count, toggleCart } = useCart()

  return (
    <button
      onClick={toggleCart}
      aria-label={`Shopping cart${count > 0 ? ` — ${count} items` : ''}`}
      className="relative p-2 rounded-lg text-bark hover:bg-sage-pale
                 hover:text-sage transition-colors duration-150"
    >
      <ShoppingBag size={20} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-sage text-white
                         text-[0.6rem] font-bold rounded-full flex items-center
                         justify-center animate-fade-up">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  )
}
