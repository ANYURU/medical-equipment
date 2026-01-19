import { client } from '@/lib/sanity'
import type { Page } from '@/types/sanity'
import { notFound } from 'next/navigation'

export default async function AboutPage() {
  const page = await client.fetch<Page>(
    `*[_type == "page" && slug.current == "about-us"][0] {
      title,
      content
    }`
  )

  if (!page) {
    notFound()
  }

  return (
    <>
      <section className="border-b bg-linear-to-b from-blue-50 to-background py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {page.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Your trusted partner in medical equipment supply since 2011
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-4xl">
          {Array.isArray(page.content) ? (
            <div className="space-y-6">
              {page.content.map((block: any, index: number) => (
                <div key={index} className="rounded-lg border p-6">
                  <p className="leading-relaxed text-muted-foreground">
                    {block.children?.[0]?.text || ''}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border p-6">
              <p className="leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {page.content}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
