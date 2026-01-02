import {defineType} from 'sanity'

export default defineType({
  name: 'brandReference',
  title: 'Brand Reference',
  type: 'object',
  fields: [
    {
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{type: 'brand'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {title: 'brand.name', logo: 'brand.logo', featured: 'featured'},
    prepare({title, logo, featured}) {
      return {title: title || 'Untitled', subtitle: featured ? '⭐ Featured' : '', media: logo}
    },
  },
})
