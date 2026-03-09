import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Divider from '@/components/shared/Divider';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import MapSection from '@/components/contact/MapSection';

export const metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <Divider />
      <ContactHero />
      <Divider />
      <section className="flex" style={{ padding: '48px 64px', gap: '48px' }}>
        <ContactForm />
        <ContactInfo />
      </section>
      <Divider />
      <MapSection />
      <Divider />
      <Footer />
    </>
  );
}
