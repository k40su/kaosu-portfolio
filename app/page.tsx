import { ArrowDown, ArrowUpRight, AtSign } from "lucide-react"

import { AnimatedCursor } from "@/components/site/animated-cursor"
import { Background } from "@/components/site/background"
import { EntryCard, GlowCard } from "@/components/site/glow-card"
import { Section } from "@/components/site/section"
import { Sidebar } from "@/components/site/sidebar"
import { SiteFooter } from "@/components/site/site-footer"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import {
  education,
  experience,
  interests,
  profile,
  projects,
  skills,
} from "@/lib/content"

export default function Page() {
  return (
    <>
      <Background />
      <AnimatedCursor />
      <Sidebar />

      <div className="mx-auto max-w-3xl px-5 lg:ml-[max(20rem,calc(50%-14.5rem))]">
        <main className="flex flex-col gap-24 pt-16 pb-24 lg:gap-32 lg:pt-0">
          <section
            id="about"
            className="flex scroll-mt-32 flex-col justify-center lg:min-h-svh lg:py-16"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {profile.handle}
            </p>
            <h1 className="mt-2 font-heading text-5xl font-semibold tracking-tight sm:text-7xl">
              {profile.name}
            </h1>
            <TextGenerateEffect
              words={profile.tagline}
              className="mt-4 text-2xl font-medium tracking-tight text-balance sm:text-3xl"
            />
            <div className="mt-6 flex max-w-2xl flex-col gap-3 text-base leading-relaxed text-muted-foreground">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={buttonVariants({ size: "lg" })}>
                View projects
                <ArrowDown data-icon="inline-end" />
              </a>
              <a
                href="#contact"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Get in touch
                <AtSign data-icon="inline-end" />
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-[2fr_1fr]">
              <GlowCard>
                <h2 className="text-sm font-medium">Stack</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <li key={skill}>
                      <Badge variant="secondary">{skill}</Badge>
                    </li>
                  ))}
                </ul>
              </GlowCard>
              <GlowCard>
                <h2 className="text-sm font-medium">Interests</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <li key={interest}>
                      <Badge variant="secondary">{interest}</Badge>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </div>
          </section>

          <Section id="education" title="Education">
            {education.map((entry) => (
              <EntryCard key={entry.title} {...entry} />
            ))}
          </Section>

          <Section id="experience" title="Work experience">
            {experience.map((entry) => (
              <EntryCard key={entry.place} {...entry} />
            ))}
          </Section>

          <Section id="projects" title="Projects">
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <GlowCard key={project.name} className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-heading text-lg font-semibold tracking-tight">
                      {project.name}
                    </h3>
                    <Badge variant="secondary" className="shrink-0">
                      {project.status}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1 rounded-lg text-sm font-medium hover:underline"
                    >
                      Visit
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  )}
                </GlowCard>
              ))}
            </div>
          </Section>
        </main>

        <div className="pb-8">
          <SiteFooter />
        </div>
      </div>
    </>
  )
}
