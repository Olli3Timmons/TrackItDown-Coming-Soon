import Link from "next/link"

export function Header() {
  return (
    <header role="banner" className="w-full">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" aria-label="TrackItDown home" className="flex items-center gap-2 text-foreground">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="12" x2="16.24" y2="5.76" />
            <path d="M12 8 A4 4 0 0 1 16 12" />
            <path d="M12 5 A7 7 0 0 1 19 12" />
            <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
          </svg>
          <span className="text-lg font-extrabold tracking-tight">TrackItDown</span>
        </Link>
      </div>
    </header>
  )
}
