import { skillGroups } from "@/lib/content";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";

export function SkillsSection() {
  return (
    <MotionSection id="skills">
      <SectionHeading eyebrow="Skills" title="Technical stack with backend depth and product-surface range." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <article key={group.label} className="terminal-panel p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center border border-lime-700/25 bg-lime-500/10 text-lime-700 dark:border-lime-300/25 dark:text-lime-200">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-zinc-950 dark:text-zinc-50">
                  {group.label}
                </h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="border border-zinc-950/10 bg-zinc-950/[0.03] px-3 py-1.5 text-sm text-zinc-700 dark:border-lime-300/15 dark:bg-lime-300/[0.04] dark:text-zinc-300">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </MotionSection>
  );
}
