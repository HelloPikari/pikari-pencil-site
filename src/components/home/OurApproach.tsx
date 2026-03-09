const pillars = [
  {
    number: '01',
    title: 'Human-First Discovery',
    description:
      'We start with people, not technology. Every framework we publish is grounded in real conversations with builders who are shipping AI products today.',
  },
  {
    number: '02',
    title: 'Rigorous Experimentation',
    description:
      "We test our ideas before we publish them. When we propose a framework, it's been validated against real product teams in real conditions.",
  },
  {
    number: '03',
    title: 'Open Knowledge Sharing',
    description:
      'We believe the best insights should be accessible to everyone. Our research is published freely, and our frameworks are designed to be adapted.',
  },
];

export default function OurApproach() {
  return (
    <section style={{ padding: 'var(--spacing-section-y-sm) var(--spacing-page-x)' }}>
      <div style={{ marginBlockEnd: '12px' }}>
        <h2
          className="font-heading italic m-0"
          style={{ fontSize: 'var(--font-size-section-title)', color: 'var(--color-text)' }}
        >
          Our Approach
        </h2>
      </div>
      <p
        className="font-body m-0"
        style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          marginBlockEnd: '48px',
          maxWidth: '600px',
          lineHeight: 1.6,
        }}
      >
        We combine deep research with practical frameworks to help teams navigate the complexities
        of AI product development.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 'var(--spacing-column-gap)' }}>
        {pillars.map((pillar) => (
          <div
            key={pillar.number}
            style={{ borderBlockStart: '1px solid var(--color-border)', paddingBlockStart: '24px' }}
          >
            <div
              className="font-body"
              style={{
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                marginBlockEnd: '8px',
              }}
            >
              {pillar.number}
            </div>
            <h3
              className="font-heading m-0"
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBlockEnd: '12px',
              }}
            >
              {pillar.title}
            </h3>
            <p
              className="font-body m-0"
              style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
              }}
            >
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
