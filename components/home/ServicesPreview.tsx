import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ServicesGrid from '@/components/home/ServicesGrid'
import type { ServiceCategory, Gallery } from '@/types'

interface ServicesPreviewProps {
  services: ServiceCategory[]
  galleries: Gallery[]
}

export default function ServicesPreview({ services, galleries }: ServicesPreviewProps) {
  return (
    <section className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section label */}
        <AnimatedSection duration={1.1}>
          <p className="text-xs font-sans tracking-ultra uppercase text-parchment-600 mb-10 text-center">
            Þjónusta
          </p>
        </AnimatedSection>

        {/* Service grid — each card staggered in */}
        <ServicesGrid services={services} galleries={galleries} />

        {/* CTA */}
        <AnimatedSection delay={0.2} duration={1.0}>
          <div className="text-center mt-16">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 text-xs font-sans tracking-widest uppercase text-parchment-700 hover:text-parchment-900 transition-colors duration-300 border-b border-parchment-300 hover:border-parchment-700 pb-0.5"
            >
              Skoða alla þjónustu
              <span aria-hidden>→</span>
            </Link>
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
