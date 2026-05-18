import { projects } from "@/lib/content";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";

export function ProjectsSection() {
  return (
    <MotionSection id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Selected systems from recent engineering work."
        description="The CV does not list standalone personal projects, so this section highlights shipped systems and pipelines directly from work experience."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <article key={project.title} className="group border border-zinc-950/10 bg-white/68 p-6 backdrop-blur transition hover:border-lime-600/45 hover:shadow-glow dark:border-lime-300/15 dark:bg-zinc-950/50 dark:hover:border-lime-300/60">
              <div className="flex items-start justify-between gap-4">
                <div className="grid size-12 place-items-center border border-lime-700/25 bg-lime-500/10 text-lime-700 dark:border-lime-300/25 dark:text-lime-200">
                  <Icon aria-hidden className="size-5" />
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  {project.context}
                </p>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">{project.title}</h3>
              <p className="mt-4 leading-7 text-zinc-700 dark:text-zinc-300">{project.description}</p>
              <p className="mt-5 border-t border-zinc-950/10 pt-4 font-mono text-sm text-lime-700 dark:border-lime-300/10 dark:text-lime-300">
                {project.impact}
              </p>
            </article>
          );
        })}
      </div>
    </MotionSection>
  );
}
