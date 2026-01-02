import {defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    },
    {name: 'description', title: 'Description', type: 'text', rows: 3},
    {name: 'image', title: 'Category Image', type: 'image', options: {hotspot: true}},
    {name: 'icon', title: 'Icon', type: 'image'},
    {name: 'content', title: 'Content', type: 'portableText'},
    {name: 'order', title: 'Display Order', type: 'number', initialValue: 0},
    {name: 'seo', title: 'SEO', type: 'seo'},
  ],
  orderings: [{title: 'Display Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', media: 'image', order: 'order'},
    prepare({title, media, order}) {
      return {title, subtitle: `Order: ${order || 0}`, media}
    },
  },
})
