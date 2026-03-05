import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { ServiceCategory, Gallery } from '@/types'

interface ServiceSectionProps {
  service: ServiceCategory
  galleries: Gallery[]
}

export default function ServiceSection({ service, galleries }: ServiceSectionProps) {
  return (
    <section id={service.value}>
      {/* Section header */}
      <div className="mb-10">
        <h2 className="font-serif text-4xl md:text-5xl font-light text-parchment-900 mb-4">
          {service.label}
        </h2>
        <div className="w-10 h-px bg-parchment-600 mb-5" />
        <p className="max-w-lg font-sans text-base leading-relaxed text-parchment-700">
          {service.description}
        </p>
      </div>

      {/* Galleries */}
      {galleries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleries.map((gallery) => (
            <Link
              key={gallery._id}
              href={`/gallery/${gallery.slug.current}`}
              className="group block overflow-hidden bg-parchment-100"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {gallery.coverImage ? (
                  <Image
                    src={urlFor(gallery.coverImage)
                      .width(800)
                      .height(600)
                      .fit('crop')
                      .auto('format')
                      .url()}
                    alt={gallery.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    placeholder={gallery.coverLqip ? 'blur' : 'empty'}
                    blurDataURL={gallery.coverLqip}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-parchment-200">
                    <span className="text-parchment-400 text-xs font-sans tracking-widest uppercase">
                      Mynd bráðum
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              <div className="px-4 py-4">
                <p className="font-serif text-lg font-light text-parchment-900 group-hover:text-parchment-600 transition-colors duration-300">
                  {gallery.title}
                </p>
                {gallery.description && (
                  <p className="text-xs font-sans text-parchment-600 mt-1 line-clamp-1">
                    {gallery.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-parchment-200 rounded-sm py-12 text-center">
          <p className="text-parchment-400 text-xs font-sans tracking-widest uppercase">
            Söfn bráðum
          </p>
        </div>
      )}
    </section>
  )
}
