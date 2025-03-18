"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

// In a real app, you would fetch this data from your API
const data = [
  {
    category: "Food",
    budget: 500,
    actual: 400,
  },
  {
    category: "Rent",
    budget: 1000,
    actual: 1000,
  },
  {
    category: "Entertainment",
    budget: 200,
    actual: 250,
  },
  {
    category: "Utilities",
    budget: 300,
    actual: 280,
  },
  {
    category: "Transportation",
    budget: 200,
    actual: 180,
  },
]

export function BudgetComparisonChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs. Actual</CardTitle>
        <CardDescription>Compare your budgeted amounts with actual spending</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            budget: {
              label: "Budget",
              color: "hsl(var(--chart-1))",
            },
            actual: {
              label: "Actual",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="aspect-[16/9]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }} barGap={8}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis tickFormatter={(value) => `$${value}`} width={60} />
              <Bar dataKey="budget" fill="var(--color-budget)" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="actual" fill="var(--color-actual)" radius={[4, 4, 0, 0]} barSize={20} />
              <Legend />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

