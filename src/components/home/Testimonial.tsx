export default function Testimonial() {
  return (
    <section
      className="flex flex-col items-center text-center"
      style={{ paddingBlock: '80px', paddingInline: '64px' }}
    >
      <blockquote
        className="font-heading italic m-0"
        style={{
          fontSize: '28px',
          color: 'var(--color-text)',
          maxWidth: '900px',
          lineHeight: 1.4,
          marginBlockEnd: '24px',
        }}
      >
        &ldquo;Pikari&rsquo;s research has fundamentally changed how we approach AI product
        development. Their frameworks aren&rsquo;t theoretical—they&rsquo;re built from the trenches
        of actual product work.&rdquo;
      </blockquote>
      <p className="font-body m-0" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
        Sarah Chen, VP of Product, Meridian Labs
      </p>
    </section>
  );
}
