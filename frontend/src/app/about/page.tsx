import type { Metadata } from 'next'
import Link from 'next/link'
import { Leaf, ShieldCheck, Heart, Recycle, ArrowRight, CheckCircle } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE } from '@/assets'

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${SITE.name} — our mission, values and commitment to natural wellness.`,
}

const VALUES = [
  {
    Icon: Leaf,
    title: 'Nature First',
    body: 'Every formula starts with the plant. We believe nature provides everything the body needs — our job is simply to make it accessible.',
  },
  {
    Icon: ShieldCheck,
    title: 'Science-Backed',
    body: 'We don\'t make claims we can\'t support. Every product is formulated based on peer-reviewed research and traditional use evidence.',
  },
  {
    Icon: Heart,
    title: 'People-Centred',
    body: 'Our customers are our community. We listen, respond within 24 hours, and stand behind every product we sell.',
  },
  {
    Icon: Recycle,
    title: 'Responsible',
    body: 'From farm to packaging, we make choices that are good for people and the planet — not just our bottom line.',
  },
]

const TEAM = [
  {
    name:  'Feiwellhub Founder',
    role:  'Founder & Formulator',
    bio:   'A passionate herbalist with over 10 years of experience in natural wellness. Started Feiwellhub after struggling to find high-quality, affordable supplements in Kenya.',
    initial: 'F',
  },
  {
    name:  'Wellness Team',
    role:  'Product & Quality',
    bio:   'Our dedicated team of wellness practitioners and quality specialists ensure every batch meets our strict standards before it reaches you.',
    initial: 'W',
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-sage py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="w-[min(1280px,100%-2rem)] mx-auto relative text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest
                             uppercase text-white/70 bg-white/10 border border-white/20
                             px-4 py-2 rounded-full mb-6">
              <Leaf size={12} /> Our Story
            </span>
            <h1 className="text-white mb-5" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
              Wellness rooted in nature,<br />backed by science
            </h1>
            <p className="text-white/75 max-w-[600px] mx-auto text-lg font-light leading-relaxed">
              We started {SITE.name} with a simple belief — that everyone in Kenya deserves access
              to premium, honest natural supplements without the premium price tag.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-white">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="section-label block mb-3">Our Mission</span>
                <h2 className="text-bark mb-5">Making natural wellness accessible to every Kenyan</h2>
                <p className="text-text-muted leading-relaxed mb-5">
                  Too often, quality supplements are either unaffordable, imported with questionable supply
                  chains, or loaded with fillers and synthetic additives. We set out to change that.
                </p>
                <p className="text-text-muted leading-relaxed mb-8">
                  Every product at {SITE.name} is formulated with whole, traceable ingredients —
                  no proprietary blends hiding poor quality, no marketing claims without evidence.
                  Just honest wellness products that work.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    'No synthetic fillers or binders',
                    'Transparent ingredient sourcing',
                    'Third-party tested for purity',
                    'Delivered across Nairobi',
                  ].map(point => (
                    <div key={point} className="flex items-center gap-2.5 text-sm text-bark">
                      <CheckCircle size={16} className="text-sage shrink-0" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 gap-5">
                {[
                  { value: '50+',  label: 'Products',           sub: 'and growing'          },
                  { value: '100%', label: 'Natural',            sub: 'no synthetics'         },
                  { value: '500+', label: 'Happy Customers',    sub: 'across Nairobi'        },
                  { value: '24h',  label: 'Response Time',      sub: 'we reply fast'         },
                ].map(({ value, label, sub }) => (
                  <div key={label}
                    className="bg-cream rounded-2xl p-6 border border-gray-100 text-center">
                    <div className="font-display text-4xl font-semibold text-sage mb-1">{value}</div>
                    <div className="text-sm font-semibold text-bark">{label}</div>
                    <div className="text-xs text-text-muted mt-0.5">{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-cream">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <div className="text-center mb-12">
              <span className="section-label block mb-2">What drives us</span>
              <h2 className="text-bark">Our Core Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map(({ Icon, title, body }) => (
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

        {/* Team */}
        <section className="py-20 bg-white">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <div className="text-center mb-12">
              <span className="section-label block mb-2">The people behind</span>
              <h2 className="text-bark">Our Team</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[700px] mx-auto">
              {TEAM.map(({ name, role, bio, initial }) => (
                <div key={name} className="bg-cream rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-sage flex items-center
                                    justify-center text-white text-xl font-display font-semibold">
                      {initial}
                    </div>
                    <div>
                      <p className="font-semibold text-bark">{name}</p>
                      <p className="text-sm text-sage">{role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">{bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-bark py-16">
          <div className="w-[min(1280px,100%-2rem)] mx-auto text-center">
            <h2 className="text-cream mb-4">Ready to start your wellness journey?</h2>
            <p className="text-cream/60 mb-8 max-w-[500px] mx-auto">
              Browse our full range of natural supplements and find what works for you.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/products" className="btn bg-sage text-white border-sage hover:bg-sage/90">
                Shop All Products <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className="btn bg-white/10 text-white border-white/20 hover:bg-white/20">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
