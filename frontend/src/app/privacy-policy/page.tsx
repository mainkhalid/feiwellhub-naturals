import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE } from '@/assets'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${SITE.name} collects, uses and protects your personal data.`,
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-white border-b border-gray-100 py-14">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <span className="section-label block mb-2">Legal</span>
            <h1 className="text-bark">Privacy Policy</h1>
            <p className="text-text-muted text-sm mt-2">Last updated: January 2025</p>
          </div>
        </section>

        <section className="py-14">
          <div className="w-[min(1280px,100%-2rem)] mx-auto max-w-[800px]">

            {/* Intro card */}
            <div className="bg-sage-pale border border-sage-light rounded-2xl p-6 flex gap-4 mb-10">
              <Shield size={22} className="text-sage shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-bark mb-1">Your privacy matters to us</p>
                <p className="text-sm text-text-muted leading-relaxed">
                  {SITE.name} collects only the information necessary to process your orders and
                  improve your experience. We never sell your data to third parties.
                </p>
              </div>
            </div>

            <div className="prose prose-sm max-w-none text-text-muted leading-relaxed
                            [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-bark [&_h2]:mt-10 [&_h2]:mb-4
                            [&_h3]:font-semibold [&_h3]:text-bark [&_h3]:mt-6 [&_h3]:mb-2
                            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5
                            [&_p]:mb-4 [&_strong]:text-bark [&_strong]:font-semibold">

              <h2>1. Who We Are</h2>
              <p>
                {SITE.name} is a natural wellness company based in {SITE.location}.
                For privacy-related queries, contact us at{' '}
                <a href={`mailto:${SITE.email}`} className="text-sage hover:underline">{SITE.email}</a>.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>Information you provide directly</h3>
              <ul>
                <li>Name, phone number and email address when placing an order or contacting us</li>
                <li>Delivery address for order fulfilment</li>
                <li>Messages and enquiries submitted via our contact form or WhatsApp</li>
              </ul>

              <h3>Information collected automatically</h3>
              <ul>
                <li>Browser type and device information when you visit our website</li>
                <li>Pages visited and time spent on the site (via anonymous analytics)</li>
                <li>IP address for security and fraud prevention</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <ul>
                <li>To process and fulfil your orders</li>
                <li>To communicate with you about your order status</li>
                <li>To respond to enquiries and provide customer support</li>
                <li>To send occasional product updates (only if you opt in)</li>
                <li>To improve our website and product offerings</li>
                <li>To comply with legal obligations</li>
              </ul>

              <h2>4. Who We Share Your Data With</h2>
              <p>We do not sell your personal data. We may share limited information with:</p>
              <ul>
                <li><strong>Delivery partners</strong> — your name, phone and address for order delivery</li>
                <li><strong>Payment processors</strong> — M-Pesa/bank details are handled by Safaricom/your bank, not stored by us</li>
                <li><strong>Legal authorities</strong> — if required by Kenyan law</li>
              </ul>

              <h2>5. Data Retention</h2>
              <p>
                We retain order and contact information for up to <strong>3 years</strong> for record-keeping
                purposes, or longer if required by law. You may request deletion of your data at any time
                (subject to legal retention requirements).
              </p>

              <h2>6. Your Rights</h2>
              <p>Under applicable Kenyan data protection law, you have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Lodge a complaint with the Office of the Data Protection Commissioner (Kenya)</li>
              </ul>

              <h2>7. Cookies</h2>
              <p>
                Our website uses minimal cookies — only those necessary for the site to function correctly.
                We do not use third-party advertising cookies.
              </p>

              <h2>8. Security</h2>
              <p>
                We use HTTPS encryption on all pages and follow security best practices to protect your data.
                However, no method of transmission over the internet is 100% secure.
              </p>

              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this policy from time to time. The date at the top of this page reflects the
                most recent update. Continued use of our website after changes constitutes acceptance.
              </p>

              <h2>10. Contact Us</h2>
              <p>
                For any privacy-related questions or to exercise your rights, contact us at{' '}
                <a href={`mailto:${SITE.email}`} className="text-sage hover:underline">{SITE.email}</a>{' '}
                or via our <Link href="/contact" className="text-sage hover:underline">contact form</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
