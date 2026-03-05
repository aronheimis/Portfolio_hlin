import type { MetadataRoute } from 'next'
import { SITE_NAME, DEFAULT_DESCRIPTION } from '@/lib/siteConfig'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Hlín',
    description: DEFAULT_DESCRIPTION,
    start_url: '/',
    display: 'browser',
    background_color: '#f5f1eb', // parchment-50
    theme_color: '#7c6f5e',      // parchment-600
    icons: [
      // Add actual icon files to /public when available
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
  }
}
