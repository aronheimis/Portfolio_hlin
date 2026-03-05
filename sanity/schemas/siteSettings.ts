import { defineField, defineType } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Stillingar síðu',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Heiti síðu',
      type: 'string',
      initialValue: 'Hlín Guðmundsdóttir',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Undirskrift',
      type: 'string',
      description: 'Stuttur texti undir nafni á forsíðu.',
    }),
    defineField({
      name: 'description',
      title: 'Lýsing (SEO)',
      type: 'text',
      rows: 2,
      description: 'Lýsing síðunnar fyrir leitarvélar.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Netfang',
      type: 'string',
      initialValue: 'hlingudmunds@gmail.com',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram slóð',
      type: 'url',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook slóð',
      type: 'url',
    }),
    defineField({
      name: 'behanceUrl',
      title: 'Behance slóð',
      type: 'url',
    }),
    defineField({
      name: 'aboutShort',
      title: 'Um mig — stutt útgáfa',
      type: 'text',
      rows: 2,
      description: 'Eitt til tvær setningar. Birtist í farsíðuhluta.',
    }),
    defineField({
      name: 'aboutLong',
      title: 'Um mig — löng útgáfa',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Heill texti fyrir Um mig síðuna.',
    }),
    defineField({
      name: 'aboutImage',
      title: 'Mynd af ljósmyndara',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ogImage',
      title: 'Sjálfgefin OG mynd',
      type: 'image',
      description: 'Birtist þegar deilt er á samfélagsmiðla.',
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
    },
  },
})
