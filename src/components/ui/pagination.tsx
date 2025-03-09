import type React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { type ButtonProps, buttonVariants } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalItems, pageSize, onPageChange, className }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize)
  const siblings = 1

  const createRange = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const renderPaginationItems = () => {
    const items: (number | "dots")[] = []
    const leftSiblingIndex = Math.max(currentPage - siblings, 1)
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = createRange(1, rightSiblingIndex)
      items.push(...leftRange, "dots", totalPages)
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      items.push(1, "dots", ...createRange(leftSiblingIndex, totalPages))
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      items.push(1, "dots", ...createRange(leftSiblingIndex, rightSiblingIndex), "dots", totalPages)
    } else {
      items.push(...createRange(1, totalPages))
    }

    return items
  }

  return (
    <nav role="navigation" aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)}>
      <ul className="flex flex-row items-center gap-1">
        <PaginationItem
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </PaginationItem>
        {renderPaginationItems().map((item, index) => {
          if (item === "dots") {
            return (
              <PaginationItem key={`dots-${index}`} disabled>
                <MoreHorizontal className="h-4 w-4" />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem
              key={item}
              isActive={currentPage === item}
              onClick={() => onPageChange(item)}
              aria-label={`Go to page ${item}`}
              aria-current={currentPage === item ? "page" : undefined}
            >
              {item}
            </PaginationItem>
          )
        })}
        <PaginationItem
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </PaginationItem>
      </ul>
    </nav>
  )
}

interface PaginationItemProps extends ButtonProps {
  isActive?: boolean
}

export function PaginationItem({ className, isActive, ...props }: PaginationItemProps) {
  return (
    <li>
      <button
        {...props}
        className={cn(
          buttonVariants({
            variant: isActive ? "default" : "outline",
            size: "icon",
          }),
          className,
        )}
      />
    </li>
  )
}

export const PaginationContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const PaginationLink = ({ children, ...props }: { children: React.ReactNode; href: string }) => (
  <a href={props.href}>{children}</a>
)
export const PaginationEllipsis = () => <span>...</span>
export const PaginationPrevious = ({ onClick, disabled }: { onClick: () => void; disabled: boolean }) => (
  <button onClick={onClick} disabled={disabled}>
    Previous
  </button>
)
export const PaginationNext = ({ onClick, disabled }: { onClick: () => void; disabled: boolean }) => (
  <button onClick={onClick} disabled={disabled}>
    Next
  </button>
)

