"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"
import { motion } from "motion/react"
import {
  AtSign,
  Briefcase,
  FolderGit2,
  GraduationCap,
  UserRound,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { profile } from "@/lib/content"
import { cn } from "@/lib/utils"

const LINKS = [
  { id: "about", label: "About", icon: UserRound },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "contact", label: "Contact", icon: AtSign },
]

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true })
  window.addEventListener("resize", onChange)
  return () => {
    window.removeEventListener("scroll", onChange)
    window.removeEventListener("resize", onChange)
  }
}

function getActiveSection() {
  const { scrollHeight } = document.documentElement
  if (window.innerHeight + window.scrollY >= scrollHeight - 2) {
    return LINKS[LINKS.length - 1].id
  }
  let active = LINKS[0].id
  for (const { id } of LINKS) {
    const top = document.getElementById(id)?.getBoundingClientRect().top
    if (top !== undefined && top <= window.innerHeight * 0.4) active = id
  }
  return active
}

export function Sidebar() {
  const active = useSyncExternalStore(
    subscribe,
    getActiveSection,
    () => LINKS[0].id
  )
  const navRef = useRef<HTMLElement>(null)

  // On mobile the shortcuts scroll sideways, so keep the current one visible.
  useEffect(() => {
    const nav = navRef.current
    const link = nav?.querySelector<HTMLElement>("[aria-current]")
    if (!nav || !link) return
    nav.scrollTo({
      left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2,
      behavior: "smooth",
    })
  }, [active])

  return (
    <aside className="sticky top-3 z-40 mx-3 mt-3 rounded-3xl bg-card/70 p-3 ring-1 ring-foreground/10 backdrop-blur-xl lg:fixed lg:top-1/2 lg:left-[max(1.5rem,calc(50%-33rem))] lg:m-0 lg:w-64 lg:-translate-y-1/2 lg:p-5">
      <a
        href="#about"
        className="flex items-center gap-3 rounded-2xl lg:flex-col lg:gap-4 lg:text-center"
      >
        <Avatar className="size-10 lg:size-28">
          <AvatarImage src={profile.image} alt={profile.name} />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>
        <span className="min-w-0">
          <span className="block font-heading text-base font-semibold tracking-tight lg:text-xl">
            {profile.name}
          </span>
          <span className="block truncate text-xs text-muted-foreground lg:mt-1 lg:whitespace-normal">
            {profile.role}
          </span>
        </span>
      </a>

      <nav
        ref={navRef}
        aria-label="Sections"
        className="relative mt-3 -mb-1 flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] lg:mt-6 lg:mb-0 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {LINKS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative flex shrink-0 items-center gap-2.5 rounded-2xl px-3 py-2 text-sm transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="active-section"
                  className="absolute inset-0 rounded-2xl bg-foreground/10"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <Icon className="relative size-4" aria-hidden="true" />
              <span className="relative">{label}</span>
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
