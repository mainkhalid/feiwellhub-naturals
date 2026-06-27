import type { Metadata } from 'next'
import Link from 'next/link'
import { SearchX } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/ui/ProductCard'
import { getProducts, getCategories } from '@/lib/api'
import { Category, Product } from '@/types'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{ category?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams
  const categories = await getCategories()
  const active = categories.find((c: Category) => c.slug === resolvedParams.category)
  return {
    title: active ? active.name : 'All Products',
    description: 'Browse our full range of premium food supplements, herbal teas, essential oils and natural skincare.',
  }
}

export default async function ProductsPage({ searchParams }: Props) {
  const resolvedParams = await searchParams
  let categories: Category[] = []
  let products: Product[]    = []

  try {
  ;[categories, products] = await Promise.all([
    getCategories(),
    getProducts(resolvedParams.category),
  ])
} catch (error) {
  console.error('[ProductsPage]', error)
  throw error
}
  const activeCategory = categories.find(c => c.slug === resolvedParams.category)
  const pageTitle      = activeCategory?.name ?? 'All Products'

  return (
    <>
      <Header />
      <main>
        {/* Page hero */}
        <section className="bg-white border-b border-gray-100 py-14 pb-10"
                 aria-labelledby="page-heading">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <span className="section-label block mb-2">Our collection</span>
            <h1 id="page-heading">{pageTitle}</h1>
            <p className="text-text-muted text-sm mt-2">
              {products.length} product{products.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </section>

        {/* Layout */}
        <section className="py-14">
          <div className="w-[min(1280px,100%-2rem)] mx-auto
                          grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 items-start">

            {/* Sidebar */}
            <aside aria-label="Filter by category">
              <h3 className="text-[0.72rem] font-semibold tracking-widest uppercase
                             text-text-muted mb-4">
                Categories
              </h3>
              <nav className="flex flex-col gap-1">
                <Link href="/products"
                  className={`filter-link ${!resolvedParams.category ? 'active' : ''}`}>
                  All Products
                </Link>
                {categories.map(cat => (
                  <Link key={cat.id}
                    href={`/products?category=${cat.slug}`}
                    className={`filter-link ${resolvedParams.category === cat.slug ? 'active' : ''}`}>
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Grid */}
            <div>
              {products.length === 0 ? (
                <div className="text-center py-24 text-text-muted" role="status">
                  <SearchX size={40} className="mx-auto mb-4 opacity-40" />
                  <p className="mb-6 text-sm">No products found in this category yet.</p>
                  <Link href="/products" className="btn btn-outline">View All</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
