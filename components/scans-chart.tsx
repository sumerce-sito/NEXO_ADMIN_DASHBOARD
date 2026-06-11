"use client"

import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { scansByDay } from "@/lib/data"

export function ScansChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-72 min-h-72 w-full min-w-0" />
  }

  return (
    <div className="h-72 min-h-72 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart data={scansByDay} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#e2d8cb" />
          <XAxis
            dataKey="dia"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6b5f52", fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6b5f52", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "#ece3d8" }}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e2d8cb",
              background: "#ffffff",
              color: "#1a1a1a",
              fontSize: 12,
            }}
            labelStyle={{ color: "#1a1a1a", fontWeight: 600 }}
            formatter={(value: number) => [`${value} escaneos`, ""]}
          />
          <Bar dataKey="escaneos" fill="#c4622d" radius={[6, 6, 0, 0]} maxBarSize={44} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
