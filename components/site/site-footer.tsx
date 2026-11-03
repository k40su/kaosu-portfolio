import { Mail } from "lucide-react"

import {
  LinkedInIcon,
  TwitterIcon,
  YouTubeIcon,
} from "@/components/site/social-icons"
import { Separator } from "@/components/ui/separator"
import { copyright, socials } from "@/lib/content"

const LINKS = [
  { label: "LinkedIn", href: socials.linkedin, icon: LinkedInIcon },
  { label: "YouTube", href: socials.youtube, icon: YouTubeIcon },
  { label: "Twitter", href: socials.twitter, icon: TwitterIcon },
  { label: "Email", href: socials.email, icon: Mail },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-32 lg:scroll-mt-12">
      <Separator />
      <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">{copyright}</p>
        <ul className="grid grid-cols-2 gap-1 sm:flex">
          {LINKS.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-4" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
