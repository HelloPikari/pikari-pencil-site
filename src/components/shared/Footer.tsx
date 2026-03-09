import Image from 'next/image';
import Link from 'next/link';

const exploreLinks = [
  { label: 'Research', href: '/blog' },
  { label: 'Frameworks', href: '/blog' },
  { label: 'Case Studies', href: '/blog' },
  { label: 'Field Notes', href: '/blog' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '#' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4
        className="font-body"
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--color-text)',
          marginBlockEnd: '16px',
        }}
      >
        {title}
      </h4>
      <ul className="list-none p-0 m-0 flex flex-col" style={{ gap: '10px' }}>
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="no-underline font-body"
              style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ padding: 'var(--spacing-section-y-sm) var(--spacing-page-x)' }}>
      <div
        className="grid grid-cols-1 md:grid-cols-4"
        style={{ gap: 'var(--spacing-column-gap)', marginBlockEnd: '48px' }}
      >
        <div>
          <Link href="/" className="no-underline block" style={{ marginBlockEnd: '12px' }}>
            <Image src="/images/pikari-logo.svg" alt="Pikari" width={100} height={24} />
          </Link>
          <p
            className="font-body m-0"
            style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}
          >
            Illuminating the intersection of human creativity and artificial intelligence in product
            development.
          </p>
        </div>
        <FooterColumn title="Explore" links={exploreLinks} />
        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn title="Legal" links={legalLinks} />
      </div>
      <div
        className="flex items-center justify-between"
        style={{
          borderBlockStart: '1px solid var(--color-border)',
          paddingBlockStart: '24px',
        }}
      >
        <p className="font-body m-0" style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
          © 2026 Pikari Inc. All rights reserved.
        </p>
        <div className="flex" style={{ gap: '16px' }}>
          {['Twitter', 'LinkedIn', 'RSS'].map((label) => (
            <a
              key={label}
              href="#"
              className="no-underline font-body"
              style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
