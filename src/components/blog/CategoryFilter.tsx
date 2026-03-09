'use client';

export default function CategoryFilter({
  categories,
  active,
  onSelect,
}: {
  categories: string[];
  active: string;
  onSelect: (cat: string) => void;
}) {
  const allCategories = ['All', ...categories];

  return (
    <div className="flex flex-wrap" style={{ gap: '8px', paddingInline: 'var(--spacing-page-x)' }}>
      {allCategories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className="font-body border-none cursor-pointer"
            style={{
              fontSize: '12px',
              fontWeight: 500,
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: isActive ? 'var(--color-dark)' : 'transparent',
              color: isActive ? 'var(--color-white)' : 'var(--color-text-secondary)',
              border: isActive ? 'none' : '1px solid var(--color-border)',
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
