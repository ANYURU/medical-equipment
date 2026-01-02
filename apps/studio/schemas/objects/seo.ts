import {defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines (50-60 characters recommended)',
      validation: (Rule) => Rule.max(60).warning('Should be under 60 characters'),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (150-160 characters recommended)',
      validation: (Rule) => Rule.max(160).warning('Should be under 160 characters'),
    },
    {
      name: 'ogImage',
      title: 'Open Graph / Social Share Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended)',
      options: {hotspot: true},
    },
    {
      name: 'keywords',
      title: 'Focus Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    },
  ],
})
