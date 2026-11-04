import { ImageResponse } from "next/og"

export const alt = "TrackItDown — stolen vehicle? Your community can help find it."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Link preview for WhatsApp, Facebook, X etc. Rendered at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#0a0a0a", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="72" height="72" viewBox="0 0 1024 1024">
            <rect width="1024" height="1024" rx="224" fill="#fff" />
            <rect x="237" y="218" width="550" height="166" rx="83" fill="#000" />
            <rect x="429" y="218" width="166" height="550" rx="83" fill="#000" />
            <circle cx="736" cy="691" r="77" fill="#000" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700 }}>TrackItDown</div>
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
          Stolen vehicle? Your community can help find it.
        </div>
        <div style={{ fontSize: 32, color: "#a3a3a3" }}>Coming soon to iPhone and Android</div>
      </div>
    ),
    size
  )
}
