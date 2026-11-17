"use client"

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion"

// LazyMotion + `m` components keep framer-motion small; reducedMotion="user" drops movement for people who ask for less
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
