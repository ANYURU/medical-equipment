import {defineType} from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partner/Brand',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      order: 'order',
    },
    prepare({title, media, order}) {
      return {
        title,
        subtitle: `Order: ${order}`,
        media,
      }
    },
  },
})
