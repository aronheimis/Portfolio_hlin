'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { Photo } from '@/types'

interface GalleryGridProps {
  photos: Photo[]
}

export default function GalleryGrid({ photos }: GalleryGridProps) {
  return (
    <div className="masonry-grid" role="list">
      {photos.map((photo, i) => (
        <motion.div
          key={photo._id}
          role="listitem"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.6,
            delay: (i % 3) * 0.07,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="masonry-item"
        >
          <div className="relative overflow-hidden bg-parchment-100 group">
            <Image
              src={urlFor(photo.image).width(1200).auto('format').url()}
              alt={photo.alt}
              width={1200}
              height={0}
              className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              placeholder={photo.lqip ? 'blur' : 'empty'}
              blurDataURL={photo.lqip}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {photo.caption && (
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <p className="text-white/90 text-xs font-sans px-4 pb-4 leading-relaxed">
                  {photo.caption}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
