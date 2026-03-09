export default function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className="font-body"
      style={{
        borderInlineStart: '3px solid var(--color-text)',
        paddingInlineStart: '20px',
        paddingBlock: '4px',
        marginBlock: '24px',
        fontSize: '15px',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
      }}
    >
      {children}
    </aside>
  );
}
