"use client";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/lib/content";
export function OrbitalHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  return <header className="site-header"><nav className="nav-shell" aria-label="Main navigation">
    <a className="wordmark" href="#hero" aria-label={`${profile.name} home`}><span className="brand-orbit" aria-hidden="true" /> RQ<span className="accent">/</span></a>
    <div className="desktop-nav">{navItems.map((item, i) => <a key={item.href} href={item.href}><sup>0{i + 1}</sup>{item.label}</a>)}</div>
    <div className="nav-actions"><button className="theme-toggle" aria-label="Toggle color theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>{mounted && resolvedTheme === "light" ? <Moon size={16} /> : <Sun size={16} />}</button><a className="resume-link micro" href={profile.cvPath} download>RÉSUMÉ <ArrowUpRight size={14} /></a></div>
    <div className="mobile-nav"><button className="micro" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>MENU {menuOpen ? "−" : "+"}</button>{menuOpen && <div id="mobile-menu">{navItems.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</div>}</div>
  </nav></header>;
}
