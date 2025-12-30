import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";

import ApartmentCatalog from "./components/ApartmentCatalog";
import UrgencyBanner from "./components/UrgencyBanner";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import FloatingCTA from "./components/FloatingCTA";
import MarketingBonus from "./components/MarketingBonus";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroCarousel />
      <ApartmentCatalog />
      <UrgencyBanner />
      <TestimonialsSection />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
      <FloatingCTA />
      <MarketingBonus />
    </main>
  );
}