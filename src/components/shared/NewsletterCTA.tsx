'use client';

export default function NewsletterCTA({
  title = 'Stay Curious',
  subtitle = 'Get our latest discoveries, frameworks, and field notes delivered to your inbox.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section
      className="flex flex-col items-center text-center"
      style={{
        backgroundColor: 'var(--color-dark)',
        paddingBlock: 'var(--spacing-section-y)',
        paddingInline: 'var(--spacing-page-x)',
      }}
    >
      <h2
        className="font-heading italic m-0"
        style={{
          fontSize: 'var(--font-size-cta-title)',
          color: 'var(--color-white)',
          marginBlockEnd: '12px',
        }}
      >
        {title}
      </h2>
      <p
        className="font-body m-0"
        style={{
          fontSize: '14px',
          color: 'var(--color-text-muted)',
          marginBlockEnd: '32px',
        }}
      >
        {subtitle}
      </p>
      <div className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
        <div
          className="newsletter-input-wrapper flex-1"
          style={{
            border: '1px solid var(--color-text-secondary)',
            borderRadius: '4px',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="font-body bg-transparent border-none outline-none w-full"
            style={{
              padding: '12px 16px',
              fontSize: '14px',
              color: 'var(--color-white)',
            }}
          />
        </div>
        <button
          className="font-body border-none cursor-pointer"
          style={{
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 600,
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-dark)',
            borderRadius: '4px',
          }}
        >
          Subscribe
        </button>
      </div>
    </section>
  );
}
