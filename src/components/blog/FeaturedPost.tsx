import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/post';

export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <section style={{ paddingInline: '64px', paddingBlock: '48px' }}>
      <Link href={`/blog/${post.slug}`} className="flex no-underline group" style={{ gap: '32px' }}>
        <div className="overflow-hidden flex-shrink-0" style={{ borderRadius: '4px' }}>
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={360}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            style={{ width: '600px', height: '360px' }}
          />
        </div>
        <div className="flex flex-col justify-center">
          <span
            className="inline-block font-body uppercase self-start"
            style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '1px',
              padding: '4px 10px',
              backgroundColor: 'var(--color-dark)',
              color: 'var(--color-white)',
              borderRadius: '4px',
              marginBlockEnd: '16px',
            }}
          >
            FEATURED
          </span>
          <div
            className="font-body uppercase"
            style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '1px',
              color: 'var(--color-text-muted)',
              marginBlockEnd: '12px',
            }}
          >
            {post.category} · {post.readTime}
          </div>
          <h2
            className="font-heading italic m-0"
            style={{
              fontSize: '28px',
              color: 'var(--color-text)',
              lineHeight: 1.2,
              marginBlockEnd: '12px',
            }}
          >
            {post.title}
          </h2>
          <p
            className="font-body m-0"
            style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              marginBlockEnd: '20px',
            }}
          >
            {post.excerpt}
          </p>
          <div className="flex items-center" style={{ gap: '10px' }}>
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-body" style={{ fontSize: '13px', color: 'var(--color-text)' }}>
              {post.author.name}
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
