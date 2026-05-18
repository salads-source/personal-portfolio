import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 max-w-3xl", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime-700 dark:text-lime-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-zinc-950 sm:text-4xl dark:text-zinc-50">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">{description}</p>
      ) : null}
    </div>
  );
}
