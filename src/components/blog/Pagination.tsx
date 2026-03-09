import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination() {
  const pages = [1, 2, 3, 4];

  return (
    <div
      className="flex items-center justify-center font-body"
      style={{ gap: '8px', paddingBlock: '32px' }}
    >
      <button
        className="flex items-center justify-center border-none bg-transparent cursor-pointer"
        style={{ width: '32px', height: '32px', color: 'var(--color-text-muted)' }}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className="flex items-center justify-center border-none cursor-pointer"
          style={{
            width: '32px',
            height: '32px',
            fontSize: '13px',
            borderRadius: '4px',
            backgroundColor: page === 1 ? 'var(--color-dark)' : 'transparent',
            color: page === 1 ? 'var(--color-white)' : 'var(--color-text-secondary)',
          }}
        >
          {page}
        </button>
      ))}
      <button
        className="flex items-center justify-center border-none bg-transparent cursor-pointer"
        style={{ width: '32px', height: '32px', color: 'var(--color-text)' }}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
