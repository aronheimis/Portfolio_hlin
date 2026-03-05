import { defineField, defineType } from 'sanity'

/**
 * Reusable SEO object — embed in any document that needs per-page SEO overrides.
 * Usage in another schema:
 *   defineField({ name: 'seo', title: 'SEO', type: 'seo' })
 */
export const seoSchema = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO titill',
      type: 'string',
      description: 'Birtist í flipanum og í Google leitarniðurstöðum. Hámark 60 stafir.',
      validation: (rule) => rule.max(60).warning('Mælt er með að halda SEO titli undir 60 stöfum.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO lýsing',
      type: 'text',
      rows: 2,
      description: 'Stutt lýsing í leitarniðurstöðum. Hámark 160 stafir.',
      validation: (rule) =>
        rule.max(160).warning('Mælt er með að halda SEO lýsingu undir 160 stöfum.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Samfélagsmiðlamynd (OG Image)',
      type: 'image',
      description: 'Mynd sem birtist þegar deilt er á samfélagsmiðla. Mælt með 1200×630px.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL (valfrjálst)',
      type: 'url',
      description: 'Settu inn aðeins ef þessi síða á að vísa á aðra vefslóð sem upprunasíðu.',
    }),
  ],
})
