import type { Metadata } from 'next'
import Link from 'next/link'
import { Truck, Clock, MapPin, AlertCircle } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE } from '@/assets'

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: `Delivery information, zones, fees and timelines for ${SITE.name} orders.`,
}

export default function ShippingPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-white border-b border-gray-100 py-14">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <span className="section-label block mb-2">Policies</span>
            <h1 className="text-bark">Shipping & Delivery Policy</h1>
            <p className="text-text-muted text-sm mt-2">Last updated: January 2025</p>
          </div>
        </section>

        <section className="py-14">
          <div className="w-[min(1280px,100%-2rem)] mx-auto max-w-[800px]">

            {/* Quick info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {[
                { Icon: Truck,  label: 'Delivery Fee', value: 'Ksh 200 (free above Ksh 2,000)' },
                { Icon: Clock,  label: 'Same-Day',     value: 'Orders before 2pm, Mon–Sat' },
                { Icon: MapPin, label: 'Coverage',     value: 'Nairobi + nationwide courier' },
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

              <h2>Delivery Areas & Fees</h2>

              <h3>Nairobi (Same-Day Delivery)</h3>
              <p>We offer same-day delivery to the following Nairobi areas for orders placed before 2:00pm Monday to Saturday:</p>
              <ul>
                <li>Nairobi CBD & surrounding areas</li>
                <li>Westlands, Parklands, Riverside</li>
                <li>Kilimani, Lavington, Hurlingham</li>
                <li>Karen, Langata, Rongai</li>
                <li>Kasarani, Roysambu, Thika Road</li>
                <li>Embakasi, South B, South C</li>
                <li>Eastlands (Buruburu, Donholm, Umoja)</li>
              </ul>
              <p><strong>Delivery fee:</strong> Ksh 200 flat rate. <strong>Free delivery</strong> on orders above Ksh 2,000.</p>

              <h3>Outside Nairobi (Courier Delivery)</h3>
              <p>For orders outside Nairobi, we use trusted courier partners (G4S, Well Fargo, DHL). Delivery timelines:</p>
              <ul>
                <li>Major towns (Mombasa, Kisumu, Nakuru, Eldoret): 1–2 business days</li>
                <li>Other towns: 2–4 business days</li>
              </ul>
              <p><strong>Courier fee:</strong> Calculated based on destination and package weight. We'll confirm the fee before you pay.</p>

              <h2>Order Processing</h2>
              <p>Orders placed via WhatsApp are processed within 1–2 hours during business hours. You'll receive a confirmation message with your order details and delivery timeline.</p>
              <p><strong>Business hours:</strong> {SITE.location} — Monday to Friday 8am–6pm, Saturday 9am–4pm.</p>

              <h2>Failed Delivery</h2>
              <p>If a delivery attempt fails because you are unavailable, our rider will contact you to reschedule. A redelivery fee may apply for subsequent attempts.</p>

              <h2>Tracking Your Order</h2>
              <p>Our rider will contact you directly via phone/WhatsApp when they are on the way. For courier shipments outside Nairobi, we'll share a tracking number once your package is dispatched.</p>

              <h2>Questions?</h2>
              <p>
                Contact us on <a href={`tel:${SITE.phone}`} className="text-sage hover:underline">{SITE.phone}</a> or{' '}
                <Link href="/contact" className="text-sage hover:underline">send us a message</Link>.
              </p>
            </div>

            <div className="mt-10 p-5 bg-cream rounded-2xl border border-gray-100 flex gap-3">
              <AlertCircle size={18} className="text-sage shrink-0 mt-0.5" />
              <p className="text-sm text-text-muted">
                Delivery timelines may be affected by public holidays, severe weather or high demand
                periods. We'll always communicate any delays as soon as possible.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
