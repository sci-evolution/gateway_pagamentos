import { Input } from "@/components/ui/input"
import { CreditCard } from "lucide-react"

export function CreditCardForm() {
  return (
    <div className="rounded-lg bg-card p-4 space-y-4">
      <h3 className="text-lg font-medium">Dados do Cartão</h3>

      <div className="space-y-2">
        <label htmlFor="cardNumber" className="text-sm font-medium">
          Número do Cartão
        </label>
        <div className="relative">
          <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
          <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="expirationDate" className="text-sm font-medium">
            Data de Expiração
          </label>
          <Input id="expirationDate" placeholder="MM/AA" />
        </div>
        <div className="space-y-2">
          <label htmlFor="cvv" className="text-sm font-medium">
            CVV
          </label>
          <Input id="cvv" placeholder="123" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="cardholderName" className="text-sm font-medium">
          Nome no Cartão
        </label>
        <Input id="cardholderName" placeholder="Como aparece no cartão" />
      </div>
    </div>
  )
}
