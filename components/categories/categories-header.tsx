"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryDialog } from "@/components/categories/category-dialog"

export function CategoriesHeader() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Categories</h1>

      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Category
      </Button>

      <CategoryDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}

