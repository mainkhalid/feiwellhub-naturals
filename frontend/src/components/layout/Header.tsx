"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Leaf } from "lucide-react";
import { SITE } from "@/assets";
import Image from "next/image";

const MEGA_MENU = [
  {
    label: "All Products",
    href: "/products",
    mega: null,
  },
  {
    label: "By Condition",
    href: "/products",
    mega: {
      sections: [
        {
          title: "Nerve & Pain",
          links: [
            {
              label: "Tingling & Numbness",
              href: "/products?category=nerve-pain-relief",
            },
            {
              label: "Burning Pain",
              href: "/products?category=nerve-pain-relief",
            },
            {
              label: "Peripheral Neuropathy",
              href: "/products?category=nerve-pain-relief",
            },
            {
              label: "Nerve Damage Recovery",
              href: "/products?category=neurological-support",
            },
            {
              label: "Sudden Weakness",
              href: "/products?category=muscle-movement",
            },
          ],
        },
        {
          title: "Movement & Mobility",
          links: [
            {
              label: "Joint Pain & Arthritis",
              href: "/products?category=bone-joint-health",
            },
            {
              label: "Loss of Movement",
              href: "/products?category=muscle-movement",
            },
            {
              label: "Muscle Weakness",
              href: "/products?category=muscle-movement",
            },
            {
              label: "Bone & Fracture Support",
              href: "/products?category=bone-joint-health",
            },
          ],
        },
        {
          title: "Breathing & Immunity",
          links: [
            {
              label: "Asthma Support",
              href: "/products?category=respiratory-allergy",
            },
            {
              label: "Allergies",
              href: "/products?category=respiratory-allergy",
            },
            {
              label: "Breathing Difficulties",
              href: "/products?category=respiratory-allergy",
            },
            {
              label: "Immune Deficiency",
              href: "/products?category=immune-support",
            },
            {
              label: "Frequent Infections",
              href: "/products?category=immune-support",
            },
          ],
        },
        {
          title: "Bladder & Nervous System",
          links: [
            {
              label: "Bladder Control Issues",
              href: "/products?category=bladder-kidney-health",
            },
            {
              label: "Recurrent UTIs",
              href: "/products?category=bladder-kidney-health",
            },
            {
              label: "Neurological Support",
              href: "/products?category=neurological-support",
            },
            {
              label: "Brain & Cognitive Health",
              href: "/products?category=neurological-support",
            },
          ],
        },
      ],
    },
  },
  {
    label: "By Supplement",
    href: "/products",
    mega: {
      sections: [
        {
          title: "Vitamins",
          links: [
            {
              label: "Vitamin D3 5000 IU",
              href: "/products/vitamin-d3-5000iu",
            },
            {
              label: "Vitamin C 1000mg",
              href: "/products/vitamin-c-1000mg-bioflavonoids",
            },
            {
              label: "Vitamin B Complex",
              href: "/products/vitamin-b-complex-nerve",
            },
            {
              label: "All Vitamins & Minerals",
              href: "/products?category=vitamins-minerals",
            },
          ],
        },
        {
          title: "Key Supplements",
          links: [
            {
              label: "Omega-3 Fish Oil",
              href: "/products/omega-3-fish-oil-2000mg",
            },
            {
              label: "Magnesium Glycinate",
              href: "/products/magnesium-glycinate-400mg",
            },
            {
              label: "Alpha Lipoic Acid",
              href: "/products/alpha-lipoic-acid-600mg",
            },
            {
              label: "Zinc Bisglycinate",
              href: "/products/zinc-bisglycinate-25mg",
            },
          ],
        },
        {
          title: "Joints & Bones",
          links: [
            {
              label: "Glucosamine + Chondroitin",
              href: "/products/glucosamine-chondroitin-complex",
            },
            {
              label: "Calcium + D3 + K2",
              href: "/products/calcium-citrate-d3-k2",
            },
            {
              label: "Collagen Type II",
              href: "/products/collagen-type-2-boswellia",
            },
            {
              label: "CoQ10 Ubiquinol",
              href: "/products/coq10-ubiquinol-200mg",
            },
          ],
        },
        {
          title: "Nerve & Brain",
          links: [
            {
              label: "Alpha Lipoic Acid 600mg",
              href: "/products/alpha-lipoic-acid-600mg",
            },
            {
              label: "Acetyl-L-Carnitine",
              href: "/products/acetyl-l-carnitine-500mg",
            },
            {
              label: "Lion's Mane + Bacopa",
              href: "/products/lions-mane-bacopa-complex",
            },
            {
              label: "All Nerve Supplements",
              href: "/products?category=nerve-pain-relief",
            },
          ],
        },
      ],
    },
  },
  {
    label: "Immune Support",
    href: "/products?category=immune-support",
    mega: null,
  },
  {
    label: "About Us",
    href: "/about",
    mega: null,
  },
  {
    label: "Contact",
    href: "/contact",
    mega: null,
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  // Add a ref to handle the hover delay timer
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Custom hover handlers to prevent accidental closing
  const handleMouseEnter = (menuLabel: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setActiveMenu(menuLabel);
  };

  const handleMouseLeave = () => {
    // Wait 150ms before closing. This gives the user time to cross the "dead zone gap"
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h, { passive: true });
    return () => {
      window.removeEventListener("scroll", h);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setActiveMenu(null);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-200
      ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.09)]" : "border-b border-gray-100"}`}
    >
      {/* Announcement bar */}
      <div className="bg-sage text-white text-center text-xs py-2 px-4 font-body font-medium tracking-wide">
        🌿 Free delivery on orders above Ksh 2,000 &nbsp;·&nbsp; Consult our
        wellness team before use &nbsp;·&nbsp; Same-day Nairobi delivery
      </div>

      <div
        ref={menuRef}
        className="w-[min(1280px,100%-2rem)] mx-auto flex items-center justify-between h-16 gap-4"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="Feiwellhub Naturals home"
        >
          <Image
            src={SITE.logo}
            alt="Feiwellhub Naturals"
            width={60}
            height={50}
            className="object-contain"
          />
          <div className="leading-none">
            <span className="font-display text-[1.3rem] font-semibold text-bark block tracking-tight">
              {SITE.name.split(" ")[0]}
            </span>
            <span className="text-[0.6rem] tracking-[0.2em] uppercase text-sage font-body">
              {SITE.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {MEGA_MENU.map((item) => (
            <div key={item.label} className="relative">
              {item.mega ? (
                <button
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() =>
                    setActiveMenu((a) => (a === item.label ? null : item.label))
                  }
                  className={`flex items-center gap-1 px-3.5 py-2 text-[0.875rem] font-medium
                    rounded-lg transition-all duration-150
                    ${
                      activeMenu === item.label
                        ? "text-sage bg-sage-pale"
                        : "text-text-main hover:text-sage hover:bg-sage-pale"
                    }`}
                  aria-expanded={activeMenu === item.label}
                >
                  {item.label}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200
                    ${activeMenu === item.label ? "rotate-180 text-sage" : "text-text-muted"}`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`px-3.5 py-2 text-[0.875rem] font-medium rounded-lg
                    transition-all duration-150 block
                    ${
                      pathname === item.href
                        ? "text-sage bg-sage-pale"
                        : "text-text-main hover:text-sage hover:bg-sage-pale"
                    }`}
                >
                  {item.label}
                </Link>
              )}

              {/* Mega dropdown */}
              {item.mega && activeMenu === item.label && (
                <div
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white
                             border border-gray-100 rounded-2xl
                             shadow-[0_16px_48px_rgba(0,0,0,0.12)]
                             p-7 z-50"
                  style={{
                    minWidth: item.mega.sections.length > 2 ? "680px" : "480px",
                  }}
                >
                  <div
                    className={`grid gap-8 mb-5
                    ${
                      item.mega.sections.length === 4
                        ? "grid-cols-4"
                        : item.mega.sections.length === 3
                          ? "grid-cols-3"
                          : "grid-cols-2"
                    }`}
                  >
                    {item.mega.sections.map((section) => (
                      <div key={section.title}>
                        <h4
                          className="text-[0.68rem] font-semibold tracking-widest uppercase
                                       text-sage mb-3"
                        >
                          {section.title}
                        </h4>
                        <ul className="flex flex-col gap-0.5">
                          {section.links.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                className="text-sm text-text-muted hover:text-sage py-1 px-2
                                           rounded-md hover:bg-sage-pale transition-all duration-150
                                           flex items-center gap-1.5 group"
                              >
                                <span
                                  className="w-1 h-1 rounded-full bg-sage/30
                                                 group-hover:bg-sage transition-colors shrink-0"
                                />
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      href={item.href}
                      className="text-sm font-semibold text-sage hover:text-bark
                                 transition-colors flex items-center gap-1.5"
                    >
                      Browse all products →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA + mobile */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/contact"
            className="hidden lg:inline-flex btn btn-primary btn-sm text-xs px-5"
          >
            Get Advice
          </Link>
          <button
            className="lg:hidden p-2 rounded-lg text-bark hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col px-4 py-3 gap-0.5">
            {MEGA_MENU.map((item) => (
              <div key={item.label}>
                {item.mega ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full px-3 py-3
                                 text-sm font-medium text-text-main rounded-xl
                                 hover:bg-sage-pale hover:text-sage transition-colors"
                      onClick={() =>
                        setMobileExpanded((e) =>
                          e === item.label ? null : item.label,
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-150
                        ${mobileExpanded === item.label ? "rotate-180 text-sage" : "text-text-muted"}`}
                      />
                    </button>
                    {mobileExpanded === item.label && (
                      <div className="pl-4 pb-2 flex flex-col gap-0.5 ml-2 border-l-2 border-sage-light">
                        {item.mega.sections.map((section) => (
                          <div key={section.title}>
                            <p
                              className="text-[0.68rem] font-semibold tracking-widest uppercase
                                          text-sage px-3 py-1.5"
                            >
                              {section.title}
                            </p>
                            {section.links.map((link) => (
                              <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm text-text-muted hover:text-sage py-1.5 px-3
                                           rounded-lg hover:bg-sage-pale transition-colors block"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                        <Link
                          href={item.href}
                          className="text-sm font-semibold text-sage py-2 px-3 mt-1"
                        >
                          Browse all →
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-3 text-sm font-medium text-text-main
                               rounded-xl hover:bg-sage-pale hover:text-sage transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-gray-100 mt-2">
              <Link
                href="/contact"
                className="btn btn-primary w-full justify-center"
              >
                Get Wellness Advice
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}