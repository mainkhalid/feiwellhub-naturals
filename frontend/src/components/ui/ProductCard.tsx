import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { formatPrice } from '@/lib/api'
import { ArrowUpRight, Star } from 'lucide-react'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100
                 hover:border-sage/30 hover:shadow-[0_12px_40px_rgba(106,140,105,0.15)]
                 transition-all duration-300 flex flex-col"
      aria-label={product.name}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`}
        className="relative block overflow-hidden bg-cream-dark"
        style={{ aspectRatio: '4/3' }}>
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_featured && (
            <span className="inline-flex items-center gap-1 bg-sage text-white
                             text-[0.68rem] font-semibold tracking-wide px-2.5 py-1 rounded-full">
              <Star size={10} fill="white" /> Featured
            </span>
          )}
          {product.stock_qty <= 5 && product.stock_qty > 0 && (
            <span className="bg-gold text-white text-[0.68rem] font-semibold
                             tracking-wide px-2.5 py-1 rounded-full">
              Low Stock
            </span>
          )}
          {product.stock_qty === 0 && (
            <span className="bg-gray-500 text-white text-[0.68rem] font-semibold
                             tracking-wide px-2.5 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-bark/40 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white text-bark text-xs font-semibold px-4 py-2 rounded-full
                           flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0
                           transition-transform duration-300">
            View Product <ArrowUpRight size={13} />
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col gap-1 flex-1">
        <span className="text-[0.7rem] font-semibold tracking-widest uppercase text-sage">
          {product.category_name}
        </span>

        <h3 className="font-display text-[1.1rem] text-bark leading-snug">
          <Link href={`/products/${product.slug}`}
            className="hover:text-sage transition-colors duration-150">
            {product.name}
          </Link>
        </h3>

        <p className="text-sm text-text-muted leading-relaxed flex-1 line-clamp-2 mt-0.5">
          {product.short_description}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4
                        border-t border-gray-100 gap-2">
          <div>
            <span className="font-display text-xl font-semibold text-bark">
              {formatPrice(product.price)}
            </span>
          </div>
          <Link
            href={`/contact?inquiry=${encodeURIComponent(product.name)}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold
                       bg-sage-pale text-sage hover:bg-sage hover:text-white
                       px-4 py-2 rounded-full transition-all duration-150"
          >
            Enquire
          </Link>
        </div>
      </div>
    </article>
  )
}