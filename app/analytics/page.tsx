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
import { getTopProductos } from "@/lib/aurora"
import { getTopCiudades } from "@/lib/dynamodb"

export const dynamic = "force-dynamic"

export default async function AnalyticsPage() {
  const [topProductos, topCiudades] = await Promise.all([
    getTopProductos(),
    getTopCiudades().catch(() => []),
  ])
  const maxProducto = topProductos.length ? Math.max(...topProductos.map((p) => p.escaneos)) : 1
  const maxCiudad = topCiudades.length ? Math.max(...topCiudades.map((c) => c.escaneos)) : 1

  return (
    <PageShell title="Analytics">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Scan analytics"
          description="Geographic distribution and NFC authentication performance."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Scans by region · Colombia</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ColombiaMap ciudades={topCiudades} />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top 5 most scanned products</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Product</TableHead>
                      <TableHead className="pr-6 text-right">Scans</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProductos.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={2} className="pl-6 text-sm text-muted-foreground">
                          Not enough scans yet.
                        </TableCell>
                      </TableRow>
                    )}
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
                <CardTitle className="text-base">Top 5 cities</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">City</TableHead>
                      <TableHead className="pr-6 text-right">Scans</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topCiudades.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={2} className="pl-6 text-sm text-muted-foreground">
                          Not enough scans yet.
                        </TableCell>
                      </TableRow>
                    )}
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
