"use client"

import { DatePicker } from "@/components/ui/date-picker"
import { useDate } from "@/contexts/DateContexts"

export function DashboardHeader() {
  const { date, setDate } = useDate()

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="flex items-center gap-2">
        <DatePicker date={date} setDate={setDate} />
      </div>
    </div>
  )
}
