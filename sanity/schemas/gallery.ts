import { defineField, defineType } from 'sanity'
import { SERVICE_CATEGORY_OPTIONS } from '../constants'

export const gallerySchema = defineType({
  name: 'gallery',
  title: 'Safn / Verkefni',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titill',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slóð',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Forsíðumynd',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Lýsing',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'serviceCategory',
      title: 'Þjónustuflokk',
      type: 'string',
      options: {
        list: SERVICE_CATEGORY_OPTIONS,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Birting',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'photos',
      title: 'Myndir',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'photo' }],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Áberandi safn',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Röðun',
      type: 'number',
      description: 'Lægri tala = fyrr í röð innan flokks.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO stillingar',
      type: 'seo',
      description: 'Valfrjálst — hnekkir sjálfgefnum SEO titli og lýsingu fyrir þetta safn.',
    }),
  ],
  orderings: [
    {
      title: 'Röðun',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Nýjast fyrst',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'serviceCategory',
    },
  },
})
