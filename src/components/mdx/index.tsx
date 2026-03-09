import type { MDXComponents } from 'mdx/types';
import Callout from './Callout';

export const mdxComponents: MDXComponents = {
  Callout,
  h2: (props) => (
    <h2
      className="font-heading italic"
      style={{
        fontSize: 'var(--font-size-mdx-h2)',
        color: 'var(--color-text)',
        marginBlockStart: '32px',
        marginBlockEnd: '16px',
        fontWeight: 600,
      }}
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="font-body"
      style={{
        fontSize: 'var(--font-size-body)',
        lineHeight: 1.6,
        color: 'var(--color-text-secondary)',
        marginBlock: '16px',
      }}
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="font-heading italic"
      style={{
        borderInlineStart: '3px solid var(--color-border)',
        paddingInlineStart: '20px',
        marginInline: 0,
        marginBlock: '24px',
        fontSize: 'var(--font-size-mdx-blockquote)',
        color: 'var(--color-text)',
        lineHeight: 1.4,
      }}
      {...props}
    />
  ),
  strong: (props) => <strong style={{ color: 'var(--color-text)', fontWeight: 600 }} {...props} />,
};
