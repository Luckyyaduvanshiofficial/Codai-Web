import { HeroSection } from '@/components/marketing/hero-section';
import { StatsSection } from '@/components/marketing/stats-section';
import { FeaturesSection } from '@/components/marketing/features-section';
import { StudentBanner } from '@/components/marketing/student-banner';
import { TestimonialsSection } from '@/components/marketing/testimonials-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { CTASection } from '@/components/marketing/cta-section';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <StudentBanner />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </main>
  );
}
