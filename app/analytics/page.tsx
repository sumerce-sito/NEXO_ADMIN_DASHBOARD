import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { ColombiaMap } from "@/components/colombia-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { topProductos, topCiudades } from "@/lib/data"

export default function AnalyticsPage() {
  const maxProducto = Math.max(...topProductos.map((p) => p.escaneos))
  const maxCiudad = Math.max(...topCiudades.map((c) => c.escaneos))

  return (
    <PageShell title="Analytics">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Analytics de escaneos"
          description="Distribución geográfica y rendimiento de la autenticación NFC."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Escaneos por región · Colombia</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ColombiaMap />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top 5 productos más escaneados</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Producto</TableHead>
                      <TableHead className="pr-6 text-right">Escaneos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProductos.map((p) => (
                      <TableRow key={p.nombre}>
                        <TableCell className="pl-6">
                          <p className="text-sm font-medium text-foreground">{p.nombre}</p>
                          <div className="mt-1.5 h-1.5 w-full max-w-40 overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full rounded-full bg-[var(--terracotta)]"
                              style={{ width: `${(p.escaneos / maxProducto) * 100}%` }}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="pr-6 text-right text-sm tabular-nums text-muted-foreground">
                          {p.escaneos.toLocaleString("es-CO")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top 5 ciudades</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Ciudad</TableHead>
                      <TableHead className="pr-6 text-right">Escaneos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topCiudades.map((c) => (
                      <TableRow key={c.ciudad}>
                        <TableCell className="pl-6">
                          <p className="text-sm font-medium text-foreground">{c.ciudad}</p>
                          <div className="mt-1.5 h-1.5 w-full max-w-40 overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full rounded-full bg-[var(--forest)]"
                              style={{ width: `${(c.escaneos / maxCiudad) * 100}%` }}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="pr-6 text-right text-sm tabular-nums text-muted-foreground">
                          {c.escaneos.toLocaleString("es-CO")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
