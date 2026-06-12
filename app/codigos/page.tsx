import { Plus, Download, ExternalLink } from "lucide-react"
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
import { getCodigos } from "@/lib/aurora"

export default async function CodigosPage() {
  const codigos = await getCodigos()

  return (
    <PageShell title="Códigos NFC">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Códigos NFC"
          description="Identificadores únicos asociados a cada tag y su URL de verificación."
          actions={
            <>
              <Button variant="outline">
                <Download className="size-4" />
                Exportar CSV
              </Button>
              <Button className="bg-[var(--forest)] text-white hover:bg-[var(--forest)]/90">
                <Plus className="size-4" />
                Generar códigos
              </Button>
            </>
          }
        />

        <Card className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Código NFC</TableHead>
                  <TableHead>Lote</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="pr-6 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codigos.map((c) => (
                  <TableRow key={c.codigo}>
                    <TableCell className="pl-6 font-mono text-xs font-medium text-foreground">
                      {c.codigo}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{c.lote}</TableCell>
                    <TableCell className="text-sm">{c.producto}</TableCell>
                    <TableCell>
                      <StatusBadge estado={c.estado} />
                    </TableCell>
                    <TableCell>
                      <a
                        href={`https://${c.url}`}
                        className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                      >
                        {c.url}
                        <ExternalLink className="size-3.5" />
                      </a>
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
