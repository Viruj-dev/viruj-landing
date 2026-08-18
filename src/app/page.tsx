"use client";

import { useState } from "react";

import Preloader from "@/components/Preloader";
import { ContactSection, HeroStoryTransition } from "@/components/sections";
import { SiteHeader } from "@/components/sections/SiteHeader";
import {
  CtaSection,
  EcosystemSection,
  
  ProductSection,
  SiteFooter,
  PeaceOfMindSection,
  FAQs,
} from "@/components/sections";

export default function Page() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroStoryTransition />
        <EcosystemSection />
        <ProductSection />
        <PeaceOfMindSection />
        <FAQs/>
        <CtaSection />
        <ContactSection/>
        <SiteFooter />
      </main>
      {showPreloader && <Preloader onReady={() => setShowPreloader(false)} />}
    </>
  );
}
