import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ZimmerSection from "@/components/sections/ZimmerSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactFooter from "@/components/sections/ContactFooter";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ZimmerSection />
      <TestimonialsSection />
      <ContactFooter />
    </main>
  );
}
