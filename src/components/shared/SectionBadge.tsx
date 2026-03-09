export default function SectionBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-block uppercase font-body"
      style={{
        padding: '4px 10px',
        border: '1px solid var(--color-border)',
        borderRadius: '9999px',
        fontSize: '9px',
        fontWeight: 700,
        letterSpacing: '1px',
        color: 'var(--color-text)',
      }}
    >
      {label}
    </span>
  );
}
