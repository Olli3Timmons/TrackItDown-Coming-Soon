"use client"

import { useEffect, useState, useRef } from "react"
import { FileWarning, Radio, Eye, CheckCircle } from "lucide-react"

const stages = [
  {
    key: "report",
    icon: FileWarning,
    label: "Reported Stolen",
    color: "rgb(239, 68, 68)",    // red-500
    bgColor: "rgba(239, 68, 68, 0.12)",
    ringColor: "rgba(239, 68, 68, 0.25)",
    detail: "BMW X5 · Grey · FG22 HIJ",
  },
  {
    key: "alert",
    icon: Radio,
    label: "Community Alerted",
    color: "rgb(59, 130, 246)",    // blue-500
    bgColor: "rgba(59, 130, 246, 0.12)",
    ringColor: "rgba(59, 130, 246, 0.25)",
    detail: "127 eyes notified nearby",
  },
  {
    key: "sighting",
    icon: Eye,
    label: "Sighting Reported",
    color: "rgb(245, 158, 11)",    // amber-500
    bgColor: "rgba(245, 158, 11, 0.12)",
    ringColor: "rgba(245, 158, 11, 0.25)",
    detail: "Spotted near Watford",
  },
  {
    key: "recovered",
    icon: CheckCircle,
    label: "Vehicle Recovered",
    color: "rgb(16, 185, 129)",    // emerald-500
    bgColor: "rgba(16, 185, 129, 0.12)",
    ringColor: "rgba(16, 185, 129, 0.25)",
    detail: "Safely returned to owner",
  },
]

export function MobileRecoveryFlow() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const advance = () => {
      setIsAnimating(true)
      timerRef.current = setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % stages.length)
        setIsAnimating(false)
      }, 150) // brief fade-out before switching
    }

    const interval = setInterval(advance, 2400)
    return () => {
      clearInterval(interval)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const active = stages[activeIdx]
  const ActiveIcon = active.icon

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in-up animation-delay-600">
      <div className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5 shadow-lg overflow-hidden">

        {/* Active stage display */}
        <div
          className="flex items-center gap-4 transition-all duration-300"
          style={{ opacity: isAnimating ? 0 : 1, transform: isAnimating ? 'translateY(8px)' : 'translateY(0)' }}
        >
          {/* Icon circle with pulse ring */}
          <div className="relative shrink-0">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-500"
              style={{ backgroundColor: active.bgColor }}
            >
              <ActiveIcon className="h-6 w-6" style={{ color: active.color }} />
            </div>
            {/* Pulse ring */}
            <div
              className="absolute inset-0 rounded-xl animate-[mobile-pulse_2s_ease-out_infinite]"
              style={{ borderColor: active.ringColor, borderWidth: '2px', borderStyle: 'solid' }}
            />
          </div>

          {/* Text */}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-foreground leading-tight">{active.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{active.detail}</p>
          </div>
        </div>

        {/* Step progress dots */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/40">
          {stages.map((stage, idx) => {
            const StageIcon = stage.icon
            const isPast = idx < activeIdx
            const isCurrent = idx === activeIdx
            return (
              <div key={stage.key} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500"
                    style={{
                      backgroundColor: isCurrent ? stage.bgColor : isPast ? stage.bgColor : 'rgba(0,0,0,0.04)',
                      transform: isCurrent ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    {isPast ? (
                      <CheckCircle className="h-4 w-4" style={{ color: stage.color }} />
                    ) : (
                      <StageIcon
                        className="h-3.5 w-3.5 transition-colors duration-500"
                        style={{ color: isCurrent ? stage.color : 'rgba(0,0,0,0.2)' }}
                      />
                    )}
                  </div>
                  <span
                    className="text-[10px] font-medium leading-tight text-center transition-colors duration-300"
                    style={{ color: isCurrent || isPast ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                  >
                    {stage.key === "report" ? "Report" : stage.key === "alert" ? "Alert" : stage.key === "sighting" ? "Spotted" : "Found"}
                  </span>
                </div>
                {/* Connector line */}
                {idx < stages.length - 1 && (
                  <div className="w-full h-[2px] rounded-full -mt-3 transition-colors duration-500" style={{
                    backgroundColor: idx < activeIdx ? stage.color : 'rgba(0,0,0,0.08)',
                    opacity: idx < activeIdx ? 0.4 : 1,
                  }} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
