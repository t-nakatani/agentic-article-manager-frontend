interface Step {
  title: string
  description: string
}

interface StepsProps {
  steps: Step[]
}

export function Steps({ steps }: StepsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {steps.map((step, index) => (
        <div 
          key={index} 
          className="flex flex-col h-full"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-100 text-theme-600 font-semibold text-sm">
              {index + 1}
            </div>
            <h3 className="font-semibold">{step.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground flex-grow">{step.description}</p>
        </div>
      ))}
    </div>
  )
} 