import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PROMO_BANNERS } from '@/assets'

export default function PromoBanners() {
  return (
    <section className="py-12 bg-cream" aria-label="Promotional banners">
      <div className="w-[min(1280px,100%-2rem)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROMO_BANNERS.map((banner) => {
            const isLight = banner.theme === 'light'
            return (
              <div key={banner.id}
                className={`relative rounded-2xl overflow-hidden flex items-center
                            min-h-[210px]
                            ${isLight ? 'bg-sage-pale' : 'bg-bark'}`}>
                {/* Text */}
                <div className="flex-1 p-8 z-10 relative">
                  <span className={`text-xs font-semibold tracking-widest uppercase mb-2 block
                    ${isLight ? 'text-sage' : 'text-sage-light'}`}>
                    {banner.tag}
                  </span>
                  <h3 className={`font-display text-2xl mb-2 leading-tight
                    ${isLight ? 'text-bark' : 'text-cream'}`}>
                    {banner.heading}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-5 max-w-[260px]
                    ${isLight ? 'text-text-muted' : 'text-cream/70'}`}>
                    {banner.body}
                  </p>
                  <Link href={banner.cta.href}
                    className={`inline-flex items-center gap-2 text-sm font-semibold
                      transition-all duration-150 hover:gap-3
                      ${isLight ? 'text-sage hover:text-bark' : 'text-cream hover:text-sage-light'}`}>
                    {banner.cta.label} <ArrowRight size={15} />
                  </Link>
                </div>

                {/* Image */}
                <div className="w-[45%] relative self-stretch shrink-0 hidden sm:block">
                  <Image
                    src={banner.image}
                    alt={banner.heading}
                    fill
                    className="object-cover object-center"
                    sizes="25vw"
                  />
                  <div className={`absolute inset-0
                    ${isLight
                      ? 'bg-gradient-to-r from-sage-pale via-sage-pale/40 to-transparent'
                      : 'bg-gradient-to-r from-bark via-bark/40 to-transparent'}`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
