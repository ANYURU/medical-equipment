import {defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {name: 'name', title: 'Product Name', type: 'string', validation: (Rule) => Rule.required()},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    },
    {name: 'sku', title: 'SKU', type: 'string'},
    {name: 'description', title: 'Short Description', type: 'text', rows: 3},
    {name: 'content', title: 'Detailed Content', type: 'portableText'},
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', type: 'string', title: 'Alt Text'}],
        },
      ],
    },
    {name: 'brand', title: 'Brand', type: 'reference', to: [{type: 'brand'}]},
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required()},
          ],
          preview: {
            select: {label: 'label', value: 'value'},
            prepare: ({label, value}) => ({title: `${label}: ${value}`}),
          },
        },
      ],
    },
    {name: 'features', title: 'Key Features', type: 'array', of: [{type: 'string'}]},
    {name: 'applications', title: 'Applications', type: 'array', of: [{type: 'string'}]},
    {name: 'featured', title: 'Featured Product', type: 'boolean', initialValue: false},
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {list: ['available', 'coming_soon', 'discontinued']},
      initialValue: 'available',
    },
    {name: 'seo', title: 'SEO', type: 'seo'},
  ],
  preview: {
    select: {title: 'name', media: 'mainImage', brand: 'brand.name', featured: 'featured'},
    prepare({title, media, brand, featured}) {
      return {title, subtitle: `${brand || 'No Brand'} ${featured ? '⭐' : ''}`, media}
    },
  },
})
