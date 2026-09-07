"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { profile } from "@/lib/content";
const EffectScene = dynamic(() => import("./effect-scene").then(m => m.EffectScene), { ssr: false });
export function OrbitalHero() {
  const [paused, setPaused] = useState(false);
  return <section id="hero" className="orbital-hero">
    <div className="hero-topline micro"><span>PORTFOLIO / {profile.role.toUpperCase()}</span><span>{profile.location.toUpperCase()}</span></div>
    <div className="hero-art"><EffectScene paused={paused} /><div className="orbit-caption micro"><span className="signal-dot" /> EVENT HORIZON / 001</div>
      <button className="motion-control micro" onClick={() => setPaused(!paused)} aria-label={paused ? "Play black hole animation" : "Pause black hole animation"} aria-pressed={paused}>{paused ? <Play size={12} /> : <Pause size={12} />} {paused ? "PLAY" : "PAUSE"}</button>
    </div>
    <div className="hero-copy"><p className="micro hero-intro">HELLO, I’M</p><h1>Ron Quah<span className="accent">.</span></h1>
      <div className="hero-description"><p>I build systems<br />that hold up <em>at scale.</em></p><span>{profile.headline}</span></div>
      <div className="hero-actions"><a className="primary-link" href="#projects">Explore my work <ArrowDown size={16} /></a><a className="text-link" href={`mailto:${profile.email}`}>Get in touch <ArrowUpRight size={16} /></a></div>
    </div>
    <div className="hero-bottom micro"><span>BACKEND / DATA / APPLIED ML</span><a href="#about">SCROLL TO EXPLORE <ArrowDown size={12} /></a><span>DRAWN TO COMPLEX PROBLEMS</span></div>
  </section>;
}
