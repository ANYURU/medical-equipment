import {defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Homepage',
      validation: (Rule) => Rule.required(),
    },
    {name: 'seo', title: 'SEO', type: 'seo'},
    {name: 'hero', title: 'Hero Section', type: 'hero', validation: (Rule) => Rule.required()},
    {
      name: 'introSection',
      title: 'Introduction Section',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Heading', type: 'string'},
        {name: 'content', title: 'Content', type: 'portableText'},
      ],
    },
    {
      name: 'featuredCategories',
      title: 'Featured Categories',
      type: 'array',
      of: [{type: 'categoryReference'}],
      validation: (Rule) => Rule.max(8),
    },
    {
      name: 'featuredBrands',
      title: 'Featured Brands',
      type: 'array',
      of: [{type: 'brandReference'}],
      validation: (Rule) => Rule.max(12),
    },
    {
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Heading', type: 'string'},
        {name: 'description', title: 'Description', type: 'text', rows: 2},
        {
          name: 'services',
          title: 'Featured Services',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'service'}]}],
          validation: (Rule) => Rule.max(6),
        },
      ],
    },
    {
      name: 'ctaSection',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Heading', type: 'string'},
        {name: 'description', title: 'Description', type: 'text', rows: 2},
        {name: 'primaryButtonText', title: 'Primary Button Text', type: 'string'},
        {name: 'primaryButtonLink', title: 'Primary Button Link', type: 'string'},
        {name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string'},
        {name: 'secondaryButtonLink', title: 'Secondary Button Link', type: 'string'},
      ],
    },
  ],
  preview: {
    prepare() {
      return {title: 'Homepage'}
    },
  },
})
