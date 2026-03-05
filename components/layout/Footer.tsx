import Link from 'next/link'
import type { SiteSettings } from '@/types'
import CookieSettingsButton from './CookieSettingsButton'

interface FooterProps {
  settings: SiteSettings | null
}

export default function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-parchment-200 bg-parchment-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand */}
          <Link
            href="/"
            className="font-serif text-base tracking-[0.15em] uppercase text-parchment-900 hover:text-parchment-600 transition-colors duration-300"
          >
            {settings?.siteTitle ?? 'Hlín Guðmundsdóttir'}
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              { href: '/services', label: 'Þjónusta' },
              { href: '/about', label: 'Um mig' },
              { href: '/contact', label: 'Hafa samband' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs font-sans tracking-widest uppercase text-parchment-600 hover:text-parchment-900 transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-6">
            {settings?.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-xs font-sans tracking-widest uppercase text-parchment-600 hover:text-parchment-900 transition-colors duration-300"
              >
                Instagram
              </a>
            )}
            {settings?.behanceUrl && (
              <a
                href={settings.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Behance"
                className="text-xs font-sans tracking-widest uppercase text-parchment-600 hover:text-parchment-900 transition-colors duration-300"
              >
                Behance
              </a>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-parchment-100 text-center">
          <p className="text-xs font-sans text-parchment-400 tracking-wide">
            © {year} {settings?.siteTitle ?? 'Hlín Guðmundsdóttir'}. Öll réttindi áskilin.
          </p>

          {/* Legal & cookie links */}
          <div className="mt-3 flex flex-wrap justify-center items-center gap-x-5 gap-y-2">
            {[
              { href: '/personuvernd', label: 'Persónuverndarstefna' },
              { href: '/cookies', label: 'Cookie-stefna' },
              { href: '/skilmalar', label: 'Skilmálar' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[11px] font-sans text-parchment-300 hover:text-parchment-500 transition-colors duration-200 tracking-wide"
              >
                {label}
              </Link>
            ))}
            <span className="text-parchment-200 select-none" aria-hidden>·</span>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  )
}
