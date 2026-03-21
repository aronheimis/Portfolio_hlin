import type { Metadata } from 'next'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import PortableText from '@/components/ui/PortableText'

export const metadata: Metadata = {
  title: 'Um mig',
  description:
    'Hlín Guðmundsdóttir er fagleg ljósmyndari með aðsetur í Reykjavík. Hún tekur portrett-, fjölskyldu- og viðburðamyndir með hlýlegum og náttúrulegum stíl.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'Um mig | Hlín Guðmundsdóttir – Ljósmyndari Reykjavík',
    description:
      'Hlín Guðmundsdóttir er fagleg ljósmyndari með aðsetur í Reykjavík. Hún tekur portrett-, fjölskyldu- og viðburðamyndir með hlýlegum og náttúrulegum stíl.',
  },
}

export default async function AboutPage() {
  const settings = await getSiteSettings()

  const aboutLong = settings?.aboutLong
  const hasImage = !!settings?.aboutImage

  return (
    <div className="min-h-screen pt-32 pb-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <AnimatedSection>
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide text-parchment-900 mb-4">
            Um mig
          </h1>
          <div className="w-12 h-px bg-parchment-700 mb-16" />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Text ───────────────────────────────────────────────────── */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-8">
              {settings?.aboutShort && (
                <p className="font-serif text-2xl md:text-3xl font-light leading-relaxed text-parchment-900">
                  {settings.aboutShort}
                </p>
              )}

              {aboutLong && aboutLong.length > 0 && (
                <div className="prose-custom">
                  <PortableText value={aboutLong} />
                </div>
              )}

              <div className="pt-4 space-y-2">
                <p className="text-sm font-sans tracking-widest uppercase text-parchment-600">
                  Staðsetning
                </p>
                <p className="font-serif text-xl text-parchment-900">
                  Reykjavík, Ísland
                </p>
              </div>

              {settings?.instagramUrl && (
                <div className="pt-2">
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-sans tracking-widest uppercase text-parchment-700 hover:text-parchment-900 transition-colors duration-300 border-b border-parchment-300 hover:border-parchment-700 pb-0.5"
                  >
                    Instagram
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* ── Image (always on right, placeholder if none uploaded) ──── */}
          <AnimatedSection delay={0.2}>
            <div className="relative aspect-[3/4] overflow-hidden bg-parchment-100">
              {hasImage ? (
                <Image
                  src={urlFor(settings!.aboutImage!).width(900).height(1200).fit('crop').auto('format').url()}
                  alt={`Hlín Guðmundsdóttir, ljósmyndari`}
                  fill
                  className="object-cover"
                  placeholder={settings?.aboutImageLqip ? 'blur' : 'empty'}
                  blurDataURL={settings?.aboutImageLqip}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-parchment-300 text-xs font-sans tracking-widest uppercase">
                    Mynd bráðum
                  </span>
                </div>
              )}
            </div>
          </AnimatedSection>

        </div>
      </div>
    </div>
  )
}
