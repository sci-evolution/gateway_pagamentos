import { CheckCircle } from "lucide-react"

interface TimelineItem {
  status: string
  data: string
}

interface StatusTimelineProps {
  items: TimelineItem[]
}

export function StatusTimeline({ items }: StatusTimelineProps) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">{item.status}</h4>
            <p className="text-sm text-muted-foreground">{item.data}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
