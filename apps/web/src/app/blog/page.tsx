import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { client } from '@/lib/sanity'

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  categories?: Array<{ title: string }>;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) [0...12] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      categories[]->{title}
    }
  `);
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Blog
        </h1>
        <p className="mt-2 text-muted-foreground">
          Latest news and insights from the medical equipment industry
        </p>
      </div>
      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <div className="h-full rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg cursor-pointer">
                <div className="mb-4">
                  <h2 className="mb-2 line-clamp-2 text-xl font-bold">{post.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                {post.excerpt && (
                  <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((cat, i) => (
                      <Badge key={i} variant="secondary">
                        {cat.title}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No blog posts available</p>
      )}
    </div>
  );
}
