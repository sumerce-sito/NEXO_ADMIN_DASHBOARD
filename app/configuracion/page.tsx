import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function ConfiguracionPage() {
  return (
    <PageShell title="Configuración">
      <div className="flex max-w-2xl flex-col gap-6">
        <PageHeader
          title="Configuración"
          description="Ajustes generales de la marca y la plataforma NEXO."
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Identidad de marca</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="marca" className="text-sm font-medium text-foreground">
                Nombre de la marca
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
                Dominio de verificación
              </label>
              <Input id="dominio" defaultValue="quie.co" className="bg-card" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Formato de códigos NFC</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="prefijo" className="text-sm font-medium text-foreground">
                Prefijo
              </label>
              <Input id="prefijo" defaultValue="QUIE-" className="bg-card font-mono" />
            </div>
            <p className="text-sm text-muted-foreground">
              Ejemplo de código generado:{" "}
              <span className="font-mono text-foreground">QUIE-A7B3X9-42</span>
            </p>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button className="bg-[var(--forest)] text-white hover:bg-[var(--forest)]/90">
            Guardar cambios
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
