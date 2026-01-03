import {defineType} from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Feature',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon identifier (shield, clock, settings, dollar, document, lightning)',
      options: {
        list: [
          {title: 'Shield (Quality)', value: 'shield'},
          {title: 'Clock (24/7 Support)', value: 'clock'},
          {title: 'Settings (Installation)', value: 'settings'},
          {title: 'Dollar (Financing)', value: 'dollar'},
          {title: 'Document (Documentation)', value: 'document'},
          {title: 'Lightning (Fast Delivery)', value: 'lightning'},
        ],
      },
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
      title: 'title',
      subtitle: 'description',
      order: 'order',
    },
    prepare({title, subtitle, order}) {
      return {
        title,
        subtitle: `Order: ${order} - ${subtitle?.substring(0, 50)}...`,
      }
    },
  },
})
