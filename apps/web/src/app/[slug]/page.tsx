import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { generateSEO } from '@/lib/seo'
import type { Page } from '@/types/sanity'

async function getPage(slug: string): Promise<Page | null> {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      content,
      seo
    }`,
    { slug }
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) return {}

  return generateSEO({
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || page.content?.substring(0, 160),
    path: `/${page.slug.current}`,
  })
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) notFound()

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <article className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
          {page.title}
        </h1>
        {page.content && (
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <p className="whitespace-pre-wrap">{page.content}</p>
          </div>
        )}
      </article>
    </div>
  )
}
