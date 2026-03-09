import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/post';

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block no-underline group">
      <div className="overflow-hidden" style={{ borderRadius: '4px', marginBlockEnd: '16px' }}>
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={500}
          className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ aspectRatio: '16 / 10' }}
        />
      </div>
      <div
        className="font-body uppercase"
        style={{
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '1px',
          color: 'var(--color-text-muted)',
          marginBlockEnd: '8px',
        }}
      >
        {post.category} · {post.readTime}
      </div>
      <h3
        className="font-heading italic m-0 transition-colors duration-200"
        style={{
          fontSize: 'var(--font-size-section-title)',
          letterSpacing: '0.5px',
          lineHeight: 1.2,
          color: 'var(--color-text)',
        }}
      >
        <span
          className="group-hover:opacity-80"
          style={{
            transition: 'color 0.2s',
          }}
        >
          {post.title}
        </span>
      </h3>
    </Link>
  );
}
