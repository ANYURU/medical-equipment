import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import {Suspense} from 'react'
import './globals.css'
import {Footer} from '@/components/layout'
import {getNavigationData} from '@/components/layout/header-with-data'
import {HeaderClient} from '@/components/layout/header-client'
import {HeaderSkeleton} from '@/components/layout/header-skeleton'
import {WhatsAppButton} from '@/components/whatsapp-button'
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

export const metadata: Metadata = {
  title: {
    default: 'MedEquip - Medical Equipment Supply Platform',
    template: '%s | MedEquip',
  },
  description: 'Premium medical equipment and supplies for healthcare facilities across Uganda',
  keywords: ['medical equipment', 'healthcare supplies', 'Uganda', 'hospital equipment'],
  authors: [{name: 'MedEquip'}],
  creator: 'MedEquip',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://medequip.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'MedEquip',
    title: 'MedEquip - Medical Equipment Supply Platform',
    description: 'Premium medical equipment and supplies for healthcare facilities across Uganda',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedEquip - Medical Equipment Supply Platform',
    description: 'Premium medical equipment and supplies for healthcare facilities across Uganda',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navigationPromise = getNavigationData()
  const settings = await client.fetch<SiteSettings>(
    `*[_type == "siteSettings"][0] { contactInfo }`
  )
  
  return (
    <html lang="en">
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
      </body>
    </html>
  )
}
