import Image from "next/image"
import { cn } from "@/lib/utils"

// Simple CSS phone frame around an app screenshot (600x1172 WebP in /public/images/app).
// Pass children instead of src to stack several screens (e.g. an animated sequence).
export function PhoneFrame({ src, alt, className, priority, children }: { src?: string; alt: string; className?: string; priority?: boolean; children?: React.ReactNode }) {
  return (
    <div
      role={children ? "img" : undefined}
      aria-label={children ? alt : undefined}
      className={cn("relative aspect-[600/1172] overflow-hidden rounded-[2.75rem] border-[5px] border-[#1d1d1f] bg-black shadow-[0_30px_60px_-20px_rgb(0_0_0/0.35)]", className)}
    >
      {children ?? (src && <Image src={src} alt={alt} fill sizes="(min-width: 768px) 340px, 240px" className="object-cover object-top" priority={priority} />)}
    </div>
  )
}
