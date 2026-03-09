import PostCard from '@/components/shared/PostCard';
import { Post } from '@/types/post';

export default function PostGrid({ posts, title }: { posts: Post[]; title?: string }) {
  return (
    <section
      style={{
        paddingInline: 'var(--spacing-page-x)',
        paddingBlock: 'var(--spacing-section-y-sm)',
      }}
    >
      {title && (
        <h2
          className="font-heading italic m-0"
          style={{
            fontSize: 'var(--font-size-section-title)',
            color: 'var(--color-text)',
            marginBlockEnd: '32px',
          }}
        >
          {title}
        </h2>
      )}
      <div
        className="post-container-blog grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: 'var(--spacing-card-gap)' }}
      >
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
