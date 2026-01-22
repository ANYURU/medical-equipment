// Sanity document types
export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  siteName: string
  siteUrl: string
  logo?: {
    asset: {
      _ref: string
      _type: 'reference'
      url?: string
    }
  }
  favicon?: {
    asset: {
      _ref: string
      _type: 'reference'
      url?: string
    }
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    ogImage?: {
      asset: {
        _ref: string
        _type: 'reference'
        url?: string
      }
    }
  }
  contactInfo?: {
    email?: string
    phone?: string
    address?: string
    pobox?: string
    workingHours?: string
  }
  socialLinks?: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
    youtube?: string
  }
  footerText?: string
}

export interface Category {
  _id: string
  _type: 'category'
  title: string
  slug: {
    current: string
  }
  description?: string
  image?: SanityImage
  order?: number
}

export interface Brand {
  _id: string
  _type: 'brand'
  name: string
  slug: {
    current: string
  }
  logo: SanityImage
  description?: string
  content?: any[]
  bannerImage?: SanityImage
  website?: string
  country?: string
  certifications?: string[]
  featured?: boolean
  order?: number
}

export interface Product {
  _id: string
  _type: 'product'
  name: string
  slug: {
    current: string
  }
  sku?: string
  description?: string
  content?: any[]
  mainImage: SanityImage
  gallery?: SanityImage[]
  price?: number
  brand?: Brand
  categories?: Category[]
  specifications?: Array<{ label: string; value: string }>
  features?: string[]
  applications?: string[]
  status?: 'available' | 'coming_soon' | 'discontinued'
  featured?: boolean
}

export interface Service {
  _id: string
  _type: 'service'
  title: string
  slug: {
    current: string
  }
  description?: string
  image?: SanityImage
  order?: number
}

// Helper types
export interface SanityImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface Distributor {
  _id: string
  _type: 'distributor'
  name: string
  logo: SanityImage
  order?: number
}

export interface Stat {
  _id: string
  _type: 'stat'
  value: number
  suffix?: string
  label: string
  order?: number
}

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  quote: string
  author: string
  role: string
  facility: string
  photo?: SanityImage
  featured?: boolean
  order?: number
}

export interface Feature {
  _id: string
  _type: 'feature'
  title: string
  description: string
  icon: string
  order?: number
}

export interface FAQ {
  _id: string
  _type: 'faq'
  question: string
  answer: string
  category?: string
  order?: number
}

export interface Page {
  _id: string
  _type: 'page'
  title: string
  slug: {
    current: string
  }
  content?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface Homepage {
  _id: string
  _type: 'homepage'
  hero: {
    title: string
    subtitle?: string
    primaryButtonText?: string
    primaryButtonLink?: string
    secondaryButtonText?: string
    secondaryButtonLink?: string
  }
  statsSection?: {
    heading?: string
    stats?: Stat[]
  }
  distributorsSection?: {
    heading?: string
    distributors?: Distributor[]
  }
  whyChooseUsSection?: {
    heading?: string
    description?: string
    features?: Feature[]
  }
  missionVisionSection?: {
    heading?: string
    description?: string
    mission?: string
    missionMetric?: string
    vision?: string
    visionMetric?: string
  }
  testimonialsSection?: {
    heading?: string
    description?: string
    testimonials?: Testimonial[]
  }
  ctaSection?: {
    heading?: string
    description?: string
    primaryButtonText?: string
    primaryButtonLink?: string
    secondaryButtonText?: string
    secondaryButtonLink?: string
  }
}
