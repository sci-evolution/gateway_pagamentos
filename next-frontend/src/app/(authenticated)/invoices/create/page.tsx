"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CreditCardForm } from "@/components/credit-card-form"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewInvoicePage() {
  const router = useRouter()
  const [value, setValue] = useState("")

  // Calcular valores
  const numericValue = Number.parseFloat(value.replace(/[^\d,]/g, "").replace(",", ".")) || 0
  const fee = numericValue * 0.02
  const total = numericValue + fee

  // Formatar valores para exibição
  const formatValue = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para enviar os dados para a API
    router.push("/invoices")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Criar Nova Fatura</CardTitle>
        <p className="text-sm text-muted-foreground">Preencha os dados abaixo para processar um novo pagamento</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="value" className="text-sm font-medium">
                  Valor
                </label>
                <Input id="value" placeholder="R$ 0,00" value={value} onChange={(e) => setValue(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Descrição
                </label>
                <Textarea id="description" placeholder="Descreva o motivo do pagamento" className="min-h-[120px]" />
              </div>
            </div>

            <div className="space-y-6">
              <CreditCardForm />
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatValue(numericValue)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de Processamento (2%)</span>
              <span>{formatValue(fee)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
              <span>Total</span>
              <span>{formatValue(total)}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/invoices")}>
              Cancelar
            </Button>
            <Button type="submit">Processar Pagamento</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
