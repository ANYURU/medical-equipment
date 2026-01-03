import { client } from '@/lib/sanity'

export async function getNavigationData() {
  const navQuery = `{
    "products": *[_type == "product"][0...4] {
      "title": name,
      "href": "/products/" + slug.current,
      description
    },
    "categories": *[_type == "category"] {
      title,
      "href": "/categories/" + slug.current
    }
  }`
  
  const data = await client.fetch(navQuery, {}, { next: { revalidate: 3600 } })
  return {
    products: data?.products || [],
    categories: data?.categories || []
  }
}
