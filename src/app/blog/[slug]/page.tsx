import { notFound } from 'next/navigation';
import Image from 'next/image';
import { compileMDX } from 'next-mdx-remote/rsc';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Divider from '@/components/shared/Divider';
import NewsletterCTA from '@/components/shared/NewsletterCTA';
import SectionBadge from '@/components/shared/SectionBadge';
import { mdxComponents } from '@/components/mdx';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
  });

  return (
    <>
      <Header />
      <Divider />
      <section
        className="flex flex-col items-center text-center"
        style={{ padding: '110px 64px', gap: '18px' }}
      >
        <SectionBadge label={post.category.toUpperCase()} />
        <h1
          className="font-heading italic text-balance m-0"
          style={{
            fontSize: '72px',
            fontWeight: 600,
            letterSpacing: '-2px',
            lineHeight: 1.05,
            color: 'var(--color-text)',
          }}
        >
          {post.title}
        </h1>
        <p
          className="font-body m-0"
          style={{
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          {post.excerpt}
        </p>
      </section>
      <Divider />
      <div style={{ paddingInline: '64px' }}>
        <Image
          src={post.image}
          alt={post.title}
          width={1400}
          height={400}
          className="w-full object-cover"
          style={{ height: '400px', borderRadius: '4px' }}
        />
      </div>
      <Divider />
      <article className="flex flex-col items-center" style={{ padding: '64px' }}>
        <div
          style={{
            width: '578px',
            backgroundColor: 'var(--color-white)',
            overflow: 'hidden',
          }}
        >
          {content}
        </div>
      </article>
      <Divider />
      <NewsletterCTA title="Never Miss a Discovery" />
      <Footer />
    </>
  );
}
