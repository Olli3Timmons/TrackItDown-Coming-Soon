"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Airbnb-style pill marker with the car model name
const createCustomIcon = (model: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
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
        cursor: default;
      "
      >
        ${model}
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })
}

// Sighting data — spread across the UK with no vertical overlap
const sightings = [
  { id: 1, pos: [51.51, -0.12] as [number, number], model: "Range Rover" },
  { id: 2, pos: [52.48, -1.90] as [number, number], model: "Ford Fiesta" },
  { id: 3, pos: [53.48, -2.24] as [number, number], model: "BMW X5" },
  { id: 4, pos: [51.48, -3.18] as [number, number], model: "Ford Focus" },
  { id: 5, pos: [54.50, -1.55] as [number, number], model: "VW Golf" },
  { id: 6, pos: [50.72, -1.88] as [number, number], model: "Audi A3" },
  { id: 7, pos: [52.95, -1.15] as [number, number], model: "Mercedes C-Class" },
  { id: 8, pos: [50.37, -4.14] as [number, number], model: "Vauxhall Corsa" },
]

export default function InteractiveMap({ className = "w-full min-h-[450px]" }: { className?: string }) {
  const [mounted, setMounted] = useState(false)

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
        center={[52.5, -2.0]} 
        zoom={6.5} 
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
        touchZoom={false}
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
        
        <MapBoundsManager />
      </MapContainer>
    </div>
  )
}

function MapBoundsManager() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}
