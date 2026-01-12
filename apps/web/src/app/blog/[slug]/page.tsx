import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { client } from '@/lib/sanity';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  content?: Array<{
    _type: string;
    children: Array<{ text: string }>;
  }>;
  publishedAt: string;
  author?: { name: string };
  categories?: Array<{ title: string }>;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      publishedAt,
      author->{name},
      categories[]->{title}
    }`,
    { slug }
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  return (
    <article className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {post.author && <span>By {post.author.name}</span>}
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          {post.categories && post.categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.categories.map((cat, i) => (
                <Badge key={i} variant="secondary">
                  {cat.title}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <Separator className="mb-8" />

        {post.excerpt && (
          <p className="mb-8 text-lg text-muted-foreground">{post.excerpt}</p>
        )}

        {post.content && (
          <div className="prose prose-gray max-w-none dark:prose-invert">
            {post.content.map((block, i) => (
              <p key={i}>
                {block.children.map((child) => child.text).join('')}
              </p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
