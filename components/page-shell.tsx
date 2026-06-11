import type { ReactNode } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Topbar } from "@/components/topbar"

export function PageShell({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 md:block">
        <div className="fixed inset-y-0 w-64">
          <SidebarNav />
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
