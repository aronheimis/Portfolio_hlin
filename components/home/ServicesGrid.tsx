'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity/image'
import type { ServiceCategory, Gallery } from '@/types'

interface Props {
  services: ServiceCategory[]
  galleries: Gallery[]
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
}

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function ServicesGrid({ services, galleries }: Props) {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {services.map((service) => {
        const coverGallery = galleries.find(
          (g) => g.serviceCategory === service.value
        )
        const hasImage = !!coverGallery?.coverImage

        return (
          <motion.div key={service.value} variants={card}>
            <Link
              href={`/services#${service.value}`}
              className="group block"
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
              <div className="mt-3">
                <p className="font-serif text-base font-light text-parchment-900 group-hover:text-parchment-600 transition-colors duration-300">
                  {service.label}
                </p>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
