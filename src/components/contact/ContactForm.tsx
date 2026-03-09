'use client';

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col" style={{ gap: '6px' }}>
      <label
        className="font-body"
        style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text)' }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyles = {
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  padding: '14px 16px',
  border: '1px solid var(--color-border)',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  color: 'var(--color-text)',
  outline: 'none',
  width: '100%',
} as const;

export default function ContactForm() {
  return (
    <div className="flex-1">
      <h2
        className="font-heading italic m-0"
        style={{
          fontSize: '22px',
          color: 'var(--color-text)',
          marginBlockEnd: '32px',
        }}
      >
        Send a Message
      </h2>
      <form className="flex flex-col" style={{ gap: '20px' }} onSubmit={(e) => e.preventDefault()}>
        <div className="flex" style={{ gap: '16px' }}>
          <div className="flex-1">
            <FormField label="First Name">
              <input type="text" placeholder="Your first name" style={inputStyles} />
            </FormField>
          </div>
          <div className="flex-1">
            <FormField label="Last Name">
              <input type="text" placeholder="Your last name" style={inputStyles} />
            </FormField>
          </div>
        </div>
        <FormField label="Email Address">
          <input type="email" placeholder="you@company.com" style={inputStyles} />
        </FormField>
        <FormField label="Subject">
          <input type="text" placeholder="What's this about?" style={inputStyles} />
        </FormField>
        <FormField label="Message">
          <textarea
            placeholder="Tell us what's on your mind..."
            style={{ ...inputStyles, height: '140px', resize: 'vertical' }}
          />
        </FormField>
        <button
          type="submit"
          className="font-body border-none cursor-pointer self-start"
          style={{
            fontSize: '14px',
            fontWeight: 600,
            padding: '16px 32px',
            backgroundColor: 'var(--color-dark)',
            color: 'var(--color-white)',
            borderRadius: '4px',
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
