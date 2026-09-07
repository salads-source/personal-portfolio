import { OrbitalHero } from "@/components/orbital-hero";
import { PortfolioSections } from "@/components/portfolio-sections";
import { OrbitalHeader } from "@/components/orbital-header";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <OrbitalHeader />
      <main id="content"><OrbitalHero /><PortfolioSections /></main>
    </>
  );
}
