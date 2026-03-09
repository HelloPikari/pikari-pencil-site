import SectionBadge from '@/components/shared/SectionBadge';

export default function ContactHero() {
  return (
    <section
      style={{
        padding: 'var(--spacing-section-y) var(--spacing-page-x) var(--spacing-section-y-sm)',
      }}
    >
      <div style={{ marginBlockEnd: '24px' }}>
        <SectionBadge label="GET IN TOUCH" />
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
        We&rsquo;d Love to Hear from You
      </h1>
      <p
        className="font-body m-0"
        style={{
          fontSize: 'var(--font-size-body)',
          color: 'var(--color-text-secondary)',
          maxWidth: '600px',
          lineHeight: 1.6,
        }}
      >
        Whether you have a question about our research, want to collaborate, or just want to say
        hello—reach out. We respond within 48 hours.
      </p>
    </section>
  );
}
