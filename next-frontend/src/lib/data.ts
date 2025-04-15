export type StatusType = "Aprovado" | "Pendente" | "Rejeitado"

export interface Invoice {
  id: string
  date: string
  description: string
  value: string
  status: StatusType
  creationDate?: string
  lastUpdate?: string
  paymentMethod?: {
    type: string
    lastDigits: string
    holder: string
  }
  additionalData?: {
    accountId: string
    clientIp: string
    device: string
  }
  timeline?: {
    status: string
    data: string
  }[]
}

// Dados de exemplo para as faturas
export const invoices: Invoice[] = [
  {
    id: "INV-001",
    date: "30/03/2025",
    description: "Compra Online #123",
    value: "R$ 1.500,00",
    status: "Aprovado",
    creationDate: "30/03/2025 14:30",
    lastUpdate: "30/03/2025 14:35",
    paymentMethod: {
      type: "Cartão de Crédito",
      lastDigits: "**** **** **** 1234",
      holder: "João da Silva",
    },
    additionalData: {
      accountId: "ACC-12345",
      clientIp: "192.168.1.1",
      device: "Desktop - Chrome",
    },
    timeline: [
      {
        status: "Fatura Criada",
        data: "30/03/2025 14:30",
      },
      {
        status: "Pagamento Processado",
        data: "30/03/2025 14:32",
      },
      {
        status: "Transação Aprovada",
        data: "30/03/2025 14:35",
      },
    ],
  },
  {
    id: "INV-002",
    date: "29/03/2025",
    description: "Serviço Premium",
    value: "R$ 15.000,00",
    status: "Pendente",
    creationDate: "29/03/2025 10:15",
    lastUpdate: "29/03/2025 10:15",
    paymentMethod: {
      type: "Cartão de Crédito",
      lastDigits: "**** **** **** 5678",
      holder: "Maria Silva",
    },
    additionalData: {
      accountId: "ACC-12346",
      clientIp: "192.168.1.2",
      device: "Mobile - Safari",
    },
    timeline: [
      {
        status: "Fatura Criada",
        data: "29/03/2025 10:15",
      },
      {
        status: "Aguardando Pagamento",
        data: "29/03/2025 10:15",
      },
    ],
  },
  {
    id: "INV-003",
    date: "28/03/2025",
    description: "Assinatura Mensal",
    value: "R$ 99,90",
    status: "Rejeitado",
    creationDate: "28/03/2025 08:45",
    lastUpdate: "28/03/2025 08:50",
    paymentMethod: {
      type: "Cartão de Crédito",
      lastDigits: "**** **** **** 9012",
      holder: "Pedro Santos",
    },
    additionalData: {
      accountId: "ACC-12347",
      clientIp: "192.168.1.3",
      device: "Desktop - Firefox",
    },
    timeline: [
      {
        status: "Fatura Criada",
        data: "28/03/2025 08:45",
      },
      {
        status: "Pagamento Processado",
        data: "28/03/2025 08:47",
      },
      {
        status: "Transação Rejeitada",
        data: "28/03/2025 08:50",
      },
    ],
  },
]

// Função para buscar uma fatura pelo ID
export function getInvoiceById(id: string): Invoice | undefined {
  // Remove o prefixo "#" se existir
  const cleanId = id.replace("#", "")
  return invoices.find((invoice) => invoice.id === cleanId)
}
