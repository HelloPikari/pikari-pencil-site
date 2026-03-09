import Image from 'next/image';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Divider from '@/components/shared/Divider';
import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory';
import TeamGrid from '@/components/about/TeamGrid';
import Values from '@/components/about/Values';

export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <Divider />
        <AboutHero />
        <Divider />
        <div style={{ paddingInline: 'var(--spacing-page-x)' }}>
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80"
            alt="Team collaboration"
            width={1400}
            height={400}
            className="w-full object-cover"
            style={{ aspectRatio: '7 / 2', borderRadius: '4px' }}
          />
        </div>
        <Divider />
        <OurStory />
        <Divider />
        <TeamGrid />
        <Divider />
        <Values />
        <Divider />
        <Footer />
      </div>
    </>
  );
}
