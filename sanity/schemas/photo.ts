import { defineField, defineType } from 'sanity'
import { SERVICE_CATEGORY_OPTIONS } from '../constants'

export const photoSchema = defineType({
  name: 'photo',
  title: 'Ljósmynd',
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
      name: 'image',
      title: 'Mynd',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Lýsitexti (alt)',
      type: 'string',
      description: 'Stutt lýsing á myndinni fyrir sjónskerta notendur og leitarvélar.',
      validation: (rule) => rule.required().error('Alt texti er nauðsynlegur'),
    }),
    defineField({
      name: 'caption',
      title: 'Myndatexti',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Staðsetning',
      type: 'string',
    }),
    defineField({
      name: 'shotDate',
      title: 'Mynddagsetning',
      type: 'date',
    }),
    defineField({
      name: 'category',
      title: 'Flokkur',
      type: 'string',
      options: {
        list: SERVICE_CATEGORY_OPTIONS,
      },
    }),
    defineField({
      name: 'tags',
      title: 'Merki',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Í forsíðumyndakerfi',
      type: 'boolean',
      description: 'Birtist í hringrás á forsíðu.',
      initialValue: false,
    }),
    defineField({
      name: 'showInPortfolio',
      title: 'Sýna í safni',
      type: 'boolean',
      description: 'Birtist í aðalsafni (Portfolio síðan).',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Röðun',
      type: 'number',
      description: 'Lægri tala = fyrr í röð.',
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
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'category',
    },
  },
})
