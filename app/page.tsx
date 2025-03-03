import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { WorkSection } from "@/components/work-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PricingSection } from "@/components/pricing-section";
import { ProcessSection } from "@/components/process-section";
import { ContactSection } from "@/components/contact-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <TestimonialsSection />
      <PricingSection />
      <ProcessSection />
      <TechStackSection />
      <ContactSection />
      <Footer />
    </main>
  );
}