import { ArrowUpRight, ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { about, education, experience, heroStats, profile, projects, skillGroups } from "@/lib/content";
import { ProjectMotion } from "./project-motion";
function SectionLabel({ number, children }: { number: string; children: string }) {
  return <p className="section-label micro"><span className="accent">{number} /</span> {children}</p>;
}
export function PortfolioSections() {
  return <>
    <section id="about" className="portfolio-section about-section">
      <SectionLabel number="01">THE PERSON BEHIND THE SYSTEMS</SectionLabel>
      <div className="about-layout"><h2>Curiosity.<br />Structure.<br /><em>Real-world impact.</em></h2><div className="about-copy">{about.map(p => <p key={p}>{p}</p>)}<a className="text-link" href={profile.cvPath} download>The full story / Résumé <ArrowUpRight size={15} /></a></div></div>
      <div className="stats-row">{heroStats.map((stat, i) => <div key={stat.label}><span className="micro muted">FIG. 0{i + 1}</span><strong>{stat.value}</strong><p>{stat.label}</p></div>)}</div>
    </section>
    <section id="projects" className="portfolio-section">
      <SectionLabel number="02">SELECTED WORK</SectionLabel>
      <div className="section-title-row"><h2>Complexity in.<br /><em>Clarity out.</em></h2><p>Infrastructure, intelligence, and the<br />systems that connect them.</p></div>
      <ProjectMotion><div className="projects-grid">{projects.map((project, i) => <article className="project-card" key={project.title}>
        <div className={`project-visual diagram-${i}`} aria-hidden="true"><span className="micro figure-label">SYS / 00{i + 1}</span><div className="system-diagram"><i /><i /><i /><i /><b /></div><span className="micro diagram-caption">{["DISTRIBUTED / CONNECTED", "VERIFY / RESOLVE", "ISOLATE / ITERATE", "PERCEIVE / PROCESS"][i]}</span></div>
        <div className="project-copy"><p className="micro accent">{project.context}</p><h3>{project.title}</h3><p>{project.description}</p><div className="project-impact"><span className="signal-dot" />{project.impact}</div></div>
      </article>)}</div></ProjectMotion>
    </section>
    <section id="experience" className="portfolio-section">
      <SectionLabel number="03">TRAJECTORY</SectionLabel>
      <div className="section-title-row"><h2>Built through<br /><em>experience.</em></h2><p>A journey across teams,<br />domains, and scale.</p></div>
      <div className="experience-list">{experience.map((item, i) => <article className="experience-row" key={item.company}>
        <div className="experience-company"><span className="micro accent">0{i + 1}</span><h3>{item.company}</h3><p className="micro muted">{item.location}</p></div>
        <div className="experience-detail"><div className="experience-top"><h4>{item.role}</h4><span className="micro muted">{item.date}</span></div><ul>{item.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><div className="tech-tags">{item.stack.map(tech => <span key={tech}>{tech}</span>)}</div></div>
      </article>)}</div>
    </section>
    <section id="skills" className="portfolio-section">
      <SectionLabel number="04">TOOLKIT</SectionLabel>
      <div className="section-title-row"><h2>The tools<br /><em>behind the work.</em></h2><p>From the interface<br />to the infrastructure.</p></div>
      <div className="skills-list">{skillGroups.map((group, i) => <div key={group.label}><h3><span className="micro muted">0{i + 1}</span>{group.label}</h3><p>{group.items.map(item => <span key={item}>{item}</span>)}</p></div>)}</div>
      <div className="education-row"><p className="micro accent">FOUNDATION / EDUCATION</p><div><h3>{education.school}</h3><p>{education.degree}</p></div><p className="micro muted">{education.date}</p></div>
    </section>
    <section id="contact" className="portfolio-section contact-section">
      <SectionLabel number="05">OPEN A CHANNEL</SectionLabel>
      <div className="contact-heading"><h2>Good things start<br />with a <em>conversation.</em></h2><a className="contact-arrow" href={`mailto:${profile.email}`} aria-label="Email Ron"><ArrowUpRight /></a></div>
      <a className="email-address" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={24} /></a>
      <div className="contact-bottom"><span className="micro muted">BASED IN {profile.location.toUpperCase()}</span><div><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={12} /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={15} /> LinkedIn <ArrowUpRight size={12} /></a><a href={`mailto:${profile.email}`}><Mail size={15} /> Email <ArrowUpRight size={12} /></a></div></div>
    </section>
    <footer className="site-footer micro"><span>{profile.name.toUpperCase()} / SOFTWARE ENGINEER</span><span>STAY CURIOUS. KEEP BUILDING.</span><a href="#hero">BACK TO TOP <ArrowUp size={13} /></a></footer>
  </>;
}
