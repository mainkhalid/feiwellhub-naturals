import logo from './images/feiwell-logo.png'
export { default as nerveSupplements } from './images/nerve-supplements.jpg'
export { default as heroAloeSplash }    from './images/hero-aloe-splash.jpg'
export { default as immuneSupport }     from './images/immune-support.jpg'
export { default as heroAvocado }       from './images/hero-avocado-splash.jpg'
export { default as heroEssentialOil }  from './images/hero-essential-oil-drop.jpg'
export {default as jointSupplements} from './images/joint-supplements.jpg'
export {default as vitaminSupplements} from './images/vitamin-supplements.jpg'

export { default as kebsBadge }        from './images/kebsBadge.png'
export { default as gmpBadge }         from './images/gmpBadge.png'
export { default as naturalBadge }     from './images/naturalBadge.jpg'
export { default as labBadge }         from './images/labTestedBadge.jpg'

export const HERO_SLIDES = [
  {
    id:      1,
    image:   require('./images/nerve-supplements.jpg').default,
    tag:     'Nerve & Pain Relief',
    heading: 'End the Tingling,\nBurning & Numbness',
    subtext: 'Clinically-formulated supplements for peripheral neuropathy, nerve damage and chronic pain. Alpha Lipoic Acid, B12 and more.',
    cta:     { label: 'Shop Nerve Supplements', href: '/products?category=nerve-pain-relief' },
    align:   'left' as const,
    overlay: 'from-bark/75 via-bark/35 to-transparent',
  },
  {
    id:      2,
    image:   require('./images/immune-support.jpg').default,
    tag:     'Immune Support',
    heading: 'Strengthen Your\nImmune System',
    subtext: 'Science-backed vitamins, minerals and herbal extracts to build a resilient immune defence — naturally.',
    cta:     { label: 'Shop Immune Support', href: '/products?category=immune-support' },
    align:   'left' as const,
    overlay: 'from-bark/60 via-bark/20 to-transparent',
  },
  {
    id:      3,
    image:   require('./images/hero-avocado-splash.jpg').default,
    tag:     'Bone & Joint Health',
    heading: 'Move Freely,\nLive Fully',
    subtext: 'Glucosamine, chondroitin, collagen and calcium formulas for joint pain, arthritis and loss of movement.',
    cta:     { label: 'Shop Joint Supplements', href: '/products?category=bone-joint-health' },
    align:   'left' as const,
    overlay: 'from-black/65 via-black/25 to-transparent',
  },
  {
    id:      4,
    image:   require('./images/joint-supplements.jpg').default,
    tag:     'Joint Health',
    heading: 'Relieve Joint\nPain & Stiffness',
    subtext: 'Targeted formulas for arthritis, joint degeneration and loss of mobility.',
    cta:     { label: 'Shop Joint Supplements', href: '/products?category=bone-joint-health' },
    align:   'left' as const,
    overlay: 'from-bark/75 via-bark/35 to-transparent',
  },
  {
    id:      5,
    image:   require('./images/vitamin-supplements.jpg').default,
    tag:     'Vitamins & Minerals',
    heading: 'Essential Nutrients\nfor Optimal Health',
    subtext: 'High-quality vitamins and minerals to fill nutritional gaps and support overall wellness.',
    cta:     { label: 'Shop Vitamins', href: '/products?category=vitamins-minerals' },
    align:   'left' as const,
    overlay: 'from-bark/75 via-bark/35 to-transparent',
  },
]

export const PROMO_BANNERS = [
  {
    id:      1,
    image:   require('./images/hero-aloe-splash.jpg').default,
    tag:     'Most Popular',
    heading: 'Nerve Pain Bundle',
    body:    'Alpha Lipoic Acid + Vitamin B Complex + Magnesium — the three most studied supplements for tingling, numbness and burning pain.',
    cta:     { label: 'Shop Nerve Relief', href: '/products?category=nerve-pain-relief' },
    theme:   'light' as const,
  },
  {
    id:      2,
    image:   require('./images/hero-essential-oil-drop.jpg').default,
    tag:     'Breathing Support',
    heading: 'Asthma & Allergy Relief',
    body:    'Quercetin, NAC and magnesium — natural support for asthma, allergies and difficulty breathing.',
    cta:     { label: 'Shop Respiratory', href: '/products?category=respiratory-allergy' },
    theme:   'dark' as const,
  },
]
export const TRUST_BADGES = [
  {
    image: require('./images/kebsBadge.png').default,
    title: 'KEBS Certified',
    sub: 'Kenya Bureau of Standards',
    alt: 'Official Kenya Bureau of Standards Certification Seal',
  },
  {
    image: require('./images/gmpBadge.png').default,
    title: 'GMP Compliant',
    sub: 'Good Manufacturing Practice',
    alt: 'Good Manufacturing Practice Quality Assured Seal',
  },
  {
    image: require('./images/naturalBadge.jpg').default,
    title: '100% Natural',
    sub: 'No synthetic additives',
    alt: '100 Percent Natural Ingredients Badge',
  },
  {
    image: require('./images/labTestedBadge.jpg').default,
    title: 'Lab Tested',
    sub: 'Every batch verified',
    alt: 'Independent Laboratory Tested and Verified Badge',
  },
]


export const SITE = {
  name:      'Faiwellhub Naturals',
  tagline:   'Naturals',
  logo,
  whatsapp:  '254715945238',
  email:     'sales@faiwellhub.co.ke',
  phone:     '+254 715 945 238',
  location:  'Nairobi, Kenya',
  instagram: '',
  facebook:  '',
  twitter:   '',
}
