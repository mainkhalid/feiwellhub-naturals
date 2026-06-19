import Link from 'next/link'
import { Leaf, Instagram, Facebook, Twitter } from 'lucide-react'
import { SITE } from '@/assets'

export default function Footer() {
  return (
    <footer className="bg-bark text-cream">
      <div className="w-[min(1280px,100%-2rem)] mx-auto pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1.4fr]
                        gap-10 pb-10 border-b border-cream/10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-sage rounded-full flex items-center justify-center">
                <Leaf size={16} className="text-white" />
              </div>
              <div className="leading-none">
                <span className="font-display text-xl font-semibold text-cream block">
                  {SITE.name.split(' ')[0]}
                </span>
                <span className="text-[0.6rem] tracking-[0.22em] uppercase text-cream/40 font-body">
                  {SITE.tagline}
                </span>
              </div>
            </div>
            <p className="text-sm text-cream/55 leading-relaxed mb-5 max-w-[220px]">
              Clinically-formulated natural supplements for nerve pain, immune support,
              joint health and more. Science-backed, nature-sourced.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: SITE.instagram || '#', label: 'Instagram' },
                { Icon: Facebook,  href: SITE.facebook  || '#', label: 'Facebook'  },
                { Icon: Twitter,   href: SITE.twitter   || '#', label: 'Twitter'   },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center
                             text-cream/60 hover:bg-sage hover:text-white transition-all duration-150">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop by Category */}
          <div>
            <h4 className="text-[0.72rem] font-semibold tracking-widest uppercase text-cream/40 mb-4">
              Shop
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                ['All Products',        '/products'                                ],
                ['Immune Support',      '/products?category=immune-support'        ],
                ['Nerve & Pain Relief', '/products?category=nerve-pain-relief'     ],
                ['Bone & Joint Health', '/products?category=bone-joint-health'     ],
                ['Respiratory & Allergy','/products?category=respiratory-allergy'  ],
                ['Vitamins & Minerals', '/products?category=vitamins-minerals'     ],
                ['Neurological Support','/products?category=neurological-support'  ],
                ['Muscle & Movement',   '/products?category=muscle-movement'       ],
                ['Bladder & Kidney',    '/products?category=bladder-kidney-health' ],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[0.72rem] font-semibold tracking-widest uppercase text-cream/40 mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                ['About Us',       '/about'         ],
                ['Our Story',      '/our-story'     ],
                ['Sustainability', '/sustainability' ],
                ['Contact Us',     '/contact'       ],
                ['Admin',          '/admin/login'   ],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[0.72rem] font-semibold tracking-widest uppercase text-cream/40 mb-4">
              Help
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                ['FAQs',             '/faqs'             ],
                ['Shipping Policy',  '/shipping-policy'  ],
                ['Return Policy',    '/return-policy'    ],
                ['Privacy Policy',   '/privacy-policy'   ],
                ['Terms of Service', '/terms-of-service' ],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[0.72rem] font-semibold tracking-widest uppercase text-cream/40 mb-4">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3 mb-5 text-sm text-cream/60">
              <a href={`tel:${SITE.phone}`}
                className="hover:text-cream transition-colors flex items-center gap-2">
                📞 {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`}
                className="hover:text-cream transition-colors flex items-center gap-2">
                ✉️ {SITE.email}
              </a>
              <span className="flex items-center gap-2">📍 {SITE.location}</span>
            </div>

            <a href={`https://wa.me/${SITE.whatsapp}?text=Hi%20${encodeURIComponent(SITE.name)}!`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white
                         text-xs font-semibold px-4 py-2.5 rounded-full
                         hover:bg-[#22c55e] transition-colors">
              <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>

            {/* Medical disclaimer */}
            <p className="text-xs text-cream/30 mt-5 leading-relaxed">
              These products are food supplements, not medicines. Always consult a healthcare
              professional before use.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/35">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-cream/35">
            <Link href="/privacy-policy" className="hover:text-cream/60 transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="/terms-of-service" className="hover:text-cream/60 transition-colors">Terms</Link>
            <span>·</span>
            <p className="flex items-center gap-1">
              Made with <span className="text-sage-light">♥</span> in Nairobi 🌿
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
