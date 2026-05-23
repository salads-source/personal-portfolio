import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "@/lib/content";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";

export function ContactSection() {
  return (
    <MotionSection id="contact" className="pb-10">
      <div className="terminal-panel p-6 sm:p-8 lg:p-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk systems, internships, and engineering problems worth tightening."
          description="Best reached by email."
          className="mb-8"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <a href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer" className="contact-link">
            <Mail aria-hidden className="size-5" />
            <span>Email</span>
            <ArrowUpRight aria-hidden className="ml-auto size-4" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
            <Linkedin aria-hidden className="size-5" />
            <span>LinkedIn</span>
            <ArrowUpRight aria-hidden className="ml-auto size-4" />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="contact-link">
            <Github aria-hidden className="size-5" />
            <span>GitHub</span>
            <ArrowUpRight aria-hidden className="ml-auto size-4" />
          </a>
          <a href={`tel:${profile.phone.replaceAll(" ", "")}`} target="_blank" rel="noopener noreferrer" className="contact-link">
            <Phone aria-hidden className="size-5" />
            <span>Phone</span>
            <ArrowUpRight aria-hidden className="ml-auto size-4" />
          </a>
        </div>

      </div>
    </MotionSection>
  );
}
