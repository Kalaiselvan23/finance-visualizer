"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { BudgetDialog } from "@/components/budgets/budget-dialog"
import Api from "@/lib/api"
import { Budget } from "@/lib/types"

export function BudgetsList() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [editBudget, setEditBudget] = useState<Budget | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await Api.get("budgets?month=3&year=2025")
        setBudgets(response.data)
      } catch (err) {
        setError("Failed to load budgets")
      } finally {
        setLoading(false)
      }
    }
    fetchBudgets()
  }, [])

  if (loading) return <p>Loading budgets...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {budgets.map((budget) => {
        const percentage = Math.round((budget.spent / budget.amount) * 100)
        const isOverBudget = budget.spent > budget.amount

        return (
          <Card key={budget.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{budget.category}</CardTitle>
              <div className="h-6 w-6 rounded-full" style={{ backgroundColor: budget.color }} />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-2xl font-bold">${budget.amount.toFixed(2)}</div>
              </div>
              <Progress
                value={percentage > 100 ? 100 : percentage}
                className={isOverBudget ? "bg-red-200" : ""}
                indicatorClassName={isOverBudget ? "bg-red-600" : ""}
              />
              <div className="mt-2 flex items-center justify-between text-sm">
                <div className={isOverBudget ? "text-red-600 font-medium" : "text-muted-foreground"}>
                  {isOverBudget ? "Over budget" : `${percentage}% used`}
                </div>
                <div className="text-muted-foreground">${(budget.amount - budget.spent).toFixed(2)} left</div>
              </div>
              <div className="mt-4 flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditBudget(budget)
                        setDialogOpen(true)
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={async () => {
                        try {
                          await Api.delete(`/api/budgets/${budget.id}`)
                          setBudgets((prev) => prev.filter((b) => b.id !== budget.id))
                        } catch (error) {
                          console.error("Error deleting budget", error)
                        }
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {dialogOpen && (
        <BudgetDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          budget={editBudget}
          month={editBudget?.month || 0}
          year={editBudget?.year || 0}
        />
      )}
    </div>
  )
}
