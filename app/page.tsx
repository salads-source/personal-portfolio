import { AnimatedBackground } from "@/components/animated-background";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { CursorCoordinates } from "@/components/cursor-coordinates";
import { EducationSection } from "@/components/education-section";
import { ExperienceSection } from "@/components/experience-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SiteHeader } from "@/components/site-header";
import { SkillsSection } from "@/components/skills-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-zinc-950 transition-colors duration-500 dark:text-zinc-50">
      <AnimatedBackground />
      <CursorCoordinates />
      <div className="relative z-10">
        <SiteHeader />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </div>
    </main>
  );
}
