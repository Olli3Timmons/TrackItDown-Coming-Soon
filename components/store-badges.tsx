import { Apple, Play } from "lucide-react"
import { cn } from "@/lib/utils"

// App isn't released yet: badges are labels, not links. Swap the <li> contents for <a href="store url"> at launch.
const stores = [
  { icon: Apple, label: "App Store" },
  { icon: Play, label: "Google Play" },
]

export function StoreBadges({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-3", className)} aria-label="Coming soon to these app stores">
      {stores.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex h-14 items-center gap-3 rounded-xl bg-white px-5 text-neutral-950 shadow-lg shadow-black/40"
        >
          <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
          <span className="flex flex-col leading-tight text-left">
            <span className="text-[11px] uppercase tracking-wide text-neutral-500">Coming soon to</span>
            <span className="text-base font-semibold">{label}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
