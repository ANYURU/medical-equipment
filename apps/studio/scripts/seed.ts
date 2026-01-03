import {createClient} from '@sanity/client'
import {config} from 'dotenv'
import {resolve} from 'path'
import {siteSettingsData} from './data/siteSettings.js'
import {homepageData} from './data/homepage.js'
import {categoriesData} from './data/categories.js'
import {brandsData} from './data/brands.js'
import {productsData} from './data/products.js'
import {servicesData} from './data/services.js'
import {blogPostsData} from './data/blogPosts.js'
import {faqsData} from './data/faqs.js'
import {pagesData} from './data/pages.js'

// Load environment variables
config({path: resolve(process.cwd(), '.env.local')})

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 't1xfyfxz',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function seed() {
  console.log('🌱 Starting seed process...\n')
  console.log('🔑 Token:', process.env.SANITY_WRITE_TOKEN ? `${process.env.SANITY_WRITE_TOKEN.substring(0, 10)}...` : 'NOT FOUND')
  console.log('📦 Project ID:', process.env.SANITY_STUDIO_PROJECT_ID || 't1xfyfxz')
  console.log('📊 Dataset:', process.env.SANITY_STUDIO_DATASET || 'production')
  console.log('')

  try {
    console.log('📝 Creating site settings...')
    await client.create(siteSettingsData)
    
    console.log('📝 Creating homepage...')
    await client.create(homepageData)

    console.log('📂 Creating categories...')
    for (const category of categoriesData) {
      await client.create(category)
    }

    console.log('🏷️  Creating brands...')
    for (const brand of brandsData) {
      await client.create(brand)
    }

    console.log('📦 Creating products...')
    for (const product of productsData) {
      await client.create(product)
    }

    console.log('🔧 Creating services...')
    for (const service of servicesData) {
      await client.create(service)
    }

    console.log('📰 Creating blog posts...')
    for (const post of blogPostsData) {
      await client.create(post)
    }

    console.log('❓ Creating FAQs...')
    for (const faq of faqsData) {
      await client.create(faq)
    }

    console.log('📄 Creating pages...')
    for (const page of pagesData) {
      await client.create(page)
    }

    console.log('\n✅ Seed completed successfully!')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

seed()
