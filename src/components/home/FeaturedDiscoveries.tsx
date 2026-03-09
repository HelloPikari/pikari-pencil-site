import Link from 'next/link';
import PostCard from '@/components/shared/PostCard';
import { getRecentPosts } from '@/lib/posts';

export default function FeaturedDiscoveries() {
  const posts = getRecentPosts(3);

  return (
    <section style={{ paddingInline: '64px', paddingBlock: '48px' }}>
      <div className="flex items-center justify-between" style={{ marginBlockEnd: '32px' }}>
        <h2
          className="font-heading italic m-0"
          style={{ fontSize: '22px', color: 'var(--color-text)' }}
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
      <div className="post-container-home grid grid-cols-3" style={{ gap: '24px' }}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
