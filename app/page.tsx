import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { MonthlyExpensesChart } from "@/components/dashboard/monthly-expenses-chart"
import { CategoryPieChart } from "@/components/dashboard/category-pie-chart"
import { BudgetComparisonChart } from "@/components/dashboard/budget-comparison-chart"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <DashboardHeader />

      <Suspense fallback={<Skeleton className="h-[120px] w-full" />}>
        <DashboardCards />
      </Suspense>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <MonthlyExpensesChart />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <CategoryPieChart />
        </Suspense>
      </div>

      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <BudgetComparisonChart />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <RecentTransactions />
      </Suspense>
    </div>
  )
}

