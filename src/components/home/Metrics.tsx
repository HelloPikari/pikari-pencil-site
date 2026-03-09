const metrics = [
  { number: '147', label: 'Discoveries Published' },
  { number: '52k+', label: 'Monthly Readers' },
  { number: '36', label: 'Industry Partners' },
  { number: '12', label: 'Countries Reached' },
];

export default function Metrics() {
  return (
    <section
      className="grid grid-cols-2 lg:grid-cols-4"
      style={{
        padding: 'var(--spacing-section-y-sm) var(--spacing-page-x)',
        gap: 'var(--spacing-card-gap)',
      }}
    >
      {metrics.map((metric) => (
        <div key={metric.label}>
          <div
            className="font-body"
            style={{
              fontSize: 'var(--font-size-metric)',
              fontWeight: 600,
              letterSpacing: '-2px',
              color: 'var(--color-text)',
              lineHeight: 1,
              marginBlockEnd: '8px',
            }}
          >
            {metric.number}
          </div>
          <div className="font-body" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {metric.label}
          </div>
        </div>
      ))}
    </section>
  );
}
