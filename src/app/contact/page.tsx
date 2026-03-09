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
      <div className="content-wrapper">
        <Divider />
        <ContactHero />
        <Divider />
        <section
          className="flex flex-col md:flex-row"
          style={{
            padding: 'var(--spacing-section-y-sm) var(--spacing-page-x)',
            gap: 'var(--spacing-column-gap)',
          }}
        >
          <ContactForm />
          <ContactInfo />
        </section>
        <Divider />
        <MapSection />
        <Divider />
        <Footer />
      </div>
    </>
  );
}
