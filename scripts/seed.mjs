/**
 * Sanity seed script — creates all 8 gallery folders ready for photos.
 *
 * Usage:
 *   1. Add SANITY_API_WRITE_TOKEN to your .env.local (needs Editor permission)
 *   2. Run: npm run seed
 */

import { createClient } from '@sanity/client'
import { config } from 'dotenv'

// Load .env.local
config({ path: '.env.local' })

const WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN

if (!WRITE_TOKEN) {
  console.error('\n❌  Missing SANITY_API_WRITE_TOKEN in .env.local')
  console.error('   Get one at sanity.io/manage → API → Tokens → Add (Editor permission)\n')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: WRITE_TOKEN,
  useCdn: false,
})

// ─── The 8 service galleries ──────────────────────────────────────────────────

const GALLERIES = [
  {
    title: 'Stjórnendamyndatökur',
    serviceCategory: 'stjornendamyndatokur',
    slug: 'stjornendamyndatokur',
    description: 'Faglegar portrettmyndir af stjórnendum og leiðtogum fyrirtækja.',
  },
  {
    title: 'Starfsmannamyndatökur',
    serviceCategory: 'starfsmannamyndatokur',
    slug: 'starfsmannamyndatokur',
    description: 'Heildstæðar myndir af starfsfólki sem sýna menningu fyrirtækisins.',
  },
  {
    title: 'Iðn- og Heimildaljósmyndun',
    serviceCategory: 'idn-og-heimildaljósmyndun',
    slug: 'idn-og-heimildaljósmyndun',
    description: 'Skjölun á iðnaði, framleiðsluferlum og sérhæfðum verkum.',
  },
  {
    title: 'Viðburðaljósmyndun',
    serviceCategory: 'vidburadaljósmyndun',
    slug: 'vidburadaljósmyndun',
    description: 'Hlín fangar sérhvert augnablik á ráðstefnum, opnunum og viðburðum.',
  },
  {
    title: 'Vöruljósmyndun',
    serviceCategory: 'voruljósmyndun',
    slug: 'voruljósmyndun',
    description: 'Myndir sem kynna vörur þínar í besta ljósi.',
  },
  {
    title: 'Fermingamyndir',
    serviceCategory: 'fermingamyndir',
    slug: 'fermingamyndir',
    description: 'Hlýlegar og vandvirktar fermingamyndir.',
  },
  {
    title: 'Fjölskyldurmyndir',
    serviceCategory: 'fjolskyldurmyndir',
    slug: 'fjolskyldurmyndir',
    description: 'Náttúrulegar fjölskylduímyndir á útivist eða í heimili.',
  },
  {
    title: 'Brúðkaup',
    serviceCategory: 'brudkaup',
    slug: 'brudkaup',
    description: 'Hlín flytur fram tilfinningarnar á brúðkaupsdag með listrænum hætti.',
  },
]

// ─── Run ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('\n🌱  Seeding Sanity with gallery folders...\n')

  // Check what already exists so we don't create duplicates
  const existing = await client.fetch(
    `*[_type == "gallery"]{ serviceCategory }`
  )
  const existingCategories = new Set(existing.map((g) => g.serviceCategory))

  let created = 0
  let skipped = 0

  for (const gallery of GALLERIES) {
    if (existingCategories.has(gallery.serviceCategory)) {
      console.log(`  ⏭  Skipped  — ${gallery.title} (already exists)`)
      skipped++
      continue
    }

    await client.create({
      _type: 'gallery',
      title: gallery.title,
      slug: { _type: 'slug', current: gallery.slug },
      description: gallery.description,
      serviceCategory: gallery.serviceCategory,
      publishedAt: new Date().toISOString(),
      featured: false,
      order: GALLERIES.indexOf(gallery) + 1,
      photos: [],
    })

    console.log(`  ✅  Created — ${gallery.title}`)
    created++
  }

  console.log(`\n✨  Done. ${created} created, ${skipped} skipped.\n`)
  console.log('   Open /admin → Söfn / Verkefni to see your galleries.\n')
  console.log('   Next steps:')
  console.log('   1. Upload photos in Ljósmyndir')
  console.log('   2. Open a gallery and add photos to it via the Myndir field')
  console.log('   3. Upload a cover image for each gallery\n')
}

seed().catch((err) => {
  console.error('\n❌  Seed failed:', err.message, '\n')
  process.exit(1)
})
