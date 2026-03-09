import SectionBadge from '@/components/shared/SectionBadge';

export default function AboutHero() {
  return (
    <section style={{ padding: '80px 64px 48px' }}>
      <div style={{ marginBlockEnd: '24px' }}>
        <SectionBadge label="ABOUT PIKARI" />
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
          maxWidth: '800px',
        }}
      >
        We Believe the Best Products Begin with Curiosity
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
        Pikari Inc was founded to explore the evolving relationship between human creativity and
        artificial intelligence in product development.
      </p>
    </section>
  );
}
