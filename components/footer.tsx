import Image from "next/image"
import Link from "next/link"

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

          <nav aria-label="Footer" className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <a href="mailto:trackitdowwnn@gmail.com" className="hover:text-foreground">Contact</a>
          </nav>

          <p className="text-center text-xs text-muted-foreground sm:text-right">
            © 2026 Trackitdown Ltd. Registered in England &amp; Wales, company no. 17532660.
          </p>
        </div>
      </div>
    </footer>
  )
}
