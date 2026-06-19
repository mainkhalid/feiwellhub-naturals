import type { Metadata } from 'next'
import Link from 'next/link'
import { RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE } from '@/assets'

export const metadata: Metadata = {
  title: 'Return Policy',
  description: `Returns, refunds and exchange policy for ${SITE.name}.`,
}

export default function ReturnPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-white border-b border-gray-100 py-14">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <span className="section-label block mb-2">Policies</span>
            <h1 className="text-bark">Return & Refund Policy</h1>
            <p className="text-text-muted text-sm mt-2">Last updated: January 2025</p>
          </div>
        </section>

        <section className="py-14">
          <div className="w-[min(1280px,100%-2rem)] mx-auto max-w-[800px]">

            {/* Quick summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {[
                { Icon: RefreshCw, label: 'Return Window', value: '48 hours from delivery' },
                { Icon: Clock,     label: 'Refund Time',   value: 'Within 24 hours (M-Pesa)' },
                { Icon: CheckCircle, label: 'Our Promise', value: 'Hassle-free for defects' },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="bg-cream rounded-2xl p-5 border border-gray-100 text-center">
                  <div className="w-10 h-10 bg-sage-pale rounded-xl flex items-center justify-center
                                  text-sage mx-auto mb-3">
                    <Icon size={18} />
                  </div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-text-muted mb-1">{label}</p>
                  <p className="text-sm font-medium text-bark">{value}</p>
                </div>
              ))}
            </div>

            <div className="prose prose-sm max-w-none text-text-muted leading-relaxed
                            [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-bark [&_h2]:mt-10 [&_h2]:mb-4
                            [&_h3]:font-semibold [&_h3]:text-bark [&_h3]:mt-6 [&_h3]:mb-2
                            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5
                            [&_p]:mb-4 [&_strong]:text-bark [&_strong]:font-semibold">

              <h2>Our Return Policy</h2>
              <p>We want you to be completely happy with your {SITE.name} purchase. If something isn't right, we'll do our best to make it right.</p>

              <h2>What We Accept Returns For</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
                <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={16} className="text-green-600" />
                    <h3 className="font-semibold text-green-700 text-sm">Eligible for Return</h3>
                  </div>
                  <ul className="text-sm text-green-700 flex flex-col gap-1.5 list-disc pl-4">
                    <li>Damaged or defective products</li>
                    <li>Incorrect item received</li>
                    <li>Product significantly different from description</li>
                    <li>Tampered or compromised packaging</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle size={16} className="text-red-500" />
                    <h3 className="font-semibold text-red-700 text-sm">Not Eligible</h3>
                  </div>
                  <ul className="text-sm text-red-700 flex flex-col gap-1.5 list-disc pl-4">
                    <li>Opened products (unless defective)</li>
                    <li>Change of mind after purchase</li>
                    <li>Products reported after 48 hours</li>
                    <li>Products not purchased from us</li>
                  </ul>
                </div>
              </div>

              <h2>How to Request a Return</h2>
              <ul>
                <li>Contact us within <strong>48 hours</strong> of receiving your order</li>
                <li>Send a WhatsApp message to <a href={`https://wa.me/${SITE.whatsapp}`} className="text-sage hover:underline">{SITE.phone}</a> with your order number</li>
                <li>Include a photo of the product showing the issue</li>
                <li>We'll respond within 2 hours during business hours</li>
              </ul>

              <h2>Refunds</h2>
              <p>Once your return is approved:</p>
              <ul>
                <li><strong>M-Pesa refunds</strong> are processed within 24 hours</li>
                <li><strong>Bank transfer refunds</strong> take 2–3 business days</li>
                <li>Delivery fees are refunded if the error was on our side</li>
              </ul>

              <h2>Exchanges</h2>
              <p>We're happy to exchange a defective or incorrect product for the same item. If the item is out of stock, we'll offer a full refund or credit towards another product.</p>

              <h2>Contact Us</h2>
              <p>
                For any return or refund queries, reach us on{' '}
                <a href={`tel:${SITE.phone}`} className="text-sage hover:underline">{SITE.phone}</a>{' '}
                or <Link href="/contact" className="text-sage hover:underline">fill in our contact form</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
