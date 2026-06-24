import { Plus, Package } from "lucide-react"
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
import { getProductos } from "@/lib/aurora"

export const dynamic = "force-dynamic"

export default async function ProductosPage() {
  const productos = await getProductos()

  return (
    <PageShell title="Products">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Products"
          description="Catalog of leather accessories with NFC authentication."
          actions={
            <Button className="bg-[var(--forest)] text-white hover:bg-[var(--forest)]/90">
              <Plus className="size-4" />
              New product
            </Button>
          }
        />

        <Card className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productos.map((p) => (
                  <TableRow key={p.nombre}>
                    <TableCell className="pl-6">
                      <div className="flex size-10 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                        <Package className="size-5" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{p.nombre}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.categoria}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.color}</TableCell>
                    <TableCell>
                      <StatusBadge estado={p.estado} />
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
