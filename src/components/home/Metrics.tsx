const metrics = [
  { number: '147', label: 'Discoveries Published' },
  { number: '52k+', label: 'Monthly Readers' },
  { number: '36', label: 'Industry Partners' },
  { number: '12', label: 'Countries Reached' },
];

export default function Metrics() {
  return (
    <section className="flex items-center justify-between" style={{ padding: '64px' }}>
      {metrics.map((metric, i) => (
        <div key={metric.label} className="flex items-center flex-1">
          {i > 0 && (
            <div
              className="self-stretch"
              style={{
                borderInlineStart: '1px solid var(--color-border)',
                marginInlineEnd: '48px',
              }}
            />
          )}
          <div>
            <div
              className="font-body"
              style={{
                fontSize: '42px',
                fontWeight: 600,
                letterSpacing: '-2px',
                color: 'var(--color-text)',
                lineHeight: 1,
                marginBlockEnd: '8px',
              }}
            >
              {metric.number}
            </div>
            <div
              className="font-body"
              style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}
            >
              {metric.label}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
