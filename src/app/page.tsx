import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import DownloadSection from "@/components/sections/DownloadSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <DownloadSection />
      <ContactSection />
    </>
  );
}
