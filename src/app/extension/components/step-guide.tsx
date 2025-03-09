import { ReactNode } from "react"

interface StepGuideProps {
  children: ReactNode;
}

export function StepGuide({ children }: StepGuideProps) {
  return (
    <div className="border border-border rounded-lg p-6 bg-card/50">
      {children}
    </div>
  )
} 