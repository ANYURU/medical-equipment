import type { SiteSettings } from '@/types/sanity'

interface StructuredDataProps {
  settings: SiteSettings
}

export function StructuredData({ settings }: StructuredDataProps) {
  const baseUrl = settings?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://biomedengsug.org'
  
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings?.siteName || 'MedSupply Uganda',
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    description: settings?.seo?.metaDescription || 'Premium medical equipment and supplies for healthcare facilities across Uganda',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: settings?.contactInfo?.phone,
      email: settings?.contactInfo?.email,
      contactType: 'customer service',
      areaServed: 'UG',
      availableLanguage: ['en'],
    },
    sameAs: [
      settings?.socialLinks?.facebook,
      settings?.socialLinks?.twitter,
      settings?.socialLinks?.linkedin,
      settings?.socialLinks?.instagram,
      settings?.socialLinks?.youtube,
    ].filter(Boolean),
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: settings?.siteName || 'MedSupply Uganda',
    image: `${baseUrl}/icon.svg`,
    '@id': baseUrl,
    url: baseUrl,
    telephone: settings?.contactInfo?.phone,
    email: settings?.contactInfo?.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings?.contactInfo?.address,
      addressLocality: 'Kampala',
      addressRegion: 'Central',
      postalCode: settings?.contactInfo?.pobox,
      addressCountry: 'UG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 0.31727,
      longitude: 32.57574,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    priceRange: '$$',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}
