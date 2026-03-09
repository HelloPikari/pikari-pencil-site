import SectionBadge from '@/components/shared/SectionBadge';

export default function BlogHero() {
  return (
    <section style={{ padding: 'var(--spacing-section-y) var(--spacing-page-x) 32px' }}>
      <div style={{ marginBlockEnd: '24px' }}>
        <SectionBadge label="THE BLOG" />
      </div>
      <h1
        className="font-heading italic text-balance m-0"
        style={{
          fontSize: 'var(--font-size-hero)',
          fontWeight: 600,
          letterSpacing: '-2px',
          lineHeight: 1.05,
          color: 'var(--color-text)',
          marginBlockEnd: '20px',
          maxWidth: '700px',
        }}
      >
        Discoveries, Frameworks & Field Notes
      </h1>
      <p
        className="font-body m-0"
        style={{
          fontSize: 'var(--font-size-body)',
          color: 'var(--color-text-secondary)',
          maxWidth: '520px',
          lineHeight: 1.6,
        }}
      >
        Insights from the frontier of AI product development. Published weekly.
      </p>
    </section>
  );
}
