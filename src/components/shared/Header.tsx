'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close on route change
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  // Escape key + scroll lock
  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen, closeMenu]);

  // Focus trap
  useEffect(() => {
    if (!menuOpen || !panelRef.current) return;

    const panel = panelRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = panel.querySelectorAll<HTMLElement>(focusableSelector);
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    first?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    panel.addEventListener('keydown', handleTab);
    return () => panel.removeEventListener('keydown', handleTab);
  }, [menuOpen]);

  // Return focus to hamburger on close
  useEffect(() => {
    if (!menuOpen) {
      hamburgerRef.current?.focus();
    }
  }, [menuOpen]);

  const ctaButton = (
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
  );

  return (
    <header className="sticky top-0 z-50 font-body" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Inner wrapper — aligns with body content */}
      <div
        className="flex items-center justify-between"
        style={{
          maxWidth: '1440px',
          marginInline: 'auto',
          padding: '20px var(--spacing-page-x)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="no-underline">
          <Image src="/images/pikari-logo.svg" alt="Pikari" width={100} height={24} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center" style={{ gap: '24px' }}>
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

        {/* Desktop actions */}
        <div className="hidden md:flex items-center" style={{ gap: '16px' }}>
          <button aria-label="Search" className="bg-transparent border-none cursor-pointer p-0">
            <Search size={18} color="var(--color-text)" />
          </button>
          {ctaButton}
        </div>

        {/* Mobile actions */}
        <div className="flex md:hidden items-center" style={{ gap: '12px' }}>
          {ctaButton}
          <button
            ref={hamburgerRef}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"
          >
            {menuOpen ? (
              <X size={24} color="var(--color-text)" />
            ) : (
              <Menu size={24} color="var(--color-text)" />
            )}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Off-canvas panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal={menuOpen ? 'true' : undefined}
        aria-label="Mobile navigation"
        className="fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col"
        style={{
          width: '280px',
          maxWidth: '80vw',
          backgroundColor: 'var(--color-bg)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          padding: '20px',
        }}
      >
        {/* Close button */}
        <div className="flex justify-end">
          <button
            aria-label="Close menu"
            onClick={closeMenu}
            className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"
          >
            <X size={24} color="var(--color-text)" />
          </button>
        </div>

        {/* Search */}
        <button
          aria-label="Search"
          className="bg-transparent border-none cursor-pointer p-0 flex items-center"
          style={{ gap: '8px', marginTop: '16px', marginBottom: '16px' }}
        >
          <Search size={18} color="var(--color-text)" />
          <span style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>Search</span>
        </button>

        {/* Nav links */}
        <nav className="flex flex-col" style={{ gap: '8px' }}>
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="no-underline"
                style={{
                  fontSize: '16px',
                  padding: '8px 0',
                  color: isActive ? 'var(--color-text)' : 'var(--color-text-secondary)',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
