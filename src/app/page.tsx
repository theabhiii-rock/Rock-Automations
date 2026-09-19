import HeroSection from '@/components/home/HeroSection';
import TrustStrip from '@/components/home/TrustStrip';
import ServicesSection from '@/components/home/ServicesSection';
import IndustriesSection from '@/components/home/IndustriesSection';
import FounderShowcase from '@/components/home/FounderShowcase';
import MyProjectsSection from '@/components/home/MyProjectsSection';
import MarketplacePreview from '@/components/home/MarketplacePreview';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import TechStackStrip from '@/components/home/TechStackStrip';
import CtaBanner from '@/components/home/CtaBanner';

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-[#07090E] text-white">
      <HeroSection />
      <TrustStrip />
      <ServicesSection />
      <IndustriesSection />
      <FounderShowcase />
      <MyProjectsSection />
      <MarketplacePreview />
      <HowItWorks />
      <TestimonialsSection />
      <FAQSection />
      <TechStackStrip />
      <CtaBanner />
    </div>
  );
}
