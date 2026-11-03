"use client"

import { useEffect, useSyncExternalStore } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

// Touch devices and reduced-motion users keep their native cursor.
const QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
const TARGETS = "a, button, [data-cursor-target]"
const REST_SIZE = 28
const TARGET_PADDING = 6
const SPRING = { stiffness: 420, damping: 34, mass: 0.6 }

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

const CORNERS = [
  "top-0 left-0 rounded-tl-[3px] border-t-2 border-l-2",
  "top-0 right-0 rounded-tr-[3px] border-t-2 border-r-2",
  "bottom-0 left-0 rounded-bl-[3px] border-b-2 border-l-2",
  "bottom-0 right-0 rounded-br-[3px] border-b-2 border-r-2",
]

export function AnimatedCursor() {
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  )

  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)
  const opacity = useMotionValue(0)
  const dotScale = useSpring(1, SPRING)
  const frameX = useSpring(0, SPRING)
  const frameY = useSpring(0, SPRING)
  const frameWidth = useSpring(REST_SIZE, SPRING)
  const frameHeight = useSpring(REST_SIZE, SPRING)

  useEffect(() => {
    if (!enabled) return

    const root = document.documentElement
    root.classList.add("cursor-hidden")

    let last: { x: number; y: number } | null = null

    const place = (x: number, y: number, element: Element | null) => {
      dotX.set(x)
      dotY.set(y)
      const target = element?.closest(TARGETS)
      if (target) {
        const rect = target.getBoundingClientRect()
        frameX.set(rect.left - TARGET_PADDING)
        frameY.set(rect.top - TARGET_PADDING)
        frameWidth.set(rect.width + TARGET_PADDING * 2)
        frameHeight.set(rect.height + TARGET_PADDING * 2)
      } else {
        frameX.set(x - REST_SIZE / 2)
        frameY.set(y - REST_SIZE / 2)
        frameWidth.set(REST_SIZE)
        frameHeight.set(REST_SIZE)
      }
    }

    const onMove = (event: PointerEvent) => {
      if (!last) {
        // Start at the pointer rather than flying in from the corner.
        frameX.jump(event.clientX - REST_SIZE / 2)
        frameY.jump(event.clientY - REST_SIZE / 2)
      }
      last = { x: event.clientX, y: event.clientY }
      opacity.set(1)
      place(event.clientX, event.clientY, event.target as Element)
    }

    // Scrolling moves elements under a still pointer, so re-check what it is over.
    const onScroll = () => {
      if (last) place(last.x, last.y, document.elementFromPoint(last.x, last.y))
    }
    const onLeave = () => opacity.set(0)
    const onDown = () => dotScale.set(0.5)
    const onUp = () => dotScale.set(1)

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    root.addEventListener("mouseleave", onLeave)

    return () => {
      root.classList.remove("cursor-hidden")
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      root.removeEventListener("mouseleave", onLeave)
    }
  }, [
    enabled,
    dotX,
    dotY,
    dotScale,
    opacity,
    frameX,
    frameY,
    frameWidth,
    frameHeight,
  ])

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-100 mix-blend-difference"
    >
      <motion.div
        className="absolute top-0 left-0 -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-white"
        style={{ x: dotX, y: dotY, scale: dotScale, opacity }}
      />
      <motion.div
        className="absolute top-0 left-0"
        style={{
          x: frameX,
          y: frameY,
          width: frameWidth,
          height: frameHeight,
          opacity,
        }}
      >
        {CORNERS.map((corner) => (
          <span
            key={corner}
            className={`absolute size-2 border-white ${corner}`}
          />
        ))}
      </motion.div>
    </div>
  )
}
