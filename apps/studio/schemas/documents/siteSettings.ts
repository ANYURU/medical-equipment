import {defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {name: 'siteName', title: 'Site Name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'siteUrl', title: 'Site URL', type: 'url', validation: (Rule) => Rule.required()},
    {name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}},
    {name: 'favicon', title: 'Favicon', type: 'image'},
    {name: 'seo', title: 'Default SEO', type: 'seo'},
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {name: 'email', title: 'Email', type: 'string'},
        {name: 'phone', title: 'Phone', type: 'string'},
        {name: 'address', title: 'Address', type: 'text', rows: 3},
        {name: 'workingHours', title: 'Working Hours', type: 'string'},
      ],
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {name: 'facebook', title: 'Facebook', type: 'url'},
        {name: 'twitter', title: 'Twitter', type: 'url'},
        {name: 'linkedin', title: 'LinkedIn', type: 'url'},
        {name: 'instagram', title: 'Instagram', type: 'url'},
        {name: 'youtube', title: 'YouTube', type: 'url'},
      ],
    },
    {name: 'footerText', title: 'Footer Text', type: 'text', rows: 2},
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
