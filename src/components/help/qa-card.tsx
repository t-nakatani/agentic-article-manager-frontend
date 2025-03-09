import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { QAItem } from "@/types/help"

interface QACardProps {
  category: string
  items: QAItem[]
}

export function QACard({ category, items }: QACardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left text-base">{item.question}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-muted-foreground">
                  {item.answer.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

