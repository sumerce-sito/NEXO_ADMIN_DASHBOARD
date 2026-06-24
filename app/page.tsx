import { PageShell } from "@/components/page-shell"
import { MetricCards } from "@/components/metric-cards"
import { ScansChart } from "@/components/scans-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getMetrics, getRecentScans } from "@/lib/aurora"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const [metrics, recentScans] = await Promise.all([getMetrics(), getRecentScans()])

  return (
    <PageShell title="Dashboard">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground text-balance">
            Overview
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time status of QUIE® NFC authentication.
          </p>
        </div>

        <MetricCards metrics={metrics} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Recent NFC scans</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Code</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead className="pr-6">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentScans.map((scan) => (
                      <TableRow key={scan.codigo}>
                        <TableCell className="pl-6 font-mono text-xs font-medium text-foreground">
                          {scan.codigo}
                        </TableCell>
                        <TableCell className="text-sm">{scan.producto}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{scan.ciudad}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{scan.dispositivo}</TableCell>
                        <TableCell className="pr-6 text-sm text-muted-foreground">{scan.fecha}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Scans · last 7 days</CardTitle>
            </CardHeader>
            <CardContent>
              <ScansChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  )
}
