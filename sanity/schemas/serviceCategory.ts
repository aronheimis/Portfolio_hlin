import { defineField, defineType } from 'sanity'
import { SERVICE_CATEGORY_OPTIONS } from '../constants'

export const serviceCategorySchema = defineType({
  name: 'serviceCategory',
  title: 'Þjónustuflokkar',
  type: 'document',
  fields: [
    defineField({
      name: 'value',
      title: 'Flokkur',
      type: 'string',
      options: {
        list: SERVICE_CATEGORY_OPTIONS,
      },
      validation: (rule) => rule.required(),
      description: 'Veldu þjónustuflokkinn sem þessi lýsing tilheyrir.',
    }),
    defineField({
      name: 'description',
      title: 'Lýsing',
      type: 'text',
      rows: 4,
      description: 'Stutt lýsing á þjónustunni sem birtist á þjónustusíðunni.',
    }),
  ],
  preview: {
    select: {
      value: 'value',
      subtitle: 'description',
    },
    prepare({ value, subtitle }) {
      const option = SERVICE_CATEGORY_OPTIONS.find((o) => o.value === value)
      return {
        title: option?.title ?? value ?? 'Ónefndur flokkur',
        subtitle: subtitle ?? '—',
      }
    },
  },
})
