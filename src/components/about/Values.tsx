const values = [
  {
    title: 'Intellectual Honesty',
    description:
      'We publish what we find, not what sounds good. If an approach fails, we say so—and explain why.',
  },
  {
    title: 'Builder Empathy',
    description:
      'We write for people in the arena—PMs, designers, engineers—not armchair theorists. Practical above all.',
  },
  {
    title: 'Long-Term Thinking',
    description:
      'We focus on durable insights over trending takes. The best product thinking compounds over time.',
  },
];

export default function Values() {
  return (
    <section style={{ padding: '48px 64px' }}>
      <h2
        className="font-heading italic m-0"
        style={{
          fontSize: '22px',
          color: 'var(--color-text)',
          marginBlockEnd: '32px',
        }}
      >
        What We Value
      </h2>
      <div className="grid grid-cols-3" style={{ gap: '48px' }}>
        {values.map((value) => (
          <div
            key={value.title}
            style={{ borderBlockStart: '1px solid var(--color-border)', paddingBlockStart: '24px' }}
          >
            <h3
              className="font-heading m-0"
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBlockEnd: '12px',
              }}
            >
              {value.title}
            </h3>
            <p
              className="font-body m-0"
              style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
              }}
            >
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
