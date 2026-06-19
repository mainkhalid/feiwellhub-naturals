import type { Metadata } from 'next'
import { Leaf, Recycle, Heart, Globe, Sun, Droplets } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE } from '@/assets'

export const metadata: Metadata = {
  title: 'Sustainability',
  description: `How ${SITE.name} sources responsibly and reduces environmental impact.`,
}

const PILLARS = [
  {
    Icon: Globe,
    title: 'Ethical Sourcing',
    body: 'We work directly with certified organic farms across Kenya and East Africa. No mystery supply chains — we visit our suppliers, pay fair prices, and build long-term relationships.',
    stat: '100%', statLabel: 'traceable ingredients',
  },
  {
    Icon: Recycle,
    title: 'Eco Packaging',
    body: 'Our packaging uses recycled paper labels, glass bottles where possible, and compostable seals. We are actively working to eliminate single-use plastics from our supply chain by 2026.',
    stat: '80%', statLabel: 'recyclable packaging',
  },
  {
    Icon: Sun,
    title: 'Supporting Local',
    body: 'Every shilling we spend on ingredients stays in Kenya where possible. Supporting local farmers means supporting local economies and reducing the carbon footprint of imports.',
    stat: '70%', statLabel: 'locally sourced',
  },
  {
    Icon: Droplets,
    title: 'Minimal Processing',
    body: 'We use cold-pressing, low-temperature drying and gentle extraction methods that preserve nutrient integrity and use less energy than industrial processing.',
    stat: '0',  statLabel: 'synthetic solvents used',
  },
  {
    Icon: Heart,
    title: 'Fair Labour',
    body: 'We ensure everyone in our supply chain is paid fairly and works in safe conditions. This is non-negotiable — we audit our partners annually.',
    stat: '100%', statLabel: 'fair-pay certified partners',
  },
  {
    Icon: Leaf,
    title: 'Biodiversity',
    body: 'We only source from farms practising regenerative agriculture. This means crop rotation, companion planting and no chemical pesticides — protecting the soil for future generations.',
    stat: '0',  statLabel: 'synthetic pesticides',
  },
]

export default function SustainabilityPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-sage py-24">
          <div className="w-[min(1280px,100%-2rem)] mx-auto text-center">
            <Leaf size={36} className="text-white/60 mx-auto mb-5" />
            <span className="section-label text-white/70 block mb-3">Our commitment</span>
            <h1 className="text-white mb-5" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)' }}>
              Good for you.<br />Good for the planet.
            </h1>
            <p className="text-white/75 max-w-[560px] mx-auto text-lg font-light leading-relaxed">
              Sustainability isn't a marketing angle for us — it's a core operating principle.
              Here's exactly what we do and how we measure it.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-20 bg-white">
          <div className="w-[min(1280px,100%-2rem)] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PILLARS.map(({ Icon, title, body, stat, statLabel }) => (
                <div key={title}
                  className="bg-cream rounded-2xl p-7 border border-gray-100
                             hover:border-sage/20 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 bg-sage-pale rounded-xl flex items-center
                                    justify-center text-sage">
                      <Icon size={20} />
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl font-semibold text-sage">{stat}</div>
                      <div className="text-xs text-text-muted">{statLabel}</div>
                    </div>
                  </div>
                  <h3 className="font-display text-xl text-bark mb-2">{title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-20 bg-cream-dark">
          <div className="w-[min(1280px,100%-2rem)] mx-auto max-w-[700px]">
            <div className="text-center mb-12">
              <span className="section-label block mb-2">Where we're heading</span>
              <h2 className="text-bark">2025–2027 Sustainability Roadmap</h2>
            </div>
            <div className="flex flex-col gap-5">
              {[
                { year: '2025', goal: 'Achieve 100% plastic-free primary packaging across all product lines.' },
                { year: '2026', goal: 'Partner exclusively with farms holding organic certification.' },
                { year: '2027', goal: 'Achieve carbon-neutral delivery operations in Nairobi.' },
              ].map(({ year, goal }) => (
                <div key={year}
                  className="flex gap-5 items-start bg-white rounded-xl p-5 border border-gray-100">
                  <div className="bg-sage text-white text-sm font-bold px-3 py-1.5
                                  rounded-lg shrink-0">{year}</div>
                  <p className="text-sm text-text-muted leading-relaxed pt-0.5">{goal}</p>
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
