import type { Metadata } from 'next'
import { PRICING, formatPrice } from '@/data/pricing'
import { SERVICES } from '@/types'
import type { Photo } from '@/types'
import { getGalleriesWithPhotos } from '@/lib/sanity/queries'
import PageHeader from '@/components/ui/PageHeader'
import AnimatedSection from '@/components/ui/AnimatedSection'
import VerdskraServiceActions from '@/components/services/VerdskraServiceActions'
import VerdskraSidebar from '@/components/verdskra/VerdskraSidebar'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Verðskrá',
  description:
    'Yfirlit yfir verð og pakka fyrir ljósmyndaþjónustu Hlínar Guðmundsdóttur — fjölskyldumyndataka, brúðkaup og fleira.',
  alternates: { canonical: '/verdskra' },
  openGraph: {
    title: `Verðskrá | ${SITE_NAME}`,
    description: 'Verð og pakkar fyrir ljósmyndaþjónustu.',
  },
}

export default async function VerdskraPage() {
  // Fetch galleries with photos so the popup can show them
  const galleries = await getGalleriesWithPhotos()

  // Sidebar item list — derived from PRICING so it stays in sync automatically
  const sidebarServices = PRICING.map(({ slug, title }) => ({ slug, title }))

  return (
    <>
      <PageHeader title="Verðskrá" />

      {/* ── Page shell: wider container to accommodate sidebar ───────── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-32">

        {/* ── Sidebar + content flex layout ──────────────────────────── */}
        {/* On mobile: sidebar renders mobile pills first, then content   */}
        {/* On desktop (lg+): flex row — sidebar left, content right      */}
        <div className="lg:flex lg:gap-16 lg:items-start">

          {/* Sidebar: mobile pills (lg:hidden) + desktop aside (hidden lg:block) */}
          <VerdskraSidebar services={sidebarServices} />

          {/* ── Main content ─────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* ── Pricing blocks (one per service type) ─────────────── */}
            <div className="space-y-28">
              {PRICING.map((service, si) => {
                const serviceInfo = SERVICES.find((s) => s.value === service.slug)

                // Photos for this service — passed to the photo popup
                const photos: Photo[] = galleries
                  .filter((g) => g.serviceCategory === service.slug)
                  .flatMap((g) => g.photos ?? [])

                return (
                  <AnimatedSection key={service.slug} delay={si * 0.08}>
                    {/*
                      id={service.slug} — jump target for sidebar links
                      scroll-mt-[104px] — CSS anchor fallback:
                        80px fixed header + 24px breathing room
                    */}
                    <section id={service.slug} className="scroll-mt-[104px]">

                      {/* Service heading */}
                      <div className="mb-12">
                        <h2 className="font-serif text-4xl md:text-5xl font-light text-parchment-900 mb-4">
                          {service.title}
                        </h2>
                        {serviceInfo?.description && (
                          <p className="max-w-lg font-sans text-base leading-relaxed text-parchment-600">
                            {serviceInfo.description}
                          </p>
                        )}
                      </div>

                      {/* Package grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {service.packages.map((pkg, pi) => (
                          <div
                            key={pi}
                            className="border border-parchment-200 p-6 hover:border-parchment-400 transition-colors duration-300 flex flex-col"
                          >
                            <h3 className="font-serif text-2xl font-light text-parchment-900 mb-1">
                              {pkg.name}
                            </h3>
                            <p className="font-sans text-lg text-parchment-800 tabular-nums mb-6">
                              {formatPrice(pkg.priceISK)}
                            </p>

                            <ul className="space-y-2.5 flex-1">
                              {pkg.includes.map((item, j) => (
                                <li
                                  key={j}
                                  className="flex items-start gap-3 text-sm font-sans text-parchment-700"
                                >
                                  <span className="mt-[7px] w-1 h-1 rounded-full bg-parchment-400 flex-none" />
                                  {item}
                                </li>
                              ))}
                            </ul>

                            {pkg.notes && (
                              <p className="mt-5 pt-4 border-t border-parchment-100 text-xs font-sans text-parchment-500">
                                {pkg.notes}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* "Skoða myndir" — opens photo popup (client) */}
                      <div className="mt-8">
                        <VerdskraServiceActions
                          photos={photos}
                          serviceTitle={service.title}
                          serviceSlug={service.slug}
                        />
                      </div>

                    </section>
                  </AnimatedSection>
                )
              })}
            </div>

            {/* ── Footer note ─────────────────────────────────────────── */}
            <AnimatedSection delay={0.1}>
              <div className="mt-28 pt-12 border-t border-parchment-200 text-center">
                <p className="font-sans text-sm text-parchment-600 leading-relaxed max-w-md mx-auto mb-8">
                  Verðskrá fyrir aðra þjónustu er bráðum tiltæk. Hafðu samband
                  til að fá sérsniðið tilboð.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 text-xs font-sans tracking-widest uppercase text-parchment-700 hover:text-parchment-900 transition-colors duration-300 border-b border-parchment-300 hover:border-parchment-700 pb-0.5"
                >
                  Hafa samband
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </AnimatedSection>

          </div>{/* /main content */}
        </div>{/* /flex layout */}
      </div>
    </>
  )
}
