import {defineType} from 'sanity'

export default defineType({
  name: 'stat',
  title: 'Statistic',
  type: 'document',
  fields: [
    {
      name: 'value',
      title: 'Value',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'suffix',
      title: 'Suffix',
      type: 'string',
      description: 'e.g., "+", "%", "K", "M"',
      initialValue: '+',
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
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
      value: 'value',
      suffix: 'suffix',
      label: 'label',
      order: 'order',
    },
    prepare({value, suffix, label, order}) {
      return {
        title: `${value}${suffix || ''} - ${label}`,
        subtitle: `Order: ${order}`,
      }
    },
  },
})
