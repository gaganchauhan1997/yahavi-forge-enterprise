import { useEffect } from 'react'
import LandingNav from './LandingNav'
import HeroSection from './HeroSection'
import ComparisonSection from './ComparisonSection'
import HowItWorksSection from './HowItWorksSection'
import ToolsPreviewSection from './ToolsPreviewSection'
import PricingSection from './PricingSection'
import TestimonialsSection from './TestimonialsSection'
import FAQSection from './FAQSection'
import FinalCTASection from './FinalCTASection'
import LandingFooter from './LandingFooter'
import YahaviChatbot from '@/components/chatbot/YahaviChatbot'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function LandingPage() {
  useScrollReveal()
  return (
    <div className="bg-paper min-h-screen">
      <LandingNav />
      <HeroSection />
      <ComparisonSection />
      <HowItWorksSection />
      <ToolsPreviewSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
      <LandingFooter />
      <YahaviChatbot />
    </div>
  )
}
