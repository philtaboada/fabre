import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";
import AboutSection from "./components/AboutSection";
import AwardsSection from "./components/AwardsSection";
import Catalog from "./components/Catalog";
import UrgencyBanner from "./components/UrgencyBanner";
import AmenitiesShowcase from "./components/AmenitiesShowcase";
import FinancingSection from "./components/FinancingSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CertificationsShowcase from "./components/CertificationsShowcase";
import BlogSection from "./components/BlogSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import FloatingCTA from "./components/FloatingCTA";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroCarousel />
      <AboutSection />
      <AwardsSection />
      <Catalog />
      <UrgencyBanner />
      <AmenitiesShowcase />
      <FinancingSection />
      <TestimonialsSection />
      <CertificationsShowcase />
      <BlogSection />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
      <FloatingCTA />
    </main>
  );
}