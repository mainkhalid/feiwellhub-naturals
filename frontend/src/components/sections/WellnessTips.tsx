'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react'

const TIPS = [
  {
    category: 'Immune Health',
    tip: 'Vitamin D deficiency is extremely common in East Africa despite sunshine. Supplement with 2000–5000 IU daily, especially if you spend most time indoors.',
  },
  {
    category: 'Nerve Health',
    tip: 'Tingling or numbness in your hands and feet can be a sign of B12 deficiency. Methylcobalamin (the active form) is far better absorbed than cyanocobalamin.',
  },
  {
    category: 'Joint Health',
    tip: 'Glucosamine and Chondroitin work best when taken consistently for at least 8 weeks. Most people see significant improvement in joint pain and mobility after 10–12 weeks.',
  },
  {
    category: 'Omega-3 Tips',
    tip: 'Take Omega-3 fish oil with your largest meal of the day — fat-soluble nutrients absorb 3x better when taken with food. Look for products with at least 500mg EPA + DHA per capsule.',
  },
  {
    category: 'Magnesium',
    tip: 'Over 70% of people are magnesium deficient. Signs include muscle cramps, poor sleep, anxiety and headaches. Glycinate form is the most gentle and best absorbed.',
  },
  {
    category: 'Respiratory Health',
    tip: 'Quercetin acts as a natural antihistamine by stabilising mast cells. Take it consistently for 4–6 weeks before allergy season peaks for best results.',
  },
  {
    category: 'Hydration',
    tip: 'Most people in Kenya are chronically underhydrated. Aim for 35ml of water per kg of body weight daily. Proper hydration improves nutrient absorption by up to 40%.',
  },
  {
    category: 'Gut Health',
    tip: 'Take probiotics at least 2 hours away from antibiotics, and 30 minutes before a meal. Refrigerate them for maximum viability.',
  },
  {
    category: 'Sleep & Recovery',
    tip: 'Magnesium glycinate taken 1 hour before bed significantly improves sleep quality and reduces nighttime muscle cramps. Start with 200mg and increase gradually.',
  },
  {
    category: 'Supplement Timing',
    tip: 'Fat-soluble vitamins (A, D, E, K) should be taken with meals containing fat. Water-soluble vitamins (B, C) can be taken any time but are best in the morning.',
  },
]

export default function WellnessTips() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  function go(index: number) {
    if (animating) return
    setAnimating(true)
    setCurrent((index + TIPS.length) % TIPS.length)
    setTimeout(() => setAnimating(false), 400)
  }

  // Safely auto-advance every 6 seconds without resetting the interval unexpectedly
  useEffect(() => {
    const timer = setInterval(() => {
      go(current + 1)
    }, 6000)
    return () => clearInterval(timer)
  }, [current, animating])

  const tip = TIPS[current]

  return (
    <section 
      className="relative py-20 bg-cover bg-center bg-no-repeat overflow-hidden" 
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1600')` }}
      aria-label="Wellness tips"
    >
      {/* Dark tint overlay for excellent text contrast */}
      <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[2px]" />

      <div className="relative w-[min(1280px,100%-2rem)] mx-auto z-10">
        <div className="text-center mb-10">
          <h2 className="text-white text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight">
            Know Your Supplements
          </h2>
          <p className="text-slate-300 text-sm mt-2 max-w-md mx-auto font-light">
            Small changes in how and when you take your vitamins can make a massive difference.
          </p>
        </div>

        <div className="max-w-[720px] mx-auto">
          {/* Re-designed structural Glassmorphism Card */}
          <div className={`bg-white/[0.07] backdrop-blur-md border border-white/10
                           rounded-2xl p-8 md:p-10 transition-all duration-400 min-h-[220px] flex flex-col justify-center items-center shadow-2xl relative
                           ${animating ? 'opacity-0 scale-98' : 'opacity-100 scale-100'}`}>
            
            <span className="text-xs font-semibold tracking-widest uppercase
                             text-emerald-300 mb-5 bg-white/5 border border-white/10 px-4 py-1.5 rounded-md">
              {tip.category}
            </span>
            
            <p className="text-white leading-relaxed text-center text-lg md:text-xl font-normal max-w-2xl">
              “{tip.tip}”
            </p>
          </div>

          {/* Cleaned Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button 
              onClick={() => go(current - 1)}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10
                         text-white flex items-center justify-center
                         hover:bg-white/15 hover:border-white/30 transition-all active:scale-95"
              aria-label="Previous tip"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Pagination Indicators */}
            <div className="flex gap-2">
              {TIPS.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => go(i)}
                  aria-label={`Tip ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300
                    ${i === current ? 'bg-emerald-400 w-8' : 'bg-white/20 w-2 hover:bg-white/40'}`}
                />
              ))}
            </div>

            <button 
              onClick={() => go(current + 1)}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10
                         text-white flex items-center justify-center
                         hover:bg-white/15 hover:border-white/30 transition-all active:scale-95"
              aria-label="Next tip"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <p className="text-center text-slate-400 text-xs mt-4 tracking-wider">
            {current + 1} of {TIPS.length} wellness insights
          </p>
        </div>
      </div>
    </section>
  )
}