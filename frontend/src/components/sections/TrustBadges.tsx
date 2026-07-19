'use client'

import Image from 'next/image'
import { TRUST_BADGES } from '@/assets'

interface Props {
  variant?: 'banner' | 'strip' | 'inline'
}

export default function TrustBadges({ variant = 'banner' }: Props) {
  
  // ── STRIP VARIANT ──
  if (variant === 'strip') {
    return (
      <div className="bg-white border-y border-slate-100 py-3.5 shadow-sm">
        <div className="w-[min(1280px,100%-2rem)] mx-auto flex items-center justify-center gap-8 flex-wrap">
          {TRUST_BADGES.map(({ image, title, alt }) => (
            <div key={title} className="flex items-center gap-2.5 bg-slate-50/50 px-3 py-1.5 rounded-lg border border-slate-100">
              <div className="relative w-5 h-5 flex-shrink-0">
                <Image src={image} alt={alt} fill className="object-contain" sizes="20px" />
              </div>
              <span className="text-xs font-bold text-slate-800 tracking-tight">{title}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── INLINE VARIANT ──
  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-2.5">
        {TRUST_BADGES.map(({ image, title, alt }) => (
          <span key={title} className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-sm text-slate-700">
            <div className="relative w-4 h-4 flex-shrink-0">
              <Image src={image} alt={alt} fill className="object-contain" sizes="16px" />
            </div>
            {title}
          </span>
        ))}
      </div>
    )
  }

  // ── BANNER VARIANT ──
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-slate-100/60 border-y border-slate-200/60" aria-label="Certifications and quality standards">
      <div className="w-[min(1280px,100%-2rem)] mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-slate-900 text-[clamp(1.6rem,3.5vw,2.25rem)] font-extrabold tracking-tight mt-3">
            Certified, Tested &amp; Approved
          </h2>
          <p className="text-slate-600 text-sm mt-3 max-w-[520px] mx-auto font-light leading-relaxed">
            Every formula meets strict regional Kenya Bureau of Standards requirements alongside global Good Manufacturing Practice compliance protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRUST_BADGES.map(({ image, title, sub, alt }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-slate-200/70 text-center shadow-sm hover:shadow-md hover:border-emerald-500/20 transition-all duration-300 flex flex-col items-center group">
              <div className="w-32 h-32 bg-slate-50 rounded-2xl flex items-center justify-center p-2 mb-4 group-hover:bg-emerald-50/40 transition-colors duration-300">
                <div className="relative w-full h-full">
                  <Image src={image} alt={alt} fill className="object-contain filter group-hover:scale-105 transition-transform duration-300" sizes="80px" />
                </div>
              </div>
              <h3 className="font-bold text-slate-800 text-base tracking-tight">{title}</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-normal max-w-[170px]">{sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200/60 max-w-[700px] mx-auto text-center">
          <p className="text-xs text-slate-400 leading-relaxed font-light">
            Faiwellhub Naturals products are safely distributed in full alignment with the Kenya Bureau of Standards (KEBS) guidelines parameters for dietary supplements. These products serve exclusively as premium wellness food supplements and are not intended to diagnose, treat, or replace medical prescriptions.
          </p>
        </div>
        
      </div>
    </section>
  )
}