import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        parchment: {
          50: '#faf7f2',
          100: '#f4ede2',
          200: '#e8ddd0',
          300: '#d8c9b6',
          400: '#c3ad93',
          500: '#a98e70',
          600: '#8b7355',
          700: '#6b5a45',
          800: '#3d3530',
          900: '#1a1916',
        },
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
