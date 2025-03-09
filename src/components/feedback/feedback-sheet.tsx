"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { FeedbackForm } from "./feedback-form"

interface FeedbackSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeedbackSheet({ open, onOpenChange }: FeedbackSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>フィードバック</SheetTitle>
        </SheetHeader>
        <FeedbackForm onClose={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  )
}

