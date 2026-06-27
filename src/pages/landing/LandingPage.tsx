import HeroSection from './HeroSection';
import ComparisonSection from './ComparisonSection';
import HowItWorksSection from './HowItWorksSection';
import ToolsPreviewSection from './ToolsPreviewSection';
import PricingSection from './PricingSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import FinalCTASection from './FinalCTASection';
import LandingNav from './LandingNav';
import LandingFooter from './LandingFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF6E9]">
      <LandingNav />
      <main>
        <HeroSection />
        <ComparisonSection />
        <HowItWorksSection />
        <ToolsPreviewSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
