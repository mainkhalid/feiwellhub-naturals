/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF8F3',
          dark:    '#F3EFE6',
          deep:    '#EAE3D5',
        },
        bark: {
          DEFAULT: '#3D2B1F',
          mid:     '#6B4F3A',
          light:   '#A07855',
        },
        sage: {
          DEFAULT: '#6A8C69',
          light:   '#C8DEC7',
          pale:    '#EEF5EE',
        },
        gold: {
          DEFAULT: '#C4963A',
          pale:    '#F7EDDA',
        },
        text: {
          main:  '#2C1F14',
          muted: '#7A6656',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
        xl: '32px',
      },
      animation: {
        'fade-up':  'fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both',
        'marquee':  'marquee 28s linear infinite',
        'spin-slow':'spin 20s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          to: { transform: 'translateX(-33.333%)' },
        },
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
