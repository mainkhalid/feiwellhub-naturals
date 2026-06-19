'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Send, CheckCircle, AlertCircle, Clock, Phone, Mail, MapPin, Package } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { submitContact } from '@/lib/api'
import { SITE } from '@/assets'

const SUBJECTS = [
  'General Enquiry',
  'Place an Order',
  'Product Recommendation',
  'Wholesale / Bulk Order',
  'Custom Supplement Blend',
  'Other',
]

function ContactForm() {
  const searchParams = useSearchParams()
  const inquiry      = searchParams.get('inquiry') ?? ''

  const [form, setForm]     = useState({
    full_name: '', email: '', phone: '',
    subject:   inquiry ? `Product Enquiry: ${inquiry}` : 'General Enquiry',
    message:   '',
  })
  const [errors,  setErrors]  = useState<Record<string, string>>({})
  const [status,  setStatus]  = useState<'idle'|'loading'|'success'|'error'>('idle')

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => { const n = { ...e }; delete n[field]; return n })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await submitContact(form)
      if (res.success) {
        setStatus('success')
        setForm({ full_name: '', email: '', phone: '', subject: 'General Enquiry', message: '' })
      } else {
        setErrors(res.errors ?? {})
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      {status === 'success' && (
        <div className="flex items-center gap-2.5 px-5 py-4 rounded-xl bg-sage-pale
                        text-sage border border-sage-light text-sm font-medium mb-6"
             role="alert" aria-live="polite">
          <CheckCircle size={18} className="shrink-0" />
          Thank you! We'll be in touch shortly.
        </div>
      )}
      {status === 'error' && !Object.keys(errors).length && (
        <div className="flex items-center gap-2.5 px-5 py-4 rounded-xl bg-red-50
                        text-red-600 border border-red-200 text-sm font-medium mb-6"
             role="alert" aria-live="polite">
          <AlertCircle size={18} className="shrink-0" />
          Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="full_name" className="form-label">
              Full Name <span className="text-sage">*</span>
            </label>
            <input id="full_name" type="text" autoComplete="name"
              className={`form-input ${errors.full_name ? 'border-red-400' : ''}`}
              placeholder="e.g. Amina Odhiambo"
              value={form.full_name}
              onChange={e => update('full_name', e.target.value)} required />
            {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="form-label">
              Email <span className="text-sage">*</span>
            </label>
            <input id="email" type="email" autoComplete="email"
              className={`form-input ${errors.email ? 'border-red-400' : ''}`}
              placeholder="you@example.com"
              value={form.email}
              onChange={e => update('email', e.target.value)} required />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="phone" className="form-label">
              Phone <span className="text-text-muted font-normal text-xs">(optional)</span>
            </label>
            <input id="phone" type="tel" autoComplete="tel"
              className="form-input" placeholder="+254 700 000 000"
              value={form.phone}
              onChange={e => update('phone', e.target.value)} />
          </div>
          <div>
            <label htmlFor="subject" className="form-label">Subject</label>
            <select id="subject" className="form-input cursor-pointer"
              value={form.subject}
              onChange={e => update('subject', e.target.value)}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237A6656' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 14px center',
                paddingRight: '2.5rem',
              }}>
              {inquiry && (
                <option value={`Product Enquiry: ${inquiry}`}>
                  Product Enquiry: {inquiry}
                </option>
              )}
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="form-label">
            Message <span className="text-sage">*</span>
          </label>
          <textarea id="message" rows={5}
            className={`form-input resize-y min-h-[130px] ${errors.message ? 'border-red-400' : ''}`}
            placeholder="Tell us what you need — product enquiry, order, supplement advice..."
            value={form.message}
            onChange={e => update('message', e.target.value)} required />
          {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
        </div>

        <button type="submit" disabled={status === 'loading'}
          className="btn btn-primary w-full justify-center disabled:opacity-60">
          <Send size={15} />
          {status === 'loading' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-white border-b border-gray-100 py-14 pb-10">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <span className="section-label block mb-2">We're here for you</span>
            <h1>Get in Touch</h1>
            <p className="text-text-muted text-sm mt-2">
              Questions, product advice or custom orders — our team responds within 24 hours.
            </p>
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="w-[min(1280px,100%-2rem)] mx-auto
                          grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 items-start">

            <Suspense fallback={<div className="text-sm text-text-muted">Loading form…</div>}>
              <ContactForm />
            </Suspense>

            {/* Info sidebar */}
            <aside>
              <h2 className="font-display text-2xl text-bark mb-5">Contact Info</h2>
              {[
                { Icon: Clock,   title: 'Response Time',   body: 'We reply to all messages within 24 hours on business days.' },
                { Icon: Phone,   title: 'Call / WhatsApp', body: SITE.phone, href: `tel:${SITE.phone}` },
                { Icon: Mail,    title: 'Email',           body: SITE.email, href: `mailto:${SITE.email}` },
                { Icon: MapPin,  title: 'Location',        body: SITE.location, sub: 'Same-day delivery available in Nairobi' },
                { Icon: Package, title: 'Wholesale',       body: 'Interested in bulk orders? Select "Wholesale / Bulk Order" in the form.' },
              ].map(({ Icon, title, body, href, sub }: any) => (
                <div key={title}
                     className="flex gap-4 p-4 rounded-xl border border-gray-100
                                bg-cream mb-3 items-start">
                  <div className="w-9 h-9 bg-sage-pale rounded-lg flex items-center
                                  justify-center text-sage shrink-0">
                    <Icon size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-bark mb-0.5">{title}</h3>
                    {href
                      ? <a href={href} className="text-sm text-text-muted hover:text-sage transition-colors">{body}</a>
                      : <p className="text-sm text-text-muted">{body}</p>}
                    {sub && <p className="text-xs text-text-muted mt-0.5">{sub}</p>}
                  </div>
                </div>
              ))}

              {/* WhatsApp direct */}
              <a href={`https://wa.me/${SITE.whatsapp}?text=Hi%20${encodeURIComponent(SITE.name)}!`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full mt-4
                           bg-[#25D366] text-white font-semibold text-sm py-3.5
                           rounded-xl hover:bg-[#22c55e] transition-colors">
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat Directly on WhatsApp
              </a>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
