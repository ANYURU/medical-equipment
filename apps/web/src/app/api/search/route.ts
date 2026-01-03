import { client } from '@/lib/sanity'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')

  if (!query || query.length < 2) {
    return NextResponse.json([])
  }

  try {
    const results = await client.fetch(
      `*[_type == "product" && (name match "${query}*" || description match "${query}*")][0...5] {
        _id,
        name,
        slug
      }`
    )
    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}
