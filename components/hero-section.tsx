"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { heroStats, profile } from "@/lib/content";

const lines = [
  "boot: portfolio.runtime",
  "scope: backend | data | compliance | ml",
  "signal: singapore",
  "status: building reliable systems"
];

const titleRoles = [
  "a software engineer",
  "a backend engineer",
  "a data platform engineer",
  "an ML engineer",
  "a full-stack developer",
  "a systems builder"
];

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] border-b border-zinc-950/10 dark:border-lime-300/10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 right-0 top-[24%] border-t border-zinc-950/10 dark:border-lime-300/10" />
        <div className="absolute bottom-[18%] left-0 right-0 border-t border-zinc-950/10 dark:border-lime-300/10" />
        <div className="absolute bottom-0 top-0 hidden border-l border-zinc-950/10 lg:left-[23.5%] lg:block dark:border-lime-300/10" />
        <div className="absolute bottom-0 top-0 hidden border-l border-zinc-950/10 lg:right-[23.5%] lg:block dark:border-lime-300/10" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-10">
        <motion.div
          className="flex flex-1 flex-col items-center justify-center pb-10 pt-12 text-center sm:pt-16 lg:pb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 inline-flex items-center gap-2 border border-zinc-950/15 bg-fog/80 px-3 py-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500 backdrop-blur dark:border-lime-300/20 dark:bg-ink/55 dark:text-zinc-400">
            <span className="size-2 bg-lime-500 shadow-glow" />
            Profile in action
          </div>
          <TypewriterTitle />
          <p className="mx-auto mt-5 max-w-2xl font-mono text-sm leading-7 text-zinc-700 sm:text-base dark:text-zinc-300">
            Backend, data platform, compliance, and ML engineering across Kafka, Spring Boot, ClickHouse, Redis, Kubernetes, React, and PyTorch.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 border border-zinc-950 bg-zinc-950 px-5 font-mono text-xs uppercase tracking-[0.16em] text-white transition hover:bg-lime-500 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 dark:border-lime-300 dark:bg-lime-300 dark:text-zinc-950 dark:hover:bg-lime-200"
            >
              Contact <ArrowRight aria-hidden className="size-4" />
            </a>
            <a
              href={profile.cvPath}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 border border-zinc-950/30 bg-fog/70 px-5 font-mono text-xs uppercase tracking-[0.16em] text-zinc-950 transition hover:border-lime-700 hover:text-lime-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 dark:border-lime-300/30 dark:bg-ink/60 dark:text-zinc-100 dark:hover:border-lime-300 dark:hover:text-lime-200"
            >
              <Download aria-hidden className="size-4" /> Download CV
            </a>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-lime-700 dark:hover:text-lime-200">
              <Linkedin aria-hidden className="size-4" /> LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-lime-700 dark:hover:text-lime-200">
              <Github aria-hidden className="size-4" /> GitHub
            </a>
            <a href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-lime-700 dark:hover:text-lime-200">
              <Mail aria-hidden className="size-4" /> {profile.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden className="size-4" /> {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone aria-hidden className="size-4" /> {profile.phone}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="mb-4 grid gap-4 lg:grid-cols-[1fr_0.68fr]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="terminal-panel p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-zinc-950/10 pb-3 dark:border-lime-300/10">
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
                Current signal
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-lime-700 dark:text-lime-300">
                Systems online
              </span>
            </div>
            <div className="mt-5 grid gap-3 font-mono text-sm text-zinc-700 sm:grid-cols-2 dark:text-zinc-300">
              {lines.map((line, index) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.1 }}
                >
                  <span className="text-lime-700 dark:text-lime-300">$</span> {line}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="terminal-panel p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="border border-zinc-950/10 bg-zinc-950/[0.03] p-4 dark:border-lime-300/15 dark:bg-lime-300/[0.04]">
                  <p className="font-mono text-2xl font-semibold text-zinc-950 dark:text-lime-200">{stat.value}</p>
                  <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mb-4 grid gap-3 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-zinc-500 sm:grid-cols-2 dark:text-zinc-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-wrap gap-x-4 gap-y-1 border border-zinc-950/10 bg-fog/50 px-4 py-2 dark:border-lime-300/10 dark:bg-ink/45">
            <span>client: portfolio</span>
            <span>viewport: responsive</span>
            <span>status: static export</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 border border-zinc-950/10 bg-fog/50 px-4 py-2 sm:justify-end dark:border-lime-300/10 dark:bg-ink/45">
            <span>timezone: singapore</span>
            <span>runtime: next.js</span>
            <span>mode: light/dark</span>
          </div>
        </motion.div>

        <div className="mb-6 overflow-hidden border border-zinc-950 bg-fog/80 py-3 font-mono text-xs uppercase tracking-[0.18em] text-zinc-950 dark:border-lime-300/40 dark:bg-ink/80 dark:text-lime-100">
          <div className="animate-ticker whitespace-nowrap">
            Ron Quah / NUS Computer Science / Google SWE Intern / Shopee Data Platform / Binance Global KYC / Kafka / ClickHouse / Spring Boot / PyTorch /
            Ron Quah / NUS Computer Science / Google SWE Intern / Shopee Data Platform / Binance Global KYC / Kafka / ClickHouse / Spring Boot / PyTorch /
          </div>
        </div>
      </div>
    </section>
  );
}

function TypewriterTitle() {
  const role = useTypewriter(titleRoles);

  return (
    <h1 className="mx-auto min-h-[9rem] max-w-6xl text-balance text-5xl font-normal leading-[0.94] text-zinc-950 sm:min-h-[12rem] sm:text-7xl lg:min-h-[13rem] lg:text-8xl dark:text-zinc-50">
      <span className="block">Hello, I&apos;m Ron,</span>
      <span className="block text-lime-700 dark:text-lime-200">
        {role}
        <span className="ml-2 inline-block h-[0.82em] w-[0.08em] translate-y-[0.08em] animate-caret bg-lime-600 dark:bg-lime-200" />
      </span>
    </h1>
  );
}

function useTypewriter(phrases: string[]) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    const isComplete = characterIndex === phrase.length;
    const isEmpty = characterIndex === 0;
    const delay = isComplete && !isDeleting ? 1400 : isDeleting ? 32 : 58;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
        return;
      }

      setCharacterIndex((current) => current + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [characterIndex, isDeleting, phraseIndex, phrases]);

  return phrases[phraseIndex].slice(0, characterIndex);
}
