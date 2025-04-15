import { cn } from "@/lib/utils"
import type { StatusType } from "@/lib/data"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusClasses = (status: StatusType) => {
    switch (status) {
      case "Aprovado":
        return "bg-green-500/20 text-green-500 border border-green-500/50"
      case "Pendente":
        return "bg-yellow-500/20 text-yellow-500 border border-yellow-500/50"
      case "Rejeitado":
        return "bg-destructive/20 text-destructive border border-destructive/50"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <span
      className={cn("inline-block px-3 py-1 rounded-full text-xs font-medium", getStatusClasses(status), className)}
    >
      {status}
    </span>
  )
}
