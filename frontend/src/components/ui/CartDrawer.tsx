'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/api'
import { SITE } from '@/assets'

export default function CartDrawer() {
  const { items, count, total, isOpen, closeCart, removeItem, updateQty, clearCart } = useCart()
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [closeCart])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  function buildWhatsAppMessage(address?: string): string {
    const lines = items.map(i =>
      `• ${i.name} x${i.quantity} — ${formatPrice(i.price * i.quantity)}`
    )
    const msg = [
      `Hi ${SITE.name}! I'd like to place an order:`,
      '',
      ...lines,
      '',
      `*Total: ${formatPrice(total)}*`,
      address ? `Delivery to: ${address}` : '',
      '',
      'Please confirm availability and delivery details. Thank you! 🌿',
    ].filter(l => l !== undefined).join('\n')

    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`
  }

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50
          flex flex-col shadow-[−20px_0_60px_rgba(0,0,0,0.15)]
          transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4
                        border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="text-sage" />
            <h2 className="font-display text-lg text-bark">Your Cart</h2>
            {count > 0 && (
              <span className="bg-sage text-white text-xs font-bold
                               w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          <button onClick={closeCart} aria-label="Close cart"
            className="p-2 rounded-lg text-text-muted hover:text-bark
                       hover:bg-gray-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 bg-sage-pale rounded-full flex items-center
                              justify-center">
                <ShoppingBag size={28} className="text-sage" />
              </div>
              <div>
                <p className="font-display text-lg text-bark mb-1">Your cart is empty</p>
                <p className="text-sm text-text-muted">
                  Browse our supplements and add items to your cart.
                </p>
              </div>
              <button onClick={closeCart}
                className="btn btn-outline btn-sm mt-2">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.id}
                  className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                  {/* Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-cream-dark shrink-0">
                    {item.image_url && (
                      <Image src={item.image_url} alt={item.name}
                        width={64} height={64}
                        className="object-cover w-full h-full" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.7rem] font-semibold tracking-widest uppercase
                                  text-sage mb-0.5">{item.category_name}</p>
                    <p className="text-sm font-medium text-bark leading-snug line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-sm font-semibold text-bark mt-1">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  {/* Qty + remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button onClick={() => removeItem(item.id)}
                      className="p-1 text-text-muted hover:text-red-500 transition-colors"
                      aria-label={`Remove ${item.name}`}>
                      <Trash2 size={14} />
                    </button>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-gray-200
                                   flex items-center justify-center text-text-muted
                                   hover:border-sage hover:text-sage transition-colors"
                        aria-label="Decrease quantity">
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-semibold text-bark w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-gray-200
                                   flex items-center justify-center text-text-muted
                                   hover:border-sage hover:text-sage transition-colors"
                        aria-label="Increase quantity">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — summary + WhatsApp CTA */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-5 shrink-0 bg-white">
            {/* Totals */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex justify-between text-sm text-text-muted">
                <span>{count} item{count !== 1 ? 's' : ''}</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-text-muted">
                <span>Delivery</span>
                <span className="text-sage font-medium">
                  {total >= 2000 ? 'Free' : 'Ksh 200 (confirm on WhatsApp)'}
                </span>
              </div>
              <div className="flex justify-between font-display text-xl text-bark
                              border-t border-gray-100 pt-2 mt-1">
                <span>Total</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Free delivery notice */}
            {total < 2000 && (
              <div className="bg-sage-pale rounded-xl px-3 py-2 mb-4 text-xs text-sage
                              font-medium text-center">
                Add {formatPrice(2000 - total)} more for free delivery 🌿
              </div>
            )}

            {/* WhatsApp Order button */}
            <a
              href={buildWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full
                         bg-[#25D366] text-white font-semibold py-3.5 rounded-xl
                         hover:bg-[#22c55e] transition-colors text-sm"
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order via WhatsApp
            </a>

            <button onClick={clearCart}
              className="w-full text-xs text-text-muted hover:text-red-500
                         transition-colors mt-3 py-1">
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}
