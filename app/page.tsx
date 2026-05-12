import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Features } from "@/components/sections/features";
import { ExampleCourse } from "@/components/sections/example-course";
import { WaitlistSection } from "@/components/sections/waitlist-section";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Features />
        <ExampleCourse />
        <WaitlistSection />
      </main>
      <SiteFooter />
    </>
  );
}
