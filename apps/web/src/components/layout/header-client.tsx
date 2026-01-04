'use client'

import { use } from 'react'
import { Header } from './header'

interface NavigationData {
  products: Array<{ title: string; href: string; description?: string }>
  categories: Array<{ title: string; href: string }>
}

export function HeaderClient({ 
  dataPromise 
}: { 
  dataPromise: Promise<NavigationData> 
}) {
  const { products, categories } = use(dataPromise)
  return <Header products={products} categories={categories} />
}
