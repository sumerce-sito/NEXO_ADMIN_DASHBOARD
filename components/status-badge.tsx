import { cn } from "@/lib/utils"
import type { Estado } from "@/lib/data"

const config: Record<Estado, { label: string; className: string }> = {
  activo: { label: "Activo", className: "bg-[var(--forest)]/12 text-[var(--forest)]" },
  completado: { label: "Completado", className: "bg-[var(--forest)]/12 text-[var(--forest)]" },
  pendiente: { label: "Pendiente", className: "bg-[var(--gold)]/25 text-[#8a6a18]" },
  inactivo: { label: "Inactivo", className: "bg-muted text-muted-foreground" },
}

export function StatusBadge({ estado }: { estado: Estado }) {
  const { label, className } = config[estado]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}
