import { Download } from "lucide-react";
import { navItems, profile } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-950/10 bg-fog/86 backdrop-blur-xl transition-colors duration-500 dark:border-lime-300/10 dark:bg-ink/86">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10" aria-label="Main navigation">
        <a
          href="#hero"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
        >
          <span className="relative grid size-9 place-items-center border border-zinc-950 bg-fog font-mono text-sm font-semibold text-zinc-950 dark:border-lime-300/50 dark:bg-ink dark:text-lime-200">
            <span className="absolute -right-1 -top-1 size-2 bg-lime-500" aria-hidden />
            {profile.initials}
          </span>
          <span className="hidden font-mono text-sm uppercase tracking-[0.28em] text-zinc-900 group-hover:text-lime-700 sm:inline dark:text-zinc-100 dark:group-hover:text-lime-200">
            {profile.name}
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-700 transition hover:text-lime-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 dark:text-zinc-300 dark:hover:text-lime-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={profile.cvPath}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 border border-zinc-950 bg-zinc-950 px-4 font-mono text-xs uppercase tracking-[0.16em] text-white transition hover:bg-lime-500 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 dark:border-lime-300 dark:bg-lime-300 dark:text-zinc-950 dark:hover:bg-lime-200"
          >
            <Download aria-hidden className="size-4" />
            <span className="hidden sm:inline">CV</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
