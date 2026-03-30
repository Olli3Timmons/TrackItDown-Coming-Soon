"use client"

import { useEffect, useState, useCallback, useRef, memo, useMemo } from "react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

/* ------------------------------------------------------------------ */
/*  Animation stages                                                   */
/* ------------------------------------------------------------------ */
type Stage = "idle" | "report" | "alert" | "sightings" | "recovered"

const STAGE_DURATIONS: Record<Stage, number> = {
  idle:       1800,
  report:     2800,
  alert:      3000,
  sightings:  3200,
  recovered:  3500,
}

/* ------------------------------------------------------------------ */
/*  Static map centre                                                  */
/* ------------------------------------------------------------------ */
const UK_CENTER: [number, number] = [52.8, -1.8]

/* ------------------------------------------------------------------ */
/*  Demo scenarios that loop                                           */
/* ------------------------------------------------------------------ */
interface Scenario {
  stolenPos: [number, number]
  stolenModel: string
  stolenColor: string
  stolenReg: string
  communityEyes: { pos: [number, number]; delay: number }[]
  sightingPos: [number, number]
  sightingArea: string
}

const SCENARIOS: Scenario[] = [
  {
    stolenPos: [51.51, -0.12],
    stolenModel: "Range Rover Sport",
    stolenColor: "Black",
    stolenReg: "AB12 CDE",
    communityEyes: [
      { pos: [51.55, 0.06], delay: 0 },
      { pos: [51.58, -0.25], delay: 180 },
      { pos: [51.45, -0.35], delay: 350 },
      { pos: [51.70, -0.15], delay: 500 },
      { pos: [51.38, 0.10], delay: 650 },
    ],
    sightingPos: [51.68, -0.40],
    sightingArea: "Watford",
  },
  {
    stolenPos: [53.48, -2.24],
    stolenModel: "BMW X5",
    stolenColor: "Grey",
    stolenReg: "FG22 HIJ",
    communityEyes: [
      { pos: [53.55, -2.10], delay: 0 },
      { pos: [53.52, -2.45], delay: 180 },
      { pos: [53.60, -2.40], delay: 350 },
      { pos: [53.35, -2.00], delay: 500 },
      { pos: [53.50, -1.80], delay: 650 },
    ],
    sightingPos: [53.50, -2.55],
    sightingArea: "Salford",
  },
  {
    stolenPos: [52.48, -1.90],
    stolenModel: "Mercedes C-Class",
    stolenColor: "White",
    stolenReg: "KL19 MNO",
    communityEyes: [
      { pos: [52.55, -1.70], delay: 0 },
      { pos: [52.45, -2.05], delay: 180 },
      { pos: [52.60, -2.00], delay: 350 },
      { pos: [52.35, -1.65], delay: 500 },
      { pos: [52.52, -1.50], delay: 650 },
    ],
    sightingPos: [52.35, -2.15],
    sightingArea: "Dudley",
  },
]

/* ------------------------------------------------------------------ */
/*  Stable, pre-created icon instances (never recreated on re-render)  */
/* ------------------------------------------------------------------ */
const STOLEN_ICON = L.divIcon({
  className: "stolen-marker",
  html: `
    <div class="map-demo-stolen-pin">
      <div class="map-demo-stolen-ripple"></div>
      <div class="map-demo-stolen-ripple map-demo-stolen-ripple-2"></div>
      <div class="map-demo-stolen-dot"></div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
})

const EYE_ICONS = [0, 180, 350, 500, 650].map((delayMs) =>
  L.divIcon({
    className: "eye-marker",
    html: `
      <div class="map-demo-eye" style="animation-delay:${delayMs}ms">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })
)

/* Dimmed eyes for the sighting stage (non-spotter eyes fade out) */
const EYE_ICONS_DIM = [0, 180, 350, 500, 650].map((delayMs) =>
  L.divIcon({
    className: "eye-marker",
    html: `
      <div class="map-demo-eye map-demo-eye-dim" style="animation-delay:${delayMs}ms">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })
)

/* Highlighted spotter eye — the one that found the vehicle */
const SPOTTER_EYE_ICON = L.divIcon({
  className: "eye-marker",
  html: `
    <div class="map-demo-eye map-demo-eye-spotter">
      <div class="map-demo-spotter-ring"></div>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
})

/* Upgraded sighting marker — glowing beacon with "Spotted" label */
const SIGHTING_ICON = L.divIcon({
  className: "sighting-marker",
  html: `
    <div class="map-demo-sighting-beacon">
      <div class="map-demo-sighting-ring map-demo-sighting-ring-1"></div>
      <div class="map-demo-sighting-ring map-demo-sighting-ring-2"></div>
      <div class="map-demo-sighting-ring map-demo-sighting-ring-3"></div>
      <div class="map-demo-sighting-core">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      </div>
      <div class="map-demo-sighting-label">Spotted</div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
})

const RECOVERED_ICON = L.divIcon({
  className: "recovered-marker",
  html: `
    <div class="map-demo-recovered-pin">
      <div class="map-demo-recovered-ring"></div>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
})

/* ------------------------------------------------------------------ */
/*  Status overlay text (memoized to prevent re-renders from eyes)     */
/* ------------------------------------------------------------------ */
const StageOverlay = memo(function StageOverlay({ stage, scenario }: { stage: Stage; scenario: Scenario }) {
  const content: Record<Stage, { icon: string; label: string; sub: string; color: string }> = {
    idle: { icon: "", label: "", sub: "", color: "" },
    report: {
      icon: "🚨",
      label: `${scenario.stolenModel} reported stolen`,
      sub: `${scenario.stolenColor} · ${scenario.stolenReg}`,
      color: "var(--demo-red)",
    },
    alert: {
      icon: "📡",
      label: "Alert sent to nearby community",
      sub: "Thousands of local eyes activated",
      color: "var(--demo-blue)",
    },
    sightings: {
      icon: "📍",
      label: `Sighting reported near ${scenario.sightingArea}`,
      sub: "Community member spotted the vehicle",
      color: "var(--demo-amber)",
    },
    recovered: {
      icon: "✅",
      label: "Vehicle recovered",
      sub: "Safely returned to the owner",
      color: "var(--demo-green)",
    },
  }

  const c = content[stage]
  if (stage === "idle") return null

  return (
    <div className="map-demo-overlay" key={`${stage}-${scenario.stolenReg}`}>
      <div className="map-demo-toast" style={{ "--toast-accent": c.color } as React.CSSProperties}>
        <span className="map-demo-toast-icon">{c.icon}</span>
        <div className="map-demo-toast-text">
          <span className="map-demo-toast-label">{c.label}</span>
          <span className="map-demo-toast-sub">{c.sub}</span>
        </div>
      </div>
    </div>
  )
})

/* ------------------------------------------------------------------ */
/*  Progress bar (memoized)                                            */
/* ------------------------------------------------------------------ */
const StageProgress = memo(function StageProgress({ stage }: { stage: Stage }) {
  const stages: { key: Stage; label: string }[] = [
    { key: "report", label: "Report" },
    { key: "alert", label: "Alert" },
    { key: "sightings", label: "Sighting" },
    { key: "recovered", label: "Recovered" },
  ]

  const activeIdx = stages.findIndex((s) => s.key === stage)

  return (
    <div className="map-demo-progress">
      {stages.map((s, i) => (
        <div
          key={s.key}
          className={`map-demo-progress-step ${i <= activeIdx ? "active" : ""} ${i === activeIdx ? "current" : ""}`}
        >
          <div className="map-demo-progress-dot">
            {i < activeIdx ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <span>{i + 1}</span>
            )}
          </div>
          <span className="map-demo-progress-label">{s.label}</span>
          {i < stages.length - 1 && <div className={`map-demo-progress-line ${i < activeIdx ? "filled" : ""}`} />}
        </div>
      ))}
    </div>
  )
})

/* ------------------------------------------------------------------ */
/*  Map bounds helper                                                  */
/* ------------------------------------------------------------------ */
function MapBoundsManager() {
  const map = useMap()
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100)
  }, [map])
  return null
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function InteractiveMap({ className = "w-full min-h-[450px]" }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const [stage, setStage] = useState<Stage>("idle")
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [visibleEyes, setVisibleEyes] = useState<number[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const eyeTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const isFirstRun = useRef(true)

  const scenario = SCENARIOS[scenarioIdx]

  useEffect(() => {
    setMounted(true)
  }, [])

  /* Clear any pending eye timers */
  const clearEyeTimers = useCallback(() => {
    eyeTimersRef.current.forEach(clearTimeout)
    eyeTimersRef.current = []
  }, [])

  /* Animation sequencer */
  const runSequence = useCallback(() => {
    const stages: Stage[] = ["report", "alert", "sightings", "recovered"]
    let i = 0

    function next() {
      const s = stages[i]
      setStage(s)

      // Community eyes appear progressively during "alert" stage
      if (s === "alert") {
        setVisibleEyes([])
        clearEyeTimers()
        scenario.communityEyes.forEach((eye, idx) => {
          const t = setTimeout(() => {
            setVisibleEyes((prev) => [...prev, idx])
          }, eye.delay + 400)
          eyeTimersRef.current.push(t)
        })
      }

      i++
      if (i < stages.length) {
        timerRef.current = setTimeout(next, STAGE_DURATIONS[s])
      } else {
        // After recovered stage, move to next scenario
        // Set stage to "report" in the same batch as the idx change
        // so React never renders "recovered" with the new scenario data
        timerRef.current = setTimeout(() => {
          clearEyeTimers()
          setVisibleEyes([])
          setStage("report")
          setScenarioIdx((prev) => (prev + 1) % SCENARIOS.length)
        }, STAGE_DURATIONS.recovered)
      }
    }

    next()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioIdx, clearEyeTimers])

  useEffect(() => {
    if (!mounted) return
    // Only delay on first mount; subsequent loops start instantly
    const delay = isFirstRun.current ? 600 : 0
    isFirstRun.current = false
    const t = setTimeout(() => runSequence(), delay)
    return () => {
      clearTimeout(t)
      if (timerRef.current) clearTimeout(timerRef.current)
      clearEyeTimers()
    }
  }, [mounted, runSequence, clearEyeTimers])

  if (!mounted) {
    return (
      <div className={`bg-muted/20 animate-pulse flex items-center justify-center rounded-2xl border border-border/60 ${className}`}>
        <p className="text-muted-foreground text-sm font-medium">Loading live map...</p>
      </div>
    )
  }

  const showStolenMarker = stage === "report" || stage === "alert" || stage === "sightings"
  const showEyes = stage === "alert" || stage === "sightings"
  const showSighting = stage === "sightings"
  const showRecovered = stage === "recovered"

  return (
    <div className={`relative overflow-hidden z-0 ${className}`}>
      {/* Leaflet Map */}
      <MapContainer
        center={UK_CENTER}
        zoom={6.5}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
        touchZoom={false}
        className="w-full h-full z-0"
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Stolen vehicle marker — uses stable icon ref, no re-create */}
        {showStolenMarker && (
          <Marker position={scenario.stolenPos} icon={STOLEN_ICON} />
        )}

        {/* Community eyes — hide spotter during sighting (beacon replaces it) */}
        {showEyes &&
          scenario.communityEyes.map(
            (eye, idx) => {
              if (!visibleEyes.includes(idx)) return null
              // The eye at index 1 is the "spotter" — hide it during sighting since the beacon takes over
              const isSpotter = idx === 1
              if (isSpotter && showSighting) return null
              const isDim = showSighting && !isSpotter
              const icon = isDim ? EYE_ICONS_DIM[idx] : EYE_ICONS[idx]
              return (
                <Marker key={`eye-${scenarioIdx}-${idx}`} position={eye.pos} icon={icon} />
              )
            }
          )}

        {/* Sighting marker — upgraded beacon */}
        {showSighting && (
          <Marker position={scenario.sightingPos} icon={SIGHTING_ICON} />
        )}

        {/* Recovered marker */}
        {showRecovered && (
          <Marker position={scenario.stolenPos} icon={RECOVERED_ICON} />
        )}

        <MapBoundsManager />
      </MapContainer>

      {/* Stage overlay toast — memoized, won't re-render from eye updates */}
      <StageOverlay stage={stage} scenario={scenario} />

      {/* Bottom progress indicator — memoized */}
      {stage !== "idle" && <StageProgress stage={stage} />}
    </div>
  )
}
