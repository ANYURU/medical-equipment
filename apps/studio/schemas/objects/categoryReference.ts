import { defineType } from 'sanity';

export default defineType({
  name: 'categoryReference',
  title: 'Category Reference',
  type: 'object',
  fields: [
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
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
    select: { title: 'category.title', featured: 'featured' },
    prepare({ title, featured }) {
      return { title: title || 'Untitled', subtitle: featured ? '⭐ Featured' : '' };
    },
  },
});