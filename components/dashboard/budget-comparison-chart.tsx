"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { fetchData } from "@/lib/api"
import { Budget } from "@/lib/types"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { toast } from "sonner"
import { useDate } from "@/contexts/DateContexts"  
export function BudgetComparisonChart() {
  const { date } = useDate()  
  const [data, setData] = useState<Budget[]>([])

  useEffect(() => {
    if (!date?.from) return  
    const month = date.from.getMonth() + 1
    const year = date.from.getFullYear()

    fetchData<Budget[]>(
      `budgets?month=${month}&year=${year}`,
      (data) => setData(data),
      () => toast.error("Failed to load budget data")
    )
  }, [date]) 

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs. Actual</CardTitle>
        <CardDescription>Compare your budgeted amounts with actual spending</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            budget: { label: "Budget", color: "hsl(var(--chart-1))" },
            actual: { label: "Spent", color: "hsl(var(--chart-2))" },
          }}
          className="aspect-[16/9]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }} barGap={8}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis tickFormatter={(value) => `$${value}`} width={60} />
              <Bar dataKey="budget" fill="var(--color-budget)" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="spent" fill="var(--color-actual)" radius={[4, 4, 0, 0]} barSize={20} />
              <Legend />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
