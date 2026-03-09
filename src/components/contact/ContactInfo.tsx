export default function ContactInfo() {
  const info = [
    {
      title: 'Email',
      content: 'hello@pikari.inc',
    },
    {
      title: 'Office',
      content: (
        <>
          548 Market Street, Suite 420
          <br />
          San Francisco, CA 94104
        </>
      ),
    },
    {
      title: 'Social',
      content: 'Twitter · LinkedIn · GitHub',
    },
    {
      title: 'Response Time',
      content: 'We typically respond within 24–48 hours during business days.',
    },
  ];

  return (
    <div>
      <h2
        className="font-heading italic m-0"
        style={{
          fontSize: 'var(--font-size-section-title)',
          color: 'var(--color-text)',
          marginBlockEnd: '32px',
        }}
      >
        Other Ways to Reach Us
      </h2>
      <div className="flex flex-col" style={{ gap: '24px' }}>
        {info.map((item) => (
          <div
            key={item.title}
            style={{
              borderBlockStart: '1px solid var(--color-border)',
              paddingBlockStart: '24px',
            }}
          >
            <h3
              className="font-body m-0"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'var(--color-text)',
                marginBlockEnd: '8px',
              }}
            >
              {item.title}
            </h3>
            <p
              className="font-body m-0"
              style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
              }}
            >
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
