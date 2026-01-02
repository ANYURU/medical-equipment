import { defineType } from 'sanity';

export default defineType({
  name: 'portableText',
  title: 'Rich Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              { name: 'href', type: 'string', title: 'URL' },
              { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab', initialValue: false },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternative Text', validation: (Rule) => Rule.required() },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
    },
  ],
});