import { about } from "@/lib/content";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";

export function AboutSection() {
  return (
    <MotionSection id="about">
      <SectionHeading
        eyebrow="About"
        title="Engineering instincts shaped by data platforms, compliance systems, and ML deployment."
      />
      <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr]">
        <div className="terminal-panel p-6 sm:p-8">
          <div className="space-y-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {["Backend systems", "Data reliability", "Compliance automation", "Computer vision"].map((item) => (
            <div key={item} className="border border-zinc-950/10 bg-white/60 p-5 font-mono text-sm uppercase tracking-[0.16em] text-zinc-800 dark:border-lime-300/15 dark:bg-zinc-950/45 dark:text-lime-100">
              <span className="mr-3 text-lime-700 dark:text-lime-300">+</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
