import {defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
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
    {name: 'subtitle', title: 'Subtitle', type: 'string'},
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    },
    {name: 'featuredImage', title: 'Featured Image', type: 'image', options: {hotspot: true}},
    {
      name: 'template',
      title: 'Page Template',
      type: 'string',
      options: {list: ['default', 'about', 'contact', 'faq']},
      initialValue: 'default',
    },
    {name: 'showInNav', title: 'Show in Navigation', type: 'boolean', initialValue: false},
    {
      name: 'navOrder',
      title: 'Navigation Order',
      type: 'number',
      hidden: ({document}) => !document?.showInNav,
    },
    {name: 'parentPage', title: 'Parent Page', type: 'reference', to: [{type: 'page'}]},
    {name: 'seo', title: 'SEO', type: 'seo'},
  ],
  preview: {
    select: {title: 'title', media: 'featuredImage', showInNav: 'showInNav', template: 'template'},
    prepare({title, media, showInNav, template}) {
      return {title, subtitle: `${template || 'default'} ${showInNav ? '📍 In Nav' : ''}`, media}
    },
  },
})
