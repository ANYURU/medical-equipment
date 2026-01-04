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
      name: 'statsSection',
      title: 'Stats Section',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Heading', type: 'string', initialValue: 'Why Choose Medequip Uganda'},
        {
          name: 'stats',
          title: 'Statistics',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'stat'}]}],
          validation: (Rule) => Rule.max(6),
        },
      ],
    },
    {
      name: 'distributorsSection',
      title: 'Distributors/Brands Section',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Heading', type: 'string', initialValue: 'Authorized Distributors of Leading Brands'},
        {
          name: 'distributors',
          title: 'Distributors',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'distributor'}]}],
        },
      ],
    },
    {
      name: 'whyChooseUsSection',
      title: 'Why Choose Us Section',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Heading', type: 'string', initialValue: 'Why Healthcare Facilities Choose Us'},
        {name: 'description', title: 'Description', type: 'string'},
        {
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'feature'}]}],
          validation: (Rule) => Rule.max(6),
        },
      ],
    },
    {
      name: 'missionVisionSection',
      title: 'Mission & Vision Section',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Our Story'},
        {name: 'description', title: 'Description', type: 'string'},
        {name: 'mission', title: 'Mission Text', type: 'text', rows: 4},
        {name: 'missionMetric', title: 'Mission Metric', type: 'string', initialValue: '98% Support Satisfaction Rate'},
        {name: 'vision', title: 'Vision Text', type: 'text', rows: 4},
        {name: 'visionMetric', title: 'Vision Metric', type: 'string', initialValue: 'Serving Multiple East African Countries'},
      ],
    },
    {
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Heading', type: 'string', initialValue: 'What Our Clients Say'},
        {name: 'description', title: 'Description', type: 'string'},
        {
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'testimonial'}]}],
          validation: (Rule) => Rule.max(6),
        },
      ],
    },
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
