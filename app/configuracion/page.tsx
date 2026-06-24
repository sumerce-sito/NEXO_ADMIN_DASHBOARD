import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function ConfiguracionPage() {
  return (
    <PageShell title="Settings">
      <div className="flex max-w-2xl flex-col gap-6">
        <PageHeader
          title="Settings"
          description="General settings for the brand and the NEXO platform."
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Brand identity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="marca" className="text-sm font-medium text-foreground">
                Brand name
              </label>
              <Input id="marca" defaultValue="QUIE®" className="bg-card" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tagline" className="text-sm font-medium text-foreground">
                Tagline
              </label>
              <Input id="tagline" defaultValue="De la tierra. Para siempre." className="bg-card" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="dominio" className="text-sm font-medium text-foreground">
                Verification domain
              </label>
              <Input id="dominio" defaultValue="quie.co" className="bg-card" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">NFC code format</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="prefijo" className="text-sm font-medium text-foreground">
                Prefix
              </label>
              <Input id="prefijo" defaultValue="QUIE-" className="bg-card font-mono" />
            </div>
            <p className="text-sm text-muted-foreground">
              Sample generated code:{" "}
              <span className="font-mono text-foreground">QUIE-A7B3X9-42</span>
            </p>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-[var(--forest)] text-white hover:bg-[var(--forest)]/90">
            Save changes
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
