import type { Metadata } from 'next'
import Link from 'next/link'
import { Leaf, ArrowRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE } from '@/assets'

export const metadata: Metadata = {
  title: 'Our Story',
  description: `How ${SITE.name} began — a personal journey into natural wellness.`,
}

const TIMELINE = [
  {
    year: '2019',
    title: 'The Problem',
    body: 'Our founder, struggling with chronic fatigue and poor gut health, searched for quality natural supplements in Nairobi. What she found was either overpriced imports or low-quality products with no transparency about ingredients.',
  },
  {
    year: '2020',
    title: 'The Research',
    body: 'Months of studying herbal medicine, ethnobotany and nutritional science. Connecting with small farms in Kenya and the wider East Africa region. Learning that the best ingredients were often growing right here — just not being used properly.',
  },
  {
    year: '2021',
    title: 'The First Formulas',
    body: 'Starting small — moringa capsules and a chamomile sleep tea, made in a certified kitchen, shared with friends and family. The results spoke for themselves. Word spread.',
  },
  {
    year: '2022',
    title: 'Faiwellhub is Born',
    body: `${SITE.name} officially launched with 12 products. Within the first three months, we had customers across Nairobi, Mombasa and Nakuru. The demand for honest, affordable natural supplements was clearly there.`,
  },
  {
    year: '2023',
    title: 'Growing the Range',
    body: 'Expanded to 30+ products across food supplements, herbal teas, essential oils and skincare. Partnered with certified organic farms. Introduced third-party testing for every batch.',
  },
  {
    year: '2024+',
    title: 'The Mission Continues',
    body: 'Now with 50+ products and hundreds of loyal customers, we continue to do what we\'ve always done — formulate honestly, source responsibly, and respond to every message within 24 hours.',
  },
]

export default function OurStoryPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-cream-dark py-20 border-b border-gray-100">
          <div className="w-[min(1280px,100%-2rem)] mx-auto max-w-[780px]">
            <span className="section-label block mb-3">How it started</span>
            <h1 className="text-bark mb-5">Our Story</h1>
            <p className="text-text-muted text-lg leading-relaxed font-light">
              Every great product starts with a personal problem. Ours started with a founder
              who couldn't find what she needed — so she made it herself.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-white">
          <div className="w-[min(1280px,100%-2rem)] mx-auto max-w-[780px]">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[52px] top-0 bottom-0 w-px bg-gray-100 hidden sm:block"
                   aria-hidden="true" />

              <div className="flex flex-col gap-12">
                {TIMELINE.map(({ year, title, body }) => (
                  <div key={year} className="flex gap-6 sm:gap-10 items-start">
                    {/* Year badge */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-[104px] h-10 bg-sage-pale border border-sage-light
                                      rounded-full flex items-center justify-center relative z-10">
                        <span className="text-sm font-bold text-sage">{year}</span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 pt-1.5">
                      <h3 className="font-display text-xl text-bark mb-2">{title}</h3>
                      <p className="text-text-muted leading-relaxed text-sm">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="bg-sage py-16">
          <div className="w-[min(1280px,100%-2rem)] mx-auto text-center max-w-[680px]">
            <Leaf size={28} className="text-white/50 mx-auto mb-5" />
            <blockquote className="font-display text-2xl text-white leading-snug mb-5 italic">
              "I didn't start Faiwellhub to build a business. I started it because I needed
              something that didn't exist — and I believed other people needed it too."
            </blockquote>
            <cite className="text-white/60 text-sm not-italic">— Faiwellhub Founder</cite>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="w-[min(1280px,100%-2rem)] mx-auto text-center">
            <h2 className="text-bark mb-3">Be part of the story</h2>
            <p className="text-text-muted mb-8 max-w-[480px] mx-auto">
              Join hundreds of Kenyans who have made natural wellness part of their daily routine.
            </p>
            <Link href="/products"
              className="btn btn-primary inline-flex items-center gap-2">
              Shop Our Products <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
