import { Suspense } from "react"
import { BudgetsHeader } from "@/components/budgets/budgets-header"
import {BudgetsList}  from "@/components/budgets/budgets-list"
import { Skeleton } from "@/components/ui/skeleton"

export default function BudgetsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <BudgetsHeader />

      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <BudgetsList />
      </Suspense>
    </div>
  )
}

