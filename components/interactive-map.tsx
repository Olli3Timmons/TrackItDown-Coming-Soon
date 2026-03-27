"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default marker icons in Next.js/Leaflet
// Instead of images, we'll use a custom HTML div for a modern CSS pinging dot.
const createCustomIcon = (delay: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="position: relative; width: 16px; height: 16px;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; background-color: oklch(0.17 0.005 260); opacity: 0.8;"></div>
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; background-color: oklch(0.17 0.005 260); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; animation-delay: ${delay};"></div>
      </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}

// Dummy data for "recent sightings"
const sightings = [
  { id: 1, pos: [51.505, -0.09] as [number, number], time: "2 mins ago", model: "Range Rover Sport", status: "Spotted moving" },
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
        
        {sightings.map((sighting, idx) => (
          <Marker 
            key={sighting.id} 
            position={sighting.pos}
            icon={createCustomIcon(`${idx * 0.3}s`)}
          >
            <Popup className="rounded-xl overflow-hidden shadow-xl border-0">
              <div className="p-1 min-w-[140px]">
                <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">{sighting.status}</p>
                <p className="text-sm font-bold text-foreground mb-0.5">{sighting.model}</p>
                <p className="text-xs text-muted-foreground">{sighting.time}</p>
              </div>
            </Popup>
          </Marker>
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
