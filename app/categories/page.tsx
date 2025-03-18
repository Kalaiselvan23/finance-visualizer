import { Suspense } from "react"
import { CategoriesHeader } from "@/components/categories/categories-header"
import { CategoriesList } from "@/components/categories/categories-list"
import { Skeleton } from "@/components/ui/skeleton"

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <CategoriesHeader />

      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <CategoriesList />
      </Suspense>
    </div>
  )
}

