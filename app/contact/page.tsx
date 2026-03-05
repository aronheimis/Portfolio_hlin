import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/sanity/queries'
import PageHeader from '@/components/ui/PageHeader'
import ContactForm from '@/components/contact/ContactForm'
import AnimatedSection from '@/components/ui/AnimatedSection'
import JsonLd from '@/components/JsonLd'
import { buildPhotographerJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Hafa samband',
  description:
    'Hafðu samband við Hlínu Guðmundsdóttur, ljósmyndara í Reykjavík. Við skulum ræða verkefni þitt – portrett, brúðkaup, fjölskylda eða viðburðir.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Hafa samband | Hlín Guðmundsdóttir – Ljósmyndari Reykjavík',
    description:
      'Hafðu samband við Hlínu Guðmundsdóttur, ljósmyndara í Reykjavík. Við skulum ræða verkefni þitt.',
  },
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  const jsonLd = buildPhotographerJsonLd({
    instagramUrl: settings?.instagramUrl,
    description: settings?.description,
  })

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHeader
        title="Hafa samband"
        subtitle="Við skulum ræða verkefni þitt"
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

          {/* ── Contact info ───────────────────────────────────────────── */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-12">
              <div>
                <p className="text-sm font-sans tracking-widest uppercase text-parchment-600 mb-3">
                  Netfang
                </p>
                <a
                  href={`mailto:${settings?.contactEmail ?? 'hlingudmunds@gmail.com'}`}
                  className="font-serif text-xl text-parchment-900 hover:text-parchment-600 transition-colors duration-300 border-b border-parchment-300 hover:border-parchment-600 pb-0.5"
                >
                  {settings?.contactEmail ?? 'hlingudmunds@gmail.com'}
                </a>
              </div>

              <div>
                <p className="text-sm font-sans tracking-widest uppercase text-parchment-600 mb-3">
                  Staðsetning
                </p>
                <p className="font-serif text-xl text-parchment-900">
                  Reykjavík, Ísland
                </p>
              </div>

              {settings?.instagramUrl && (
                <div>
                  <p className="text-sm font-sans tracking-widest uppercase text-parchment-600 mb-3">
                    Samfélagsmiðlar
                  </p>
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-xl text-parchment-900 hover:text-parchment-600 transition-colors duration-300 border-b border-parchment-300 hover:border-parchment-600 pb-0.5"
                  >
                    Instagram ↗
                  </a>
                </div>
              )}

              <div className="pt-6 border-t border-parchment-200">
                <p className="font-sans text-sm leading-relaxed text-parchment-700">
                  Hlín svarar öllum fyrirspurnum innan 48 klukkustunda.
                  Vinsamlegast lýstu verkefninu þínu í skilaboðunum.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* ── Form ───────────────────────────────────────────────────── */}
          <AnimatedSection delay={0.2}>
            <ContactForm />
          </AnimatedSection>

        </div>
      </div>
    </>
  )
}
