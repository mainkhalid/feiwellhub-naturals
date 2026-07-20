import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, Leaf, Truck, ShieldCheck, Check, X } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TrustBadges from '@/components/sections/TrustBadges'
import AddToCartButton from '@/components/ui/AddToCartButton'
import { getProduct, formatPrice } from '@/lib/api'

export const revalidate = 86400 
interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() { return [] }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
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
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  return (
    <>
      <Header />
      <main>
        <section className="py-14 bg-white">
          <div className="w-[min(1280px,100%-2rem)] mx-auto
                          grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden
                            border border-gray-100 bg-cream-dark">
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
              <nav className="flex items-center gap-2 text-xs text-text-muted mb-5 flex-wrap"
                   aria-label="Breadcrumb">
                <Link href="/products" className="hover:text-sage transition-colors">Products</Link>
                <span className="text-bark/25">/</span>
                <Link href={`/products?category=${product.category_slug}`}
                  className="hover:text-sage transition-colors">{product.category_name}</Link>
                <span className="text-bark/25">/</span>
                <span aria-current="page" className="text-bark">{product.name}</span>
              </nav>

              <span className="text-[0.72rem] tracking-widest uppercase text-sage font-semibold">
                {product.category_name}
              </span>
              <h1 className="mt-1 mb-3">{product.name}</h1>
              <p className="text-text-muted mb-6 leading-relaxed">{product.short_description}</p>

              {/* Price */}
              <div className="font-display text-[2rem] font-semibold text-bark mb-2">
                {formatPrice(product.price)}
              </div>

              {/* Stock */}
              <div className="text-sm mb-6">
                {product.stock_qty > 0 ? (
                  <span className="flex items-center gap-1.5 text-sage">
                    <Check size={15} /> In stock ({product.stock_qty} available)
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-red-500">
                    <X size={15} /> Currently out of stock
                  </span>
                )}
              </div>

              {/* Add to Cart + WhatsApp enquire */}
              <div className="flex gap-3 flex-wrap mb-8">
                <AddToCartButton product={product} size="md" />
                <Link
                  href={`/contact?inquiry=${encodeURIComponent(product.name)}`}
                  className="btn btn-ghost">
                  Enquire
                </Link>
              </div>

              {/* Trust inline badges */}
              <div className="mb-6">
                <TrustBadges variant="inline" />
              </div>

              {/* Description */}
              <div className="pt-6 border-t border-gray-100 mb-6">
                <h2 className="font-display text-xl text-bark mb-3">About this product</h2>
                <p className="text-text-muted text-sm leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Meta badges */}
              <div className="flex flex-col gap-2.5 pt-5 border-t border-gray-100">
                {[
                  { Icon: Leaf,        text: '100% natural ingredients — no synthetic fillers' },
                  { Icon: Truck,       text: 'Same-day delivery available in Nairobi'          },
                  { Icon: ShieldCheck, text: 'KEBS certified — quality guaranteed'              },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-text-muted">
                    <Icon size={15} className="text-sage shrink-0" /> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div className="w-[min(1280px,100%-2rem)] mx-auto py-6">
          <Link href={`/products?category=${product.category_slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-text-muted
                       hover:text-bark transition-colors duration-150">
            <ArrowLeft size={14} /> Back to {product.category_name}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
