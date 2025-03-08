interface Step {
  title: string
  description: string
}

interface StepsProps {
  steps: Step[]
}

export function Steps({ steps }: StepsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {steps.map((step, i) => (
        <div key={i} className="relative">
          <div className="bg-white dark:bg-theme-900 rounded-lg border p-4">
            <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-theme-600 text-white flex items-center justify-center font-semibold">
              {i + 1}
            </div>
            <h3 className="font-semibold mb-2 pt-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

