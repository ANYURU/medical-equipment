import { defineType } from 'sanity';

export default defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    { name: 'name', title: 'Brand Name', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() },
    { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
    { name: 'description', title: 'Short Description', type: 'text', rows: 3 },
    { name: 'content', title: 'Detailed Content', type: 'portableText' },
    { name: 'website', title: 'Brand Website', type: 'url' },
    { name: 'bannerImage', title: 'Banner Image', type: 'image', options: { hotspot: true } },
    { name: 'country', title: 'Country of Origin', type: 'string' },
    { name: 'certifications', title: 'Certifications', type: 'array', of: [{ type: 'string' }] },
    { name: 'featured', title: 'Featured Brand', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Display Order', type: 'number', initialValue: 0 },
    { name: 'seo', title: 'SEO', type: 'seo' },
  ],
  preview: {
    select: { title: 'name', media: 'logo', featured: 'featured', order: 'order' },
    prepare({ title, media, featured, order }) {
      return { title, subtitle: `Order: ${order || 0} ${featured ? '⭐' : ''}`, media };
    },
  },
});