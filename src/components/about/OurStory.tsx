export default function OurStory() {
  return (
    <section
      className="flex flex-col md:flex-row"
      style={{
        padding: 'var(--spacing-section-y-sm) var(--spacing-page-x)',
        gap: 'var(--spacing-large-gap)',
      }}
    >
      <div className="md:w-[300px] md:shrink-0">
        <h2
          className="font-heading italic m-0"
          style={{ fontSize: 'var(--font-size-section-title)', color: 'var(--color-text)' }}
        >
          Our Story
        </h2>
      </div>
      <div className="flex flex-col" style={{ gap: '20px' }}>
        <p
          className="font-body m-0"
          style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)', lineHeight: 1.6 }}
        >
          Pikari was born from a simple observation: the teams building the most impactful AI
          products weren&rsquo;t necessarily the most technically sophisticated. They were the most
          curious.
        </p>
        <p
          className="font-body m-0"
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
          }}
        >
          Founded in 2024, we set out to document what separates great AI-powered products from
          mediocre ones. We interview builders, analyze launches, study failures, and distill
          patterns into actionable frameworks.
        </p>
        <p
          className="font-body m-0"
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
          }}
        >
          Our name, Pikari, means a flash of light—that moment of illumination when a new insight
          clicks into place. That&rsquo;s what we chase, and what we share.
        </p>
      </div>
    </section>
  );
}
