'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HERO_SLIDES } from '@/assets'

export default function HeroSlider() {
  const [current, setCurrent]   = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (animating) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 700)
  }, [animating])

  const next = useCallback(() => goTo((current + 1) % HERO_SLIDES.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5500)
    return () => clearInterval(timer)
  }, [next])

  const slide = HERO_SLIDES[current]

  return (
    <section
      className="relative w-full overflow-hidden bg-bark"
      style={{ height: 'clamp(480px, 70vh, 720px)' }}
      aria-label="Hero image slider"
    >
      {/* Slides */}
      {HERO_SLIDES.map((s, i) => (
        <div key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <Image
            src={s.image}
            alt={s.heading.replace('\n', ' ')}
            fill
            className="object-cover object-center"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Enhanced overlay: Combined dark tint to guarantee contrast */}
          <div className={`absolute inset-0 bg-black/20 mix-blend-multiply z-[1]`} />
          <div className={`absolute inset-0 bg-gradient-to-r ${s.overlay} z-[2]`} />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="w-[min(1280px,100%-2rem)] mx-auto">
          {/* Keyed on 'current' to re-trigger smooth fade animations cleanly per slide */}
          <div className="max-w-[600px] select-none" key={current}>
            <div className="animate-fade-up animate-delay-100">
              <span className="inline-flex items-center gap-2 text-xs font-semibold
                               tracking-widest uppercase text-white bg-black/25
                               backdrop-blur-md border border-white/30 px-4 py-2
                               rounded-full mb-5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-light animate-pulse" />
                {slide.tag}
              </span>

              {/* Added a subtle text-shadow utility setup for maximum contrast */}
              <h1 className="text-white mb-5 whitespace-pre-line drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                  style={{
                    fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                    lineHeight: 1.1,
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                  }}>
                {slide.heading}
              </h1>

              <p className="text-white/95 mb-8 font-medium leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
                 style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', maxWidth: '480px' }}>
                {slide.subtext}
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link href={slide.cta.href}
                  className="btn bg-sage text-white border-sage hover:bg-sage/90
                             shadow-xl hover:-translate-y-0.5 transition-all font-semibold">
                  {slide.cta.label}
                </Link>
                <Link href="/products"
                  className="btn bg-white/20 text-white border-white/40 backdrop-blur-md
                             hover:bg-white/30 transition-all font-medium shadow-md">
                  Explore All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      {[
        { dir: 'prev', action: prev, Icon: ChevronLeft,  side: 'left-4'  },
        { dir: 'next', action: next, Icon: ChevronRight, side: 'right-4' },
      ].map(({ dir, action, Icon, side }) => (
        <button key={dir} onClick={action} aria-label={`${dir} slide`}
          className={`absolute ${side} top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full
                      bg-black/20 backdrop-blur-md border border-white/30 text-white
                      flex items-center justify-center hover:bg-white/20
                      transition-all duration-150 hidden sm:flex shadow-md`}>
          <Icon size={20} />
        </button>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2"
           role="tablist" aria-label="Slide navigation">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            role="tab" aria-selected={i === current} aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 shadow-sm
              ${i === current ? 'bg-white w-8' : 'bg-white/50 w-4 hover:bg-white/80'}`}
          />
        ))}
      </div>

    </section>
  )
}