export default function MapSection() {
  return (
    <div style={{ paddingInline: 'var(--spacing-page-x)' }}>
      <div
        className="w-full flex items-center justify-center font-body"
        style={{
          aspectRatio: '4 / 1',
          minHeight: '200px',
          backgroundColor: '#E8E4DE',
          borderRadius: '4px',
          fontSize: '14px',
          color: 'var(--color-text-muted)',
        }}
      >
        Map placeholder — 548 Market Street, San Francisco
      </div>
    </div>
  );
}
