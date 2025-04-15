import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusTimeline } from "@/components/status-timeline"
import { StatusBadge } from "@/components/status-badge"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { getInvoiceById } from "@/lib/data"
import { notFound } from "next/navigation"

interface InvoiceDetailsPageProps {
  params: {
    id: string
  }
}

export default async function InvoiceDetailsPage({ params }: InvoiceDetailsPageProps) {
  // Awaiting params to ensure it's fully resolved
  const p = await params
  const id = p.id

  // Buscar a fatura pelo ID
  const invoice = getInvoiceById(id)

  // Se a fatura não for encontrada, retornar 404
  if (!invoice) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/invoices">
            <Button variant="outline" size="icon">
              <ArrowLeft size={18} />
              <span className="sr-only">Voltar</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Fatura #{invoice.id}
              <StatusBadge status={invoice.status} />
            </h1>
            <p className="text-sm text-muted-foreground">Criada em {invoice.creationDate}</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Download size={16} />
          Download PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Fatura</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">ID da Fatura</dt>
                <dd className="font-medium">#{invoice.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Valor</dt>
                <dd className="font-medium">{invoice.value}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Data de Criação</dt>
                <dd className="font-medium">{invoice.creationDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Última Atualização</dt>
                <dd className="font-medium">{invoice.lastUpdate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Descrição</dt>
                <dd className="font-medium">{invoice.description}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status da Transação</CardTitle>
          </CardHeader>
          <CardContent>{invoice.timeline && <StatusTimeline items={invoice.timeline} />}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Método de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            {invoice.paymentMethod && (
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Tipo</dt>
                  <dd className="font-medium">{invoice.paymentMethod.type}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Últimos Dígitos</dt>
                  <dd className="font-medium">{invoice.paymentMethod.lastDigits}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Titular</dt>
                  <dd className="font-medium">{invoice.paymentMethod.holder}</dd>
                </div>
              </dl>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dados Adicionais</CardTitle>
          </CardHeader>
          <CardContent>
            {invoice.additionalData && (
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">ID da Conta</dt>
                  <dd className="font-medium">{invoice.additionalData.accountId}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">IP do Cliente</dt>
                  <dd className="font-medium">{invoice.additionalData.clientIp}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Dispositivo</dt>
                  <dd className="font-medium">{invoice.additionalData.device}</dd>
                </div>
              </dl>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
