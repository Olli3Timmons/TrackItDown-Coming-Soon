import Image from "next/image"
import { cn } from "@/lib/utils"

// Simple CSS phone frame around an app screenshot (600x1172 WebP in /public/images/app)
export function PhoneFrame({ src, alt, className, priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={cn("relative aspect-[600/1172] overflow-hidden rounded-[2.25rem] border-[6px] border-neutral-800 bg-black shadow-2xl shadow-black/60 ring-1 ring-white/10", className)}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 320px, 70vw" className="object-cover object-top" priority={priority} />
    </div>
  )
}
