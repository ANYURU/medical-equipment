import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import {Suspense} from 'react'
import './globals.css'
import {Footer} from '@/components/layout'
import {getNavigationData} from '@/components/layout/header-with-data'
import {HeaderClient} from '@/components/layout/header-client'
import {HeaderSkeleton} from '@/components/layout/header-skeleton'
import {WhatsAppButton} from '@/components/whatsapp-button'
import {StructuredData} from '@/components/structured-data'
import {Toaster} from 'sonner'
import {client} from '@/lib/sanity'
import type {SiteSettings} from '@/types/sanity'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

async function getMetadata(): Promise<Metadata> {
  const settings = await client.fetch<SiteSettings>(
    `*[_type == "siteSettings"][0] { 
      siteName, 
      siteUrl, 
      seo {
        metaTitle,
        metaDescription,
        keywords,
        ogImage { asset->{ url } }
      },
      favicon { asset->{ url } }
    }`
  )

  const title = settings?.siteName || 'Gombaland Uganda Limited'
  const description = settings?.seo?.metaDescription || 'Premium medical equipment and supplies for healthcare facilities across Uganda'
  const siteUrl = settings?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://biomedengsug.org'
  const ogImageUrl = settings?.seo?.ogImage?.asset?.url
  const ogImageWithCache = ogImageUrl ? `${ogImageUrl}?v=${Date.now()}` : undefined

  const metadata: Metadata = {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: settings?.seo?.keywords || ['medical equipment', 'healthcare supplies', 'Uganda', 'hospital equipment'],
    authors: [{name: title}],
    creator: title,
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: '/',
      siteName: title,
      title: settings?.seo?.metaTitle || title,
      description: settings?.seo?.metaDescription || description,
      images: ogImageWithCache ? [{ url: ogImageWithCache, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings?.seo?.metaTitle || title,
      description: settings?.seo?.metaDescription || description,
      images: ogImageWithCache ? [ogImageWithCache] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: '/',
    },
  }

  // Use local favicons
  metadata.icons = {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  }

  return metadata
}

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata()
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navigationPromise = getNavigationData()
  const settings = await client.fetch<SiteSettings>(
    `*[_type == "siteSettings"][0] { 
      siteName,
      siteUrl,
      seo,
      contactInfo,
      socialLinks
    }`
  )
  
  return (
    <html lang="en">
      <head>
        <StructuredData settings={settings} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Suspense fallback={<HeaderSkeleton />}>
          <HeaderClient dataPromise={navigationPromise} />
        </Suspense>
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton phone={settings?.contactInfo?.phone} />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
