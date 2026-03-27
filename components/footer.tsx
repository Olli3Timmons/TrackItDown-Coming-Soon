import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo-mark.svg"
              alt="TrackItDown logo"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="text-sm font-semibold text-foreground">TrackItDown</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="mailto:hello@trackitdown.co.uk" className="hover:text-foreground transition-colors">Contact</a>
          </div>

          <p className="text-xs text-muted-foreground/70">
            © 2026 TrackItDown. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
