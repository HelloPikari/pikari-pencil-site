'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      className="flex items-center justify-between font-body"
      style={{ padding: '20px 64px' }}
    >
      <Link href="/" className="no-underline">
        <Image src="/images/pikari-logo.svg" alt="Pikari" width={100} height={24} priority />
      </Link>

      <nav className="flex items-center" style={{ gap: '24px' }}>
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="no-underline"
              style={{
                fontSize: '14px',
                color: isActive ? 'var(--color-text)' : 'var(--color-text-secondary)',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center" style={{ gap: '16px' }}>
        <button aria-label="Search" className="bg-transparent border-none cursor-pointer p-0">
          <Search size={18} color="var(--color-text)" />
        </button>
        <Link
          href="/contact"
          className="inline-block no-underline uppercase font-body"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            padding: '8px 16px',
            backgroundColor: 'var(--color-dark)',
            color: 'var(--color-white)',
            borderRadius: '4px',
          }}
        >
          GET STARTED
        </Link>
      </div>
    </header>
  );
}
