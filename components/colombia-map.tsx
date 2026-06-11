"use client"

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

const GEO_URL = "/colombia.geo.json"

const cities = [
  { name: "Bogotá", coordinates: [-74.07, 4.71], size: 320 },
  { name: "Medellín", coordinates: [-75.56, 6.25], size: 260 },
  { name: "Cali", coordinates: [-76.53, 3.45], size: 210 },
  { name: "Cartagena", coordinates: [-75.51, 10.39], size: 160 },
  { name: "Fusagasugá", coordinates: [-74.36, 4.34], size: 120 },
] as const

export function ColombiaMap() {
  return (
    <div className="relative w-full max-w-md">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1150, center: [-73.5, 4.6] }}
        width={520}
        height={520}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#ece3d8"
                stroke="#d4956a"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#e0d3c2", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        {cities.map((city) => (
          <Marker key={city.name} coordinates={city.coordinates as [number, number]}>
            <circle r={Math.sqrt(city.size) / 1.2} fill="#c4622d" fillOpacity={0.22} />
            <circle r={4} fill="#c4622d" stroke="#ffffff" strokeWidth={1.5} />
            <text
              y={-12}
              textAnchor="middle"
              fill="#1a1a1a"
              style={{ fontSize: 10, fontWeight: 600 }}
            >
              {city.name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}
