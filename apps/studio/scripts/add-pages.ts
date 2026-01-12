import { config } from 'dotenv'
import { createClient } from '@sanity/client'

config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  token: process.env.SANITY_WRITE_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const pages = [
  {
    _id: 'page-privacy',
    _type: 'page',
    title: 'Privacy Policy',
    slug: { current: 'privacy' },
    content: `Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

At MedSupply Uganda, we are committed to protecting your privacy and ensuring the security of your personal information.

1. Information We Collect
We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support.

2. How We Use Your Information
We use the information we collect to process orders, provide customer service, and improve our services.

3. Information Sharing
We do not sell, trade, or rent your personal information to third parties.

4. Data Security
We implement appropriate security measures to protect your personal information.

5. Your Rights
You have the right to access, correct, or delete your personal information.

6. Contact Us
If you have questions about this Privacy Policy, please contact us at info@medequip.ug`,
    seo: {
      metaTitle: 'Privacy Policy - MedSupply Uganda',
      metaDescription: 'Learn how MedSupply Uganda collects, uses, and protects your personal information.',
    },
  },
  {
    _id: 'page-terms',
    _type: 'page',
    title: 'Terms of Service',
    slug: { current: 'terms' },
    content: `Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

Welcome to MedSupply Uganda. By accessing our website and services, you agree to these Terms of Service.

1. Use of Services
You agree to use our services only for lawful purposes and in accordance with these Terms.

2. Product Information
We strive to provide accurate product information, but we do not warrant that descriptions or pricing are error-free.

3. Orders and Payments
All orders are subject to acceptance and availability. Payment terms will be specified at checkout.

4. Warranties
Products are covered by manufacturer warranties. Please refer to individual product documentation.

5. Limitation of Liability
MedSupply Uganda shall not be liable for any indirect, incidental, or consequential damages.

6. Governing Law
These Terms are governed by the laws of the Republic of Uganda.

7. Contact Information
For questions about these Terms, contact us at info@medequip.ug`,
    seo: {
      metaTitle: 'Terms of Service - MedSupply Uganda',
      metaDescription: 'Read the terms and conditions for using MedSupply Uganda services.',
    },
  },
]

async function addPages() {
  console.log('🌱 Adding Privacy and Terms pages...\n')

  try {
    for (const page of pages) {
      console.log(`📝 Creating ${page.title}...`)
      await client.createOrReplace(page)
      console.log(`✅ ${page.title} created\n`)
    }

    console.log('✅ All pages added successfully!')
  } catch (error) {
    console.error('❌ Failed to add pages:', error)
    process.exit(1)
  }
}

addPages()
