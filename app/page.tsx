import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TopCitiesSection } from "@/components/sections/TopCitiesSection";
import { RegionsSection } from "@/components/sections/RegionsSection";
import { BudgetSection } from "@/components/sections/BudgetSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <StatsSection />
      <TopCitiesSection />
      <RegionsSection />
      <BudgetSection />
      <ReviewsSection />
      <CTASection />
    </main>
  );
}
