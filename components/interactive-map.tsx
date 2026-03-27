"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default marker icons in Next.js/Leaflet
// Creating an Airbnb-style pill marker with the car model name inner text
const createCustomIcon = (model: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker', // Override default leaflet styling
    html: `
      <div style="
        background-color: white;
        color: oklch(0.17 0.005 260);
        padding: 6px 14px;
        border-radius: 24px;
        font-family: inherit;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: -0.01em;
        white-space: nowrap;
        width: max-content;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05);
        transform: translate(-50%, -50%);
        transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);
        cursor: pointer;
      "
      onmouseover="this.style.transform='translate(-50%, -50%) scale(1.08)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)'"
      onmouseout="this.style.transform='translate(-50%, -50%) scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)'"
      >
        ${model}
      </div>
    `,
    iconSize: [0, 0], // Set to 0 so the inner translate(-50%, -50%) centers it perfectly regardless of text width
    iconAnchor: [0, 0],
  })
}

// Dummy data for "recent sightings"
const sightings = [
  { id: 1, pos: [51.505, -0.09] as [number, number], time: "2 mins ago", model: "Range Rover", status: "Spotted moving" },
  { id: 2, pos: [52.4862, -1.8904] as [number, number], time: "15 mins ago", model: "Ford Fiesta", status: "Parked unattended" },
  { id: 3, pos: [53.4808, -2.2426] as [number, number], time: "1 hour ago", model: "BMW X5", status: "Reported missing" },
  { id: 4, pos: [51.4545, -2.5879] as [number, number], time: "Just now", model: "Audi A3", status: "Police notified" },
  { id: 5, pos: [53.8008, -1.5491] as [number, number], time: "4 hours ago", model: "VW Golf", status: "Recovered" },
]

export default function InteractiveMap({ className = "w-full min-h-[450px]" }: { className?: string }) {
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`bg-muted/20 animate-pulse flex items-center justify-center rounded-2xl border border-border/60 ${className}`}>
        <p className="text-muted-foreground text-sm font-medium">Loading live map...</p>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden z-0 ${className}`}>
      <MapContainer 
        center={[52.5, -1.5]} 
        zoom={6} 
        scrollWheelZoom={false}
        className="w-full h-full z-0"
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {sightings.map((sighting) => (
          <Marker 
            key={sighting.id} 
            position={sighting.pos}
            icon={createCustomIcon(sighting.model)}
          />
        ))}
        
        {/* Helper to center/pad the map slightly better on mobile */}
        <MapBoundsManager />
      </MapContainer>

      {/* Fade overlay for styling, similar to the static image version */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none z-[400]" />
      
      <div className="absolute bottom-0 inset-x-0 p-6 text-center z-[400] pointer-events-none">
        <p className="text-sm font-semibold text-foreground">
          See real-time sightings on a live map
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Track reported sightings and recovery progress in real-time
        </p>
      </div>
    </div>
  )
}

// Optional helper to adjust the view slightly once loaded to ensure markers fit well
function MapBoundsManager() {
  const map = useMap();
  useEffect(() => {
    // Just a tiny timeout to ensure tiles are ready before any auto-panning if needed
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}
