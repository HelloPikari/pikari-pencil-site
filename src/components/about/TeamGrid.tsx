import Image from 'next/image';

const team = [
  {
    name: 'Elena Vasquez',
    role: 'Founder & Editor-in-Chief',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
  {
    name: 'Marcus Obi',
    role: 'Head of Research',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Aiko Tanaka',
    role: 'Senior Writer',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
  {
    name: 'David Park',
    role: 'Product Strategist',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
];

export default function TeamGrid() {
  return (
    <section style={{ padding: 'var(--spacing-section-y-sm) var(--spacing-page-x)' }}>
      <h2
        className="font-heading italic m-0"
        style={{
          fontSize: 'var(--font-size-section-title)',
          color: 'var(--color-text)',
          marginBlockEnd: '32px',
        }}
      >
        The Team
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ gap: 'var(--spacing-card-gap)' }}
      >
        {team.map((member) => (
          <div key={member.name}>
            <Image
              src={member.photo}
              alt={member.name}
              width={400}
              height={320}
              className="w-full object-cover"
              style={{ aspectRatio: '5 / 4', borderRadius: '4px', marginBlockEnd: '16px' }}
            />
            <h3
              className="font-heading m-0"
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBlockEnd: '4px',
              }}
            >
              {member.name}
            </h3>
            <p
              className="font-body m-0"
              style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}
            >
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
