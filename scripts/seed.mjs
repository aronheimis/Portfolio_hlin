/**
 * Sanity seed script — creates all 7 gallery folders ready for photos.
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

// ─── The 7 service galleries ──────────────────────────────────────────────────

const GALLERIES = [
  {
    title: 'Portrettmyndataka',
    serviceCategory: 'portrettmyndataka',
    slug: 'portrettmyndataka',
    description: 'Einlægar og náttúrulegar portrettmyndir sem endurspegla persónuleika hvers og eins.',
  },
  {
    title: 'Fjölskyldumyndataka',
    serviceCategory: 'fjolskyldumyndataka',
    slug: 'fjolskyldumyndataka',
    description: 'Náttúrulegar fjölskyldumyndir á útivist eða í heimili.',
  },
  {
    title: 'Meðgöngumyndataka',
    serviceCategory: 'medgongumyndataka',
    slug: 'medgongumyndataka',
    description: 'Fagleg og hlýleg myndataka sem fangar þessa sérstöku stund á meðgöngunni.',
  },
  {
    title: 'Ungbarnamyndataka',
    serviceCategory: 'ungbarnamyndataka',
    slug: 'ungbarnamyndataka',
    description: 'Hlín fangar fyrstu daga nýbura — augnablik sem fjölskyldur geyma um langan aldur.',
  },
  {
    title: 'Skírnarmyndataka',
    serviceCategory: 'skirnarmyndataka',
    slug: 'skirnarmyndataka',
    description: 'Hlýleg myndataka af skírn barnsins og fjölskyldunnar.',
  },
  {
    title: 'Brúðkaupsmyndataka',
    serviceCategory: 'brudkaupsmyndataka',
    slug: 'brudkaupsmyndataka',
    description: 'Hlín flytur fram tilfinningarnar á brúðkaupsdag með listrænum og náttúrulegum hætti.',
  },
  {
    title: 'Starfsmannamyndataka',
    serviceCategory: 'starfsmannamyndataka',
    slug: 'starfsmannamyndataka',
    description: 'Faglegar portrett- og starfsmannamyndir fyrir vefsíður og markaðsefni.',
  },
  {
    title: 'Íþróttaljósmyndun',
    serviceCategory: 'ithrottaljósmyndun',
    slug: 'ithrottaljósmyndun',
    description: 'Myndataka af íþróttaviðburðum og íþróttafólki.',
  },
]

// ─── Run ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('\n🌱  Seeding Sanity with gallery folders...\n')

  // Fetch all existing galleries
  const existing = await client.fetch(
    `*[_type == "gallery"]{ _id, serviceCategory, title }`
  )

  const newCategoryValues = new Set(GALLERIES.map((g) => g.serviceCategory))

  // Delete galleries whose serviceCategory is no longer in the new lineup
  let deleted = 0
  for (const g of existing) {
    if (!newCategoryValues.has(g.serviceCategory)) {
      await client.delete(g._id)
      console.log(`  🗑  Deleted  — ${g.title ?? g.serviceCategory} (old category)`)
      deleted++
    }
  }
  if (deleted > 0) console.log()

  // Re-fetch after deletions
  const remaining = await client.fetch(
    `*[_type == "gallery"]{ serviceCategory }`
  )
  const existingCategories = new Set(remaining.map((g) => g.serviceCategory))

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

  console.log(`\n✨  Done. ${deleted} deleted, ${created} created, ${skipped} skipped.\n`)
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
