"use client"

import { useEffect, useState } from "react"
import { DollarSign, CreditCard, PieChart, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchData } from "@/lib/api"
import { toast } from "sonner"

interface DashboardData {
  totalIncome: number
  totalExpenses: number
  balance: number
  budgetUtilization: number
}

export function DashboardCards() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData<DashboardData>(
      "/dashboard",
      (response) => {
        setData(response)
        setLoading(false)
      },
      (err) => {
        toast.error("Failed to load dashboard data")
        setLoading(false)
      }
    )
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (!data) {
    return <p>Error loading dashboard data.</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${data.totalIncome.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${data.totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">-4.5% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${data.balance.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">+12.3% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.budgetUtilization}%</div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${data.budgetUtilization}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
