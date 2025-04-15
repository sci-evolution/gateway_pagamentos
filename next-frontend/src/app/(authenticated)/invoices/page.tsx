"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from "@/components/status-badge"
import { Pagination } from "@/components/pagination"
import { Eye, Download, Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { invoices } from "@/lib/data"

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-2xl">Faturas</CardTitle>
          <CardDescription>Gerencie suas faturas e acompanhe os pagamentos</CardDescription>
        </div>
        <Link href="/invoices/create">
          <Button className="gap-2">
            <Plus size={16} />
            Nova Fatura
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <label htmlFor="status" className="text-sm font-medium block mb-2">
                Status
              </label>
              <Select defaultValue="todos">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="rejeitado">Rejeitado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="dataInicial" className="text-sm font-medium block mb-2">
                Data Inicial
              </label>
              <Input id="dataInicial" placeholder="dd/mm/aaaa" />
            </div>
            <div>
              <label htmlFor="dataFinal" className="text-sm font-medium block mb-2">
                Data Final
              </label>
              <Input id="dataFinal" placeholder="dd/mm/aaaa" />
            </div>
            <div>
              <label htmlFor="buscar" className="text-sm font-medium block mb-2">
                Buscar
              </label>
              <Input id="buscar" placeholder="ID ou descrição" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">DATA</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">DESCRIÇÃO</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">VALOR</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">STATUS</th>
                  <th className="text-right py-3 px-4 text-sm font-medium">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border">
                    <td className="py-3 px-4">#{invoice.id}</td>
                    <td className="py-3 px-4">{invoice.date}</td>
                    <td className="py-3 px-4">{invoice.description}</td>
                    <td className="py-3 px-4">{invoice.value}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/invoices/${invoice.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye size={18} />
                            <span className="sr-only">Ver detalhes</span>
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon">
                          <Download size={18} />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando 1 - {invoices.length} de {invoices.length} resultados
            </div>
            <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
