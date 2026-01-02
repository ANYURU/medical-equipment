import {defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {name: 'title', title: 'Service Title', type: 'string', validation: (Rule) => Rule.required()},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    },
    {name: 'subtitle', title: 'Subtitle', type: 'string'},
    {name: 'description', title: 'Short Description', type: 'text', rows: 3},
    {name: 'icon', title: 'Icon', type: 'image'},
    {name: 'image', title: 'Featured Image', type: 'image', options: {hotspot: true}},
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {name: 'description', title: 'Description', type: 'text', rows: 2},
          ],
        },
      ],
    },
    {name: 'benefits', title: 'Benefits', type: 'array', of: [{type: 'string'}]},
    {
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
    },
    {
      name: 'relatedBrands',
      title: 'Related Brands',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'brand'}]}],
    },
    {name: 'order', title: 'Display Order', type: 'number', initialValue: 0},
    {name: 'seo', title: 'SEO', type: 'seo'},
  ],
  preview: {
    select: {title: 'title', media: 'image', order: 'order'},
    prepare({title, media, order}) {
      return {title, subtitle: `Order: ${order || 0}`, media}
    },
  },
})
