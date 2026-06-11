"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Boxes,
  Nfc,
  BarChart3,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/productos", label: "Productos", icon: Package },
  { href: "/lotes", label: "Lotes", icon: Boxes },
  { href: "/codigos", label: "Códigos NFC", icon: Nfc },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/configuracion", label: "Configuración", icon: Settings },
]

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <span className="font-mono text-sm font-bold tracking-tight">NX</span>
        </div>
        <div className="leading-tight">
          <p className="text-base font-semibold tracking-wide text-sidebar-accent-foreground">
            NEXO
          </p>
          <p className="text-[11px] text-sidebar-foreground/60">QUIE® · Admin</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2">
        <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
          General
        </p>
        <ul className="flex flex-col gap-1">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="size-[18px] shrink-0" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border px-6 py-5">
        <p className="text-xs leading-relaxed text-sidebar-foreground/50">
          De la tierra.
          <br />
          Para siempre.
        </p>
      </div>
    </div>
  )
}
