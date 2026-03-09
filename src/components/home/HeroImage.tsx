import Image from 'next/image';

export default function HeroImage() {
  return (
    <div style={{ paddingInline: '64px' }}>
      <Image
        src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1400&q=80"
        alt="Abstract golden light refractions"
        width={1400}
        height={420}
        className="w-full object-cover"
        style={{ height: '420px', borderRadius: '4px' }}
        priority
      />
    </div>
  );
}
