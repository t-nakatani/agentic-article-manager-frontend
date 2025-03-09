import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <Icon className="h-8 w-8 mb-3 text-theme-600" />
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
} 