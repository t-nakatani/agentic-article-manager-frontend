"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface WeekSelectorProps {
  weekStart: Date
  weekEnd: Date
  weekRangeText: string
  onPreviousWeek: () => void
  onNextWeek: () => void
  onSelectWeek: (date: Date) => void
}

export function WeekSelector({
  weekStart,
  weekEnd,
  weekRangeText,
  onPreviousWeek,
  onNextWeek,
  onSelectWeek,
}: WeekSelectorProps) {
  const [open, setOpen] = useState(false)
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onSelectWeek(date)
      setOpen(false)
    }
  }

  const today = new Date()
  const isCurrentWeek = weekStart <= today && today <= weekEnd
  
  return (
    <div className="flex items-center justify-between bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onPreviousWeek}
          aria-label="前の週"
          className="hover:bg-indigo-100 dark:hover:bg-indigo-800 hover:text-indigo-700 dark:hover:text-indigo-300"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-auto justify-start text-left font-normal hover:bg-indigo-100 dark:hover:bg-indigo-800 hover:text-indigo-700 dark:hover:text-indigo-300",
                !weekStart && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-indigo-500 dark:text-indigo-400" />
              <span>{weekRangeText}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={weekStart}
              onSelect={handleDateSelect}
              initialFocus
              className="rounded-md border border-indigo-200 dark:border-indigo-800"
            />
          </PopoverContent>
        </Popover>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onNextWeek}
          disabled={isCurrentWeek}
          aria-label="次の週"
          className="hover:bg-indigo-100 dark:hover:bg-indigo-800 hover:text-indigo-700 dark:hover:text-indigo-300 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Button
        variant="ghost"
        onClick={() => onSelectWeek(new Date())}
        className="text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800 hover:text-indigo-700 dark:hover:text-indigo-300"
        disabled={isCurrentWeek}
      >
        今週
      </Button>
    </div>
  )
} 