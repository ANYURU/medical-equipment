import {createClient} from '@sanity/client'
import {createReadStream} from 'fs'
import {resolve} from 'path'

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 't1xfyfxz',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

export async function uploadImage(filePath: string, filename: string) {
  const stream = createReadStream(resolve(filePath))
  const asset = await client.assets.upload('image', stream, {filename})
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }
}
