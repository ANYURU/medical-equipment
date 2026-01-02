import {defineType} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'answer', title: 'Answer', type: 'portableText', validation: (Rule) => Rule.required()},
    {
      name: 'category',
      title: 'FAQ Category',
      type: 'string',
      options: {list: ['general', 'products', 'services', 'ordering', 'support']},
      initialValue: 'general',
    },
    {name: 'order', title: 'Display Order', type: 'number', initialValue: 0},
  ],
  preview: {
    select: {title: 'question', category: 'category', order: 'order'},
    prepare({title, category, order}) {
      return {title, subtitle: `${category || 'general'} - Order: ${order || 0}`}
    },
  },
})
