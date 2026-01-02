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
    }
  }
  contactInfo?: {
    email?: string
    phone?: string
    address?: string
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
  description?: string
  mainImage: SanityImage
  brand?: Brand
  categories?: Category[]
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
