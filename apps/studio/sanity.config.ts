import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['siteSettings', 'homepage'])

export default defineConfig({
  name: 'default',
  title: 'Medical Equipment',

  projectId: 't1xfyfxz',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Homepage')
              .child(S.document().schemaType('homepage').documentId('homepage')),
            S.divider(),
            S.documentTypeListItem('category').title('Categories'),
            S.documentTypeListItem('brand').title('Brands'),
            S.documentTypeListItem('product').title('Products'),
            S.documentTypeListItem('service').title('Services'),
            S.divider(),
            S.documentTypeListItem('blogPost').title('Blog Posts'),
            S.documentTypeListItem('page').title('Pages'),
            S.documentTypeListItem('faq').title('FAQs'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
