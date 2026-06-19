import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Leaf, ShieldCheck, Heart, Recycle, Star, CheckCircle } from 'lucide-react'
import {
  Shield, Zap, Bone, Wind, Pill, Brain, Dumbbell, Droplets,
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSlider from '@/components/sections/HeroSlider'
import PromoBanners from '@/components/sections/PromoBanners'
import ProductCard from '@/components/ui/ProductCard'
import { getFeaturedProducts, getCategories } from '@/lib/api'
import { SITE } from '@/assets'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: `${SITE.name} — Premium Health Supplements`,
  description:
    'Clinically-formulated supplements for nerve pain, immune support, joint health, asthma and more. Science-backed, nature-sourced. Delivered across Nairobi.',
}

// ── Map new category slugs to icons ──────────────────
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'immune-support':       Shield,
  'nerve-pain-relief':    Zap,
  'bone-joint-health':    Bone,
  'respiratory-allergy':  Wind,
  'vitamins-minerals':    Pill,
  'neurological-support': Brain,
  'muscle-movement':      Dumbbell,
  'bladder-kidney-health':Droplets,
}

const TRUST_BADGES = [
  { Icon: Leaf,        label: '100% Natural'       },
  { Icon: ShieldCheck, label: 'Clinically Studied'  },
  { Icon: Heart,       label: 'Ethically Sourced'   },
  { Icon: Recycle,     label: 'Eco-Friendly'        },
]

const WHY_ITEMS = [
  {
    Icon: Leaf,
    title: 'Therapeutic Doses',
    body:  'We use the same doses shown to work in clinical trials — not token amounts added just to put a name on the label.',
  },
  {
    Icon: ShieldCheck,
    title: 'Third-Party Tested',
    body:  'Every batch is tested for purity, potency and contaminants before it reaches you.',
  },
  {
    Icon: Heart,
    title: 'Bioavailable Forms',
    body:  'We choose the forms your body actually absorbs — methylcobalamin not cyanocobalamin, glycinate not oxide.',
  },
  {
    Icon: Recycle,
    title: 'Transparent Labelling',
    body:  'No proprietary blends. Every ingredient and its exact dose is listed clearly on the label.',
  },
]

const TESTIMONIALS = [
  {
    name:     'Grace M.',
    location: 'Nairobi',
    text:     'I had severe tingling and numbness in my feet for 2 years. After 3 months on the Alpha Lipoic Acid and B Complex, the difference is remarkable. I can sleep through the night now.',
    rating:   5,
  },
  {
    name:     'James K.',
    location: 'Westlands',
    text:     'The Glucosamine and Chondroitin has genuinely helped my knee pain. I was sceptical but after 10 weeks I can walk up stairs without pain. Will keep reordering.',
    rating:   5,
  },
  {
    name:     'Aisha O.',
    location: 'Kilimani',
    text:     'My asthma has been much more manageable since starting the Quercetin and Magnesium. Fast delivery to Nairobi too — came the same day!',
    rating:   5,
  },
]

const MARQUEE_ITEMS = [
  '⚡ Nerve Pain Relief', '🛡️ Immune Support', '🦴 Joint Health',
  '💊 Vitamin D3 & Omega-3', '🧠 Neurological Support', '💨 Asthma & Allergy',
  '💪 Muscle Strength', '💧 Bladder Control', '🌿 100% Natural',
]

const CONDITIONS = [
  { label: 'Tingling & Numbness',      href: '/products?category=nerve-pain-relief'    },
  { label: 'Burning Pain',             href: '/products?category=nerve-pain-relief'    },
  { label: 'Joint Pain & Arthritis',   href: '/products?category=bone-joint-health'    },
  { label: 'Asthma & Allergies',       href: '/products?category=respiratory-allergy'  },
  { label: 'Muscle Weakness',          href: '/products?category=muscle-movement'      },
  { label: 'Bladder Control',          href: '/products?category=bladder-kidney-health'},
  { label: 'Immune Deficiency',        href: '/products?category=immune-support'       },
  { label: 'Neurological Support',     href: '/products?category=neurological-support' },
]

export default async function HomePage() {
  let featured: any[] = []
  let categories: any[] = []
  try {
    ;[featured, categories] = await Promise.all([
      getFeaturedProducts(4),
      getCategories(),
    ])
  } catch { /* API unavailable */ }

  return (
    <>
      <Header />
      <main>
        {/* Hero Slider */}
        <HeroSlider />

        {/* Trust badges */}
        <section className="bg-white border-b border-gray-100 py-4">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TRUST_BADGES.map(({ Icon, label }) => (
                <div key={label} className="flex items-center justify-center gap-2.5 py-2">
                  <div className="w-8 h-8 rounded-full bg-sage-pale flex items-center justify-center">
                    <Icon size={15} className="text-sage" />
                  </div>
                  <span className="text-sm font-medium text-bark">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="bg-sage text-white py-3 overflow-hidden" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1, 2].flatMap(i =>
              MARQUEE_ITEMS.map(item => (
                <span key={`${i}-${item}`}
                  className="font-body text-sm font-medium tracking-wide px-8 text-white/90">
                  {item}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Shop by Condition */}
        <section className="py-14 bg-cream" aria-labelledby="conditions-heading">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <span className="section-label block mb-2">Find what you need</span>
                <h2 id="conditions-heading">Shop by Health Condition</h2>
              </div>
              <Link href="/products"
                className="text-sm font-semibold text-sage hover:text-bark
                           transition-colors flex items-center gap-1.5">
                View all products <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {CONDITIONS.map(({ label, href }) => (
                <Link key={label} href={href}
                  className="bg-white border border-gray-100 rounded-xl px-4 py-3.5
                             text-sm font-medium text-bark text-center
                             hover:border-sage/30 hover:text-sage hover:bg-sage-pale
                             transition-all duration-150">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section className="py-14 bg-white" aria-labelledby="cat-heading">
            <div className="w-[min(1280px,100%-2rem)] mx-auto">
              <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                <div>
                  <span className="section-label block mb-2">Browse by type</span>
                  <h2 id="cat-heading">Shop by Category</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat: any) => {
                  const Icon = CATEGORY_ICONS[cat.slug] ?? Pill
                  return (
                    <Link key={cat.id} href={`/products?category=${cat.slug}`}
                      className="group bg-cream border border-gray-100 rounded-2xl p-5
                                 flex flex-col gap-3 transition-all duration-200
                                 hover:border-sage/30 hover:-translate-y-1
                                 hover:shadow-[0_12px_32px_rgba(106,140,105,0.12)]">
                      <div className="w-11 h-11 bg-sage-pale rounded-xl flex items-center
                                      justify-center text-sage transition-colors
                                      group-hover:bg-sage group-hover:text-white">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-display text-[1rem] text-bark leading-snug mb-1">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                          {cat.description}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-sage flex items-center gap-1
                                       group-hover:gap-2 transition-all mt-auto">
                        Browse <ArrowRight size={11} />
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Promo Banners */}
        <PromoBanners />

        {/* Featured Products */}
        {featured.length > 0 && (
          <section className="py-14 bg-white" aria-labelledby="feat-heading">
            <div className="w-[min(1280px,100%-2rem)] mx-auto">
              <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                <div>
                  <span className="section-label block mb-2">Bestsellers</span>
                  <h2 id="feat-heading">Most Recommended Products</h2>
                </div>
                <Link href="/products"
                  className="text-sm font-semibold text-sage hover:text-bark
                             transition-colors flex items-center gap-1.5">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featured.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </section>
        )}

        {/* Why Us */}
        <section className="py-14 bg-cream-dark" aria-labelledby="why-heading">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <div className="text-center mb-10">
              <span className="section-label block mb-2">Our Standards</span>
              <h2 id="why-heading" className="mb-3">Why {SITE.name}?</h2>
              <p className="text-text-muted max-w-[520px] mx-auto text-sm">
                We formulate differently. Every product is built around clinical evidence,
                not marketing trends.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_ITEMS.map(({ Icon, title, body }) => (
                <div key={title}
                  className="bg-white rounded-2xl p-6 border border-gray-100
                             hover:border-sage/20 hover:shadow-md transition-all duration-200">
                  <div className="w-11 h-11 bg-sage-pale rounded-xl flex items-center
                                  justify-center text-sage mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-lg text-bark mb-2">{title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-14 bg-white" aria-labelledby="reviews-heading">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <div className="text-center mb-10">
              <span className="section-label block mb-2">Real Results</span>
              <h2 id="reviews-heading">What Our Customers Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map(({ name, location, text, rating }) => (
                <div key={name} className="bg-cream rounded-2xl p-6 border border-gray-100">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-gold" fill="#C4963A" />
                    ))}
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed mb-5 italic">
                    &ldquo;{text}&rdquo;
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-sage flex items-center
                                    justify-center text-white text-sm font-semibold shrink-0">
                      {name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-bark">{name}</p>
                      <p className="text-xs text-text-muted">{location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Medical disclaimer banner */}
        <section className="bg-cream-dark py-8 border-y border-gray-100">
          <div className="w-[min(1280px,100%-2rem)] mx-auto text-center">
            <p className="text-xs text-text-muted max-w-[700px] mx-auto leading-relaxed">
              <strong className="text-bark">Important:</strong> These products are food supplements,
              not medicines. They are not intended to diagnose, treat, cure or prevent any disease.
              Always consult a qualified healthcare professional before starting any supplement,
              especially if you are on medication or have a medical condition.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-sage py-12">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '22+',  label: 'Health Products'      },
                { value: '100%', label: 'Natural Ingredients'  },
                { value: '8',    label: 'Health Categories'    },
                { value: '24h',  label: 'Nairobi Delivery'     },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-display text-[2.5rem] font-semibold text-white leading-none mb-1">
                    {value}
                  </div>
                  <div className="text-sm text-white/70 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-bark py-16">
          <div className="w-[min(1280px,100%-2rem)] mx-auto
                          flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-cream text-[clamp(1.4rem,3vw,2rem)] mb-2">
                Not sure which supplement is right for you?
              </h2>
              <p className="text-cream/60 text-sm">
                Our wellness team can help you find the right product for your condition.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap shrink-0">
              <Link href="/contact"
                className="btn bg-sage text-white border-sage hover:bg-sage/90">
                Get Free Advice
              </Link>
              <a href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank" rel="noopener noreferrer"
                className="btn bg-[#25D366] text-white border-[#25D366] hover:bg-[#22c55e]">
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
