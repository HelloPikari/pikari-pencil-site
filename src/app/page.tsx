import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Divider from '@/components/shared/Divider';
import NewsletterCTA from '@/components/shared/NewsletterCTA';
import Hero from '@/components/home/Hero';
import HeroImage from '@/components/home/HeroImage';
import FeaturedDiscoveries from '@/components/home/FeaturedDiscoveries';
import Metrics from '@/components/home/Metrics';
import OurApproach from '@/components/home/OurApproach';
import Testimonial from '@/components/home/Testimonial';

export default function HomePage() {
  return (
    <>
      <Header />
      <Divider />
      <Hero />
      <HeroImage />
      <Divider />
      <FeaturedDiscoveries />
      <Divider />
      <Metrics />
      <Divider />
      <OurApproach />
      <Divider />
      <Testimonial />
      <Divider />
      <NewsletterCTA title="Stay Curious" />
      <Footer />
    </>
  );
}
