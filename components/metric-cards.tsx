import { Package, Boxes, Nfc, ScanLine } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { Metrics } from "@/lib/aurora"

export function MetricCards({ metrics }: { metrics: Metrics }) {
  const items = [
    {
      label: "Active products",
      value: metrics.productosActivos,
      delta: "+3 this month",
      icon: Package,
    },
    {
      label: "Batches generated",
      value: metrics.lotesGenerados,
      delta: "+12 this month",
      icon: Boxes,
    },
    {
      label: "Active NFC codes",
      value: metrics.codigosActivos.toLocaleString("es-CO"),
      delta: "+520 this week",
      icon: Nfc,
    },
    {
      label: "Total scans",
      value: metrics.escaneosHoy,
      delta: "all time",
      icon: ScanLine,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.label} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                  {item.value}
                </p>
                <p className="mt-2 text-xs font-medium text-[var(--forest)]">{item.delta}</p>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
