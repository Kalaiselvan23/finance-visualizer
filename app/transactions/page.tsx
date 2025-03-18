import { Suspense } from "react"
import { TransactionsHeader } from "@/components/transactions/transactions-header"
import { TransactionsTable } from "@/components/transactions/transactions-table"
import { Skeleton } from "@/components/ui/skeleton"
import { DateProvider } from "@/contexts/DateContexts"

export default function TransactionsPage() {
  return (
    <DateProvider>
      <div className="flex flex-col gap-6 p-6">
        <TransactionsHeader />

        <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
          <TransactionsTable />
        </Suspense>
      </div>
    </DateProvider>

  )
}

