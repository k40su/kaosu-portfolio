"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"

export function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-32 lg:scroll-mt-12">
      <Reveal>
        <h2 className="mb-6 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <div className="flex flex-col gap-4">{children}</div>
      </Reveal>
    </section>
  )
}
