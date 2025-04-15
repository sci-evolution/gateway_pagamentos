import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InfoIcon as InfoCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Autenticação Gateway</CardTitle>
          <CardDescription>Insira sua API Key para acessar o sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium">
                API Key
              </label>
              <div className="flex gap-2">
                <Input id="apiKey" placeholder="Digite sua API Key" className="flex-1" />
                <Link href="/invoices">
                  <Button className="px-4">
                    <span className="sr-only">Entrar</span>→
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="flex gap-2">
                <InfoCircle className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Como obter uma API Key?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Para obter sua API Key, você precisa criar uma conta de comerciante. Entre em contato com nosso
                    suporte para mais informações.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
