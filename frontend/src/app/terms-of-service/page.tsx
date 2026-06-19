import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE } from '@/assets'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms and conditions for using ${SITE.name} website and services.`,
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-white border-b border-gray-100 py-14">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <span className="section-label block mb-2">Legal</span>
            <h1 className="text-bark">Terms of Service</h1>
            <p className="text-text-muted text-sm mt-2">Last updated: January 2025</p>
          </div>
        </section>

        <section className="py-14">
          <div className="w-[min(1280px,100%-2rem)] mx-auto max-w-[800px]">

            <div className="bg-cream border border-gray-100 rounded-2xl p-6 flex gap-4 mb-10">
              <FileText size={22} className="text-sage shrink-0 mt-0.5" />
              <p className="text-sm text-text-muted leading-relaxed">
                By using our website or placing an order with {SITE.name}, you agree to these terms.
                Please read them carefully. If you have questions,{' '}
                <Link href="/contact" className="text-sage hover:underline">contact us</Link>{' '}
                before purchasing.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {[
                {
                  num: '1', title: 'About These Terms',
                  content: (
                    <p>These Terms of Service govern your use of the {SITE.name} website and your purchase of products from us. {SITE.name} is a natural wellness business registered and operating in Nairobi, Kenya.</p>
                  ),
                },
                {
                  num: '2', title: 'Products & Health Disclaimer',
                  content: (
                    <>
                      <p className="mb-3">Our products are food supplements and natural wellness products. They are <strong className="text-bark font-semibold">not medicines</strong> and are not intended to diagnose, treat, cure or prevent any disease.</p>
                      <ul className="list-disc pl-5 flex flex-col gap-1.5 text-sm">
                        <li>Consult a qualified healthcare professional before starting any supplement</li>
                        <li>Results vary — we make no guarantees of specific outcomes</li>
                        <li>If pregnant, breastfeeding or on medication, consult your doctor first</li>
                        <li>Keep all products out of reach of children</li>
                        <li>Discontinue use if you experience any adverse reaction</li>
                      </ul>
                    </>
                  ),
                },
                {
                  num: '3', title: 'Placing an Order',
                  content: <p>Orders are placed via WhatsApp or our contact form. An order is confirmed only when you receive written confirmation from us and payment has been received. We reserve the right to decline any order.</p>,
                },
                {
                  num: '4', title: 'Pricing & Payment',
                  content: (
                    <ul className="list-disc pl-5 flex flex-col gap-1.5 text-sm">
                      <li>All prices are in Kenyan Shillings (Ksh)</li>
                      <li>Prices may change without notice — the price at time of order confirmation applies</li>
                      <li>Payment is due before dispatch for new customers</li>
                      <li>Accepted methods: M-Pesa, bank transfer, cash on delivery (Nairobi only)</li>
                    </ul>
                  ),
                },
                {
                  num: '5', title: 'Delivery',
                  content: <p>Please refer to our <Link href="/shipping-policy" className="text-sage hover:underline">Shipping Policy</Link> for full delivery terms, areas and timelines.</p>,
                },
                {
                  num: '6', title: 'Returns & Refunds',
                  content: <p>Please refer to our <Link href="/return-policy" className="text-sage hover:underline">Return & Refund Policy</Link> for full terms.</p>,
                },
                {
                  num: '7', title: 'Intellectual Property',
                  content: <p>All content on this website — including text, images, logos and product descriptions — is the property of {SITE.name}. You may not reproduce or distribute our content without prior written permission.</p>,
                },
                {
                  num: '8', title: 'Limitation of Liability',
                  content: <p>To the maximum extent permitted by Kenyan law, {SITE.name} shall not be liable for any indirect, incidental or consequential damages arising from the use of our products or website. Our liability is limited to the value of the order in question.</p>,
                },
                {
                  num: '9', title: 'Website Use',
                  content: (
                    <ul className="list-disc pl-5 flex flex-col gap-1.5 text-sm">
                      <li>You must be at least 18 years old to purchase from us</li>
                      <li>You agree not to misuse this website or attempt to gain unauthorised access</li>
                      <li>We reserve the right to restrict access to anyone who violates these terms</li>
                    </ul>
                  ),
                },
                {
                  num: '10', title: 'Governing Law',
                  content: <p>These terms are governed by the laws of Kenya. Any disputes shall be resolved under Kenyan jurisdiction.</p>,
                },
                {
                  num: '11', title: 'Changes to These Terms',
                  content: <p>We may update these terms at any time. The date at the top of this page shows the last update. Continued use of our website after changes constitutes acceptance.</p>,
                },
                {
                  num: '12', title: 'Contact',
                  content: (
                    <p>Questions about these terms? Email us at{' '}
                      <a href={`mailto:${SITE.email}`} className="text-sage hover:underline">{SITE.email}</a>{' '}
                      or <Link href="/contact" className="text-sage hover:underline">send a message</Link>.
                    </p>
                  ),
                },
              ].map(({ num, title, content }) => (
                <div key={num} className="flex gap-5 items-start">
                  <div className="w-8 h-8 bg-sage-pale rounded-lg flex items-center justify-center
                                  text-sage text-sm font-bold shrink-0 mt-0.5">
                    {num}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-xl text-bark mb-3">{title}</h2>
                    <div className="text-sm text-text-muted leading-relaxed">{content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
