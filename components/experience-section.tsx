import { experience } from "@/lib/content";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";

export function ExperienceSection() {
  return (
    <MotionSection id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Production-facing engineering across high-trust systems."
        description="A compact timeline of internships and engineering roles from the CV."
      />
      <div className="space-y-5">
        {experience.map((item) => (
          <article key={`${item.company}-${item.role}`} className="terminal-panel p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-lime-700 dark:text-lime-300">
                  {item.location}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">{item.role}</h3>
                <p className="mt-1 text-base text-zinc-700 dark:text-zinc-300">{item.company}</p>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                {item.date}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <span key={tech} className="border border-zinc-950/10 bg-zinc-950/[0.03] px-3 py-1 font-mono text-xs text-zinc-700 dark:border-lime-300/15 dark:bg-lime-300/[0.05] dark:text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-3 size-1.5 shrink-0 bg-lime-600 dark:bg-lime-300" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </MotionSection>
  );
}
