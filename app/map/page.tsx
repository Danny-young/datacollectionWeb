"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"

// Dynamic import for Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

// Mock data for properties
const properties = [
  {
    id: 1,
    valuation_no: "AN-DA-002",
    type: "Commercial",
    address: "Darkuman Avenue, Ablekuma Central",
    lat: 5.5913,
    lng: -0.2466,
  },
  {
    id: 2,
    valuation_no: "AN-KA-015",
    type: "Residential",
    address: "Kaneshie Road, Ablekuma Central",
    lat: 5.5651,
    lng: -0.2414,
  },
  {
    id: 3,
    valuation_no: "AS-OD-007",
    type: "Industrial",
    address: "Odorkor Main, Ablekuma South",
    lat: 5.5842,
    lng: -0.2672,
  },
]

export default function MapPage() {
  const [hoveredProperty, setHoveredProperty] = useState<number | null>(null)
  const router = useRouter()

  return (
    <div className="container py-6">
      <h1 className="mb-6 text-3xl font-bold">Property Map</h1>
      <div className="h-[600px] relative">
        <MapContainer
          center={[5.6037, -0.187]} // Coordinates for Accra
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={[property.lat, property.lng]}
              eventHandlers={{
                click: () => router.push(`/property/${property.id}`),
                mouseover: () => setHoveredProperty(property.id),
                mouseout: () => setHoveredProperty(null),
              }}
            >
              <Popup>{property.address}</Popup>
            </Marker>
          ))}
        </MapContainer>
        {hoveredProperty !== null && (
          <Card className="absolute bottom-4 left-4 z-[1000] w-64">
            <CardContent className="p-4">
              <h3 className="font-bold">{properties.find((p) => p.id === hoveredProperty)?.valuation_no}</h3>
              <p>{properties.find((p) => p.id === hoveredProperty)?.type}</p>
              <p className="text-sm text-muted-foreground">
                {properties.find((p) => p.id === hoveredProperty)?.address}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

