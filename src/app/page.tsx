import { Hero } from "@/components/sections/Hero";
import { SevenStages } from "@/components/sections/SevenStages";
import { Compass } from "@/components/sections/Compass";
import { WhyMe } from "@/components/sections/WhyMe";
import { WhatToExpect } from "@/components/sections/WhatToExpect";
// import { Creed } from "@/components/sections/Creed";
import { Testimonials } from "@/components/sections/Testimonials";
import { MaybeNotYou } from "@/components/sections/MaybeNotYou";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <SevenStages />
      <Compass />
      <WhyMe />
      <WhatToExpect />
      {/* <Creed /> */}
      <Testimonials />
      <MaybeNotYou />
      <LeadMagnet />
      <Faq />
      <FinalCta />
    </>
  );
}
