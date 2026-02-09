'use client'

import { HeroSection } from "@/components/sections/HeroSection";
import { CityListSection } from "@/components/sections/CityListSection";
import { CTASection } from "@/components/sections/CTASection";
import { useState } from "react";
import type { BudgetRange, Region, Environment, Season } from "@/types";

export default function Home() {
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange | ''>('')
  const [selectedRegion, setSelectedRegion] = useState<Region | '전체' | ''>('전체')
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment | ''>('')
  const [selectedSeason, setSelectedSeason] = useState<Season | ''>('')

  return (
    <main className="min-h-screen bg-white">
      <HeroSection
        selectedBudget={selectedBudget}
        selectedRegion={selectedRegion}
        selectedEnvironment={selectedEnvironment}
        selectedSeason={selectedSeason}
        onBudgetChange={setSelectedBudget}
        onRegionChange={setSelectedRegion}
        onEnvironmentChange={setSelectedEnvironment}
        onSeasonChange={setSelectedSeason}
      />
      <CityListSection
        selectedBudget={selectedBudget}
        selectedRegion={selectedRegion}
        selectedEnvironment={selectedEnvironment}
        selectedSeason={selectedSeason}
      />
      <CTASection />
    </main>
  );
}
