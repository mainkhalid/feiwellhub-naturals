import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Check, X, MessageCircle, ArrowLeft, Leaf, Truck, ShieldCheck } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getProduct, formatPrice } from '@/lib/api'

interface Props {
  params: { slug: string }
}

// Don't pre-fetch slugs at build time — API isn't available then.
// Pages generate on first request and are cached via ISR.
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.name,
    description: product.short_description,
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: [{ url: product.image_url, width: 600, height: 450 }],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  return (
    <>
      <Header />
      <main>
        <section className="py-16 bg-white" aria-labelledby="product-name">
          <div className="w-[min(1180px,100%-2.5rem)] mx-auto
                          grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-bark/10 bg-cream-dark">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Info */}
            <div>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs text-text-muted mb-5 flex-wrap" aria-label="Breadcrumb">
                <Link href="/products" className="hover:text-bark transition-colors">Products</Link>
                <span className="text-bark/25">/</span>
                <Link
                  href={`/products?category=${product.category_slug}`}
                  className="hover:text-bark transition-colors"
                >
                  {product.category_name}
                </Link>
                <span className="text-bark/25">/</span>
                <span aria-current="page" className="text-bark">{product.name}</span>
              </nav>

              <span className="text-[0.72rem] tracking-widest uppercase text-sage font-medium">
                {product.category_name}
              </span>
              <h1 id="product-name" className="mt-1 mb-2">{product.name}</h1>
              <p className="text-text-muted text-base mb-6">{product.short_description}</p>

              <div className="font-display text-[2rem] font-semibold text-bark mb-3">
                {formatPrice(product.price)}
              </div>

              <div className="text-sm mb-6">
                {product.stock_qty > 0 ? (
                  <span className="flex items-center gap-1.5 text-sage">
                    <Check size={15} /> In stock ({product.stock_qty} available)
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-gold">
                    <X size={15} /> Currently out of stock
                  </span>
                )}
              </div>

              <Link
                href={`/contact?inquiry=${encodeURIComponent(product.name)}`}
                className="btn btn-primary w-full justify-center mb-8"
              >
                <MessageCircle size={16} />
                Enquire About This Product
              </Link>

              {/* Description */}
              <div className="pt-6 border-t border-bark/10 mb-6">
                <h2 className="text-[1.2rem] mb-3">About this product</h2>
                <p className="text-text-muted text-sm leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Meta badges */}
              <div className="flex flex-col gap-2.5 pt-5 border-t border-bark/10">
                {[
                  { Icon: Leaf,        text: '100% organic ingredients' },
                  { Icon: Truck,       text: 'Delivery available in Nairobi' },
                  { Icon: ShieldCheck, text: 'Quality guaranteed' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-text-muted">
                    <Icon size={15} className="text-sage" /> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div className="w-[min(1180px,100%-2.5rem)] mx-auto py-8">
          <Link
            href={`/products?category=${product.category_slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-text-muted
                       hover:text-bark transition-colors duration-150"
          >
            <ArrowLeft size={14} /> Back to {product.category_name}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}