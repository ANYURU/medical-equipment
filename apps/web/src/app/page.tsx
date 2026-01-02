import {client} from '@/lib/sanity'

export default async function Home() {
  const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]{
    siteName,
    siteUrl
  }`)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          {siteSettings?.siteName || 'Medical Equipment Supply Platform'}
        </h1>
        <p className="text-lg text-muted-foreground">
          Sanity CMS Connected ✓
        </p>
      </main>
    </div>
  )
}
