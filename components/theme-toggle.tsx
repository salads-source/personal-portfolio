"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative inline-flex size-11 items-center justify-center border border-zinc-950/15 bg-white/70 text-zinc-950 shadow-sm backdrop-blur transition hover:border-lime-600/60 hover:text-lime-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 dark:border-lime-300/20 dark:bg-zinc-950/60 dark:text-zinc-100 dark:hover:border-lime-300/70 dark:hover:text-lime-200"
    >
      <span className="absolute inset-1 border border-transparent transition group-hover:border-lime-500/30" />
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -45, opacity: 0, scale: 0.85 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 45, opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18 }}
          >
            {isDark ? <Moon aria-hidden className="size-4" /> : <Sun aria-hidden className="size-4" />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
