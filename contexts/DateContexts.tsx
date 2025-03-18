"use client"

import { createContext, useContext, useState } from "react"
import type { DateRange } from "react-day-picker"

type DateContextType = {
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
}

const DateContext = createContext<DateContextType | undefined>(undefined)

export function DateProvider({ children }: { children: React.ReactNode }) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  })

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  )
}

export function useDate() {
  const context = useContext(DateContext)
  if (!context) {
    throw new Error("useDate must be used within a DateProvider")
  }
  return context
}
