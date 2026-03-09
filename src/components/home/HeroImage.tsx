import Image from 'next/image';

export default function HeroImage() {
  return (
    <div style={{ paddingInline: 'var(--spacing-page-x)' }}>
      <Image
        src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1400&q=80"
        alt="Abstract golden light refractions"
        width={1400}
        height={420}
        className="w-full object-cover"
        style={{ aspectRatio: '10 / 3', borderRadius: '4px' }}
        priority
      />
    </div>
  );
}
