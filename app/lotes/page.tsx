import { Plus } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { RowActions } from "@/components/row-actions"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { lotes } from "@/lib/data"

export default function LotesPage() {
  return (
    <PageShell title="Lotes">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Lotes"
          description="Producción agrupada de tags NFC por referencia."
          actions={
            <Button className="bg-[var(--forest)] text-white hover:bg-[var(--forest)]/90">
              <Plus className="size-4" />
              Nuevo lote
            </Button>
          }
        />

        <Card className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">ID Lote</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Total Tags</TableHead>
                  <TableHead className="pr-6 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lotes.map((lote) => (
                  <TableRow key={lote.id}>
                    <TableCell className="pl-6 font-mono text-xs font-medium text-foreground">
                      {lote.id}
                    </TableCell>
                    <TableCell className="text-sm">{lote.producto}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{lote.fecha}</TableCell>
                    <TableCell>
                      <StatusBadge estado={lote.estado} />
                    </TableCell>
                    <TableCell className="text-sm tabular-nums text-foreground">
                      {lote.totalTags.toLocaleString("es-CO")}
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <RowActions />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </PageShell>
  )
}
