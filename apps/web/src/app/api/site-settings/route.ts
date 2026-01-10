import { client } from '@/lib/sanity'
import type { SiteSettings } from '@/types/sanity'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const settings = await client.fetch<SiteSettings>(
      `*[_type == "siteSettings"][0] { 
        siteName,
        logo { asset->{ url } }
      }`
    )
    return NextResponse.json(settings || {})
  } catch (error) {
    return NextResponse.json({ siteName: 'Gombaland Medical Supplies' })
  }
}
