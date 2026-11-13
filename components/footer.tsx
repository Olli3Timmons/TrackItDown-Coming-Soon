import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card px-4 py-8 text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          {/* The mark is white, so it sits on a dark app-icon tile */}
          <span className="flex h-6 w-6 items-center justify-center rounded-[22%] bg-[#1d1d1f]">
            <Image src="/images/logo-mark.svg" alt="" width={15} height={15} />
          </span>
          <span className="font-semibold text-foreground">TrackItDown</span>
        </div>

        <nav aria-label="Footer" className="flex">
          <Link href="/privacy" className="px-3 py-3 hover:text-foreground hover:underline">Privacy</Link>
          <a href="mailto:trackitdowwnn@gmail.com" className="px-3 py-3 hover:text-foreground hover:underline">Contact</a>
        </nav>

        <p className="text-center sm:text-right">
          © 2026 Trackitdown Ltd. Registered in England &amp; Wales, company no. 17532660.
        </p>
      </div>
    </footer>
  )
}
