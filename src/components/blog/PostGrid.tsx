import PostCard from '@/components/shared/PostCard';
import { Post } from '@/types/post';

export default function PostGrid({ posts, title }: { posts: Post[]; title?: string }) {
  return (
    <section style={{ paddingInline: '64px', paddingBlock: '48px' }}>
      {title && (
        <h2
          className="font-heading italic m-0"
          style={{
            fontSize: '22px',
            color: 'var(--color-text)',
            marginBlockEnd: '32px',
          }}
        >
          {title}
        </h2>
      )}
      <div className="post-container-blog grid grid-cols-3" style={{ gap: '24px' }}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
