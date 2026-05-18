import { GraduationCap } from "lucide-react";
import { education } from "@/lib/content";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";

export function EducationSection() {
  return (
    <MotionSection id="education">
      <SectionHeading eyebrow="Education" title="Computer Science foundation at NUS." />
      <article className="terminal-panel flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center border border-lime-700/25 bg-lime-500/10 text-lime-700 dark:border-lime-300/25 dark:text-lime-200">
            <GraduationCap aria-hidden className="size-6" />
          </span>
          <div>
            <h3 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">{education.school}</h3>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">{education.degree}</p>
          </div>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          {education.date}
        </p>
      </article>
    </MotionSection>
  );
}
