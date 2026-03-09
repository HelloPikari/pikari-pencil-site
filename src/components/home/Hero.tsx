import SectionBadge from '@/components/shared/SectionBadge';
import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{ padding: '80px 64px 48px' }}>
      <div style={{ marginBlockEnd: '24px' }}>
        <SectionBadge label="AI PRODUCT DISCOVERY" />
      </div>
      <h1
        className="font-heading italic text-balance m-0"
        style={{
          fontSize: '72px',
          fontWeight: 600,
          letterSpacing: '-2px',
          lineHeight: 1.05,
          color: 'var(--color-text)',
          marginBlockEnd: '20px',
          maxWidth: '700px',
        }}
      >
        Illuminating the Future of Product
      </h1>
      <p
        className="font-body m-0"
        style={{
          fontSize: '16px',
          color: 'var(--color-text-secondary)',
          marginBlockEnd: '32px',
          maxWidth: '520px',
          lineHeight: 1.6,
        }}
      >
        Pikari explores how curiosity-driven teams build AI-powered products that matter. Research,
        frameworks, and field notes from the frontier.
      </p>
      <div className="flex" style={{ gap: '12px' }}>
        <Link
          href="/blog"
          className="inline-block no-underline font-body"
          style={{
            fontSize: '14px',
            fontWeight: 600,
            padding: '12px 24px',
            backgroundColor: 'var(--color-dark)',
            color: 'var(--color-white)',
            borderRadius: '4px',
          }}
        >
          Explore Discoveries
        </Link>
        <Link
          href="/about"
          className="inline-block no-underline font-body"
          style={{
            fontSize: '14px',
            fontWeight: 600,
            padding: '12px 24px',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            borderRadius: '4px',
          }}
        >
          About Us
        </Link>
      </div>
    </section>
  );
}
