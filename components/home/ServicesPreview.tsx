import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
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

        {/* Service grid */}
        <AnimatedSection duration={1.2} delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {services.map((service) => {
            const coverGallery = galleries.find(
              (g) => g.serviceCategory === service.value
            )
            const hasImage = !!coverGallery?.coverImage

            return (
              <Link
                key={service.value}
                href={`/services#${service.value}`}
                className="group block bg-parchment-100 overflow-hidden"
              >
                  {/* Thumbnail */}
                  <div className="relative aspect-square overflow-hidden bg-parchment-100">
                    {hasImage ? (
                      <Image
                        src={urlFor(coverGallery!.coverImage)
                          .width(600)
                          .height(600)
                          .fit('crop')
                          .auto('format')
                          .url()}
                        alt={service.label}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        placeholder={coverGallery?.coverLqip ? 'blur' : 'empty'}
                        blurDataURL={coverGallery?.coverLqip}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-parchment-300 text-xs font-sans tracking-widest uppercase">
                          Mynd bráðum
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                  </div>

                  {/* Label */}
                  <div className="px-4 py-4">
                    <p className="font-serif text-base font-light text-parchment-900 group-hover:text-parchment-600 transition-colors duration-300">
                      {service.label}
                    </p>
                  </div>
              </Link>
            )
          })}
        </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.3}>
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
