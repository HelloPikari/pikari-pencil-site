import Link from 'next/link';
import PostCard from '@/components/shared/PostCard';
import { getRecentPosts } from '@/lib/posts';

export default function FeaturedDiscoveries() {
  const posts = getRecentPosts(3);

  return (
    <section
      style={{
        paddingInline: 'var(--spacing-page-x)',
        paddingBlock: 'var(--spacing-section-y-sm)',
      }}
    >
      <div className="flex items-center justify-between" style={{ marginBlockEnd: '32px' }}>
        <h2
          className="font-heading italic m-0"
          style={{ fontSize: 'var(--font-size-section-title)', color: 'var(--color-text)' }}
        >
          Latest Discoveries
        </h2>
        <Link
          href="/blog"
          className="no-underline font-body"
          style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}
        >
          View All →
        </Link>
      </div>
      <div
        className="post-container-home grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: 'var(--spacing-card-gap)' }}
      >
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
