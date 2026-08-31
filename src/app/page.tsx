import { Hero } from "@/components/sections/Hero";
import { ValueStrip } from "@/components/sections/ValueStrip";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { WhyWorkWithMe } from "@/components/sections/WhyWorkWithMe";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ContactForm } from "@/components/sections/ContactForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <FeaturedWork />
      <Services />
      <Process />
      <WhyWorkWithMe />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <ContactForm />
    </>
  );
}
