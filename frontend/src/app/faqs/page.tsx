'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE } from '@/assets'

const FAQS = [
  {
    category: 'Products & Quality',
    questions: [
      {
        q: 'Are your products 100% natural?',
        a: 'Yes. Every product at Feiwellhub Naturals is formulated with whole, natural ingredients. We use no synthetic fillers, binders, artificial colours or flavours. What you see on the label is what\'s in the bottle.',
      },
      {
        q: 'Are your supplements third-party tested?',
        a: 'Yes. Every batch is tested for purity and potency before it leaves our facility. We test for heavy metals, contaminants and to confirm active ingredient concentrations match what\'s on the label.',
      },
      {
        q: 'Are your products suitable for vegetarians/vegans?',
        a: 'Most of our capsule products use plant-based (HPMC) capsules and are suitable for vegans. Our collagen products are marine-sourced and not vegan. Each product page clearly states suitability.',
      },
      {
        q: 'How do I know which product is right for me?',
        a: `Send us a WhatsApp message on ${SITE.phone} or fill in our contact form. Our wellness team will recommend the most suitable products based on your health goals.`,
      },
    ],
  },
  {
    category: 'Orders & Delivery',
    questions: [
      {
        q: 'How do I place an order?',
        a: `Currently, orders are placed via WhatsApp on ${SITE.phone}. Send us a message with the products you want, your delivery address and phone number. We\'ll confirm availability and total cost.`,
      },
      {
        q: 'What areas do you deliver to?',
        a: 'We offer same-day delivery across Nairobi including Westlands, Kilimani, Karen, Kasarani, Embakasi, Nairobi CBD and surrounding areas. For outside Nairobi, we use courier services (1-3 business days).',
      },
      {
        q: 'How much does delivery cost?',
        a: `Delivery within Nairobi is Ksh 200. Orders above Ksh 2,000 qualify for free delivery. We\'ll confirm the delivery fee when you place your order.`,
      },
      {
        q: 'How long does delivery take?',
        a: 'Same-day delivery is available for orders placed before 2pm for most Nairobi areas. Orders placed after 2pm are delivered the following business day. We\'ll confirm your delivery time when you order.',
      },
      {
        q: 'Can I pick up my order?',
        a: `Yes! Contact us on WhatsApp to arrange a pick-up from our Nairobi location. We\'ll confirm the address and availability.`,
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What if I receive a damaged or incorrect product?',
        a: 'Contact us within 48 hours of delivery via WhatsApp with a photo of the product. We\'ll arrange a replacement or full refund — no questions asked.',
      },
      {
        q: 'Can I return a product I\'ve already opened?',
        a: 'For health and safety reasons, we cannot accept returns of opened products unless they are defective. Please contact us if you have concerns about a product before opening it.',
      },
      {
        q: 'How long does a refund take?',
        a: 'Once a return is approved, refunds via M-Pesa are processed within 24 hours. Bank transfers may take 2-3 business days.',
      },
    ],
  },
  {
    category: 'Payments',
    questions: [
      {
        q: 'How do I pay for my order?',
        a: 'We accept M-Pesa (most common), bank transfer and cash on delivery for Nairobi orders. M-Pesa payment details are shared when you confirm your order on WhatsApp.',
      },
      {
        q: 'Is it safe to pay via M-Pesa?',
        a: 'Yes. M-Pesa is a secure mobile payment platform. We\'ll send you our official business till number or personal number. You\'ll receive an M-Pesa confirmation SMS for every payment.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full py-4 text-left gap-4"
        aria-expanded={open}
      >
        <span className={`text-sm font-medium transition-colors ${open ? 'text-sage' : 'text-bark'}`}>
          {q}
        </span>
        <ChevronDown size={16}
          className={`text-text-muted shrink-0 transition-transform duration-200
            ${open ? 'rotate-180 text-sage' : ''}`} />
      </button>
      {open && (
        <div className="pb-4 pr-8">
          <p className="text-sm text-text-muted leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-white border-b border-gray-100 py-14">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <span className="section-label block mb-2">Help Centre</span>
            <h1 className="text-bark">Frequently Asked Questions</h1>
            <p className="text-text-muted text-sm mt-2 max-w-[500px]">
              Can't find what you're looking for?{' '}
              <Link href="/contact" className="text-sage hover:underline">Contact us</Link>
              {' '}— we respond within 24 hours.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="w-[min(1280px,100%-2rem)] mx-auto
                          grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 items-start">
            {/* Sidebar nav */}
            <nav className="sticky top-24 hidden lg:flex flex-col gap-1">
              {FAQS.map(({ category }) => (
                <a key={category}
                  href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm text-text-muted hover:text-sage px-3 py-2 rounded-lg
                             hover:bg-sage-pale transition-colors">
                  {category}
                </a>
              ))}
            </nav>

            {/* Questions */}
            <div className="flex flex-col gap-10">
              {FAQS.map(({ category, questions }) => (
                <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
                  <h2 className="font-display text-xl text-bark mb-4 pb-3
                                 border-b-2 border-sage-light">{category}</h2>
                  <div>
                    {questions.map(({ q, a }) => (
                      <FAQItem key={q} q={q} a={a} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still need help */}
        <section className="bg-cream py-14">
          <div className="w-[min(1280px,100%-2rem)] mx-auto text-center">
            <h2 className="text-bark mb-3">Still have questions?</h2>
            <p className="text-text-muted mb-6 text-sm">Our team is happy to help.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/contact" className="btn btn-primary">Send us a Message</Link>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer"
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
