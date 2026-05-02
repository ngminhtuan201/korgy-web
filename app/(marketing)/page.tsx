import { Pricing } from "@/components/pricing";
import { CTA } from "./_components/cta";
import { Features } from "./_components/features";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
