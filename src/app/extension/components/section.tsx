import { ReactNode } from "react"

interface SectionProps {
  title?: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ title, description, children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`space-y-6 ${className}`}>
      {(title || description) && (
        <div>
          {title && <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>}
          {description && <div className="text-sm text-muted-foreground mt-1">{description}</div>}
        </div>
      )}
      {children}
    </section>
  )
} 