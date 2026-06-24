"use client"

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

const GEO_URL = "/colombia.geo.json"

const COORDS: Record<string, [number, number]> = {
  "Bogotá": [-74.07, 4.71],
  "Medellín": [-75.56, 6.25],
  "Cali": [-76.53, 3.45],
  "Cartagena": [-75.51, 10.39],
  "Fusagasugá": [-74.36, 4.34],
  "Barranquilla": [-74.8, 10.96],
  "Bucaramanga": [-73.12, 7.12],
  "Pereira": [-75.7, 4.81],
}

type CiudadEscaneos = { ciudad: string; escaneos: number }

export function ColombiaMap({ ciudades = [] }: { ciudades?: CiudadEscaneos[] }) {
  const maxEscaneos = ciudades.length ? Math.max(...ciudades.map((c) => c.escaneos)) : 1
  const cities = ciudades
    .filter((c) => COORDS[c.ciudad])
    .map((c) => ({
      name: c.ciudad,
      coordinates: COORDS[c.ciudad],
      size: 80 + (c.escaneos / maxEscaneos) * 240,
    }))
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
