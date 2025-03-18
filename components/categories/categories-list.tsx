"use client"

import { useEffect, useState } from "react"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CategoryDialog } from "@/components/categories/category-dialog"
import { fetchData, deleteData } from "@/lib/api"
import { Category } from "@/lib/types"
import { toast } from "sonner"

export function CategoriesList() {
  const [editCategory, setEditCategory] = useState<Category | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async () => {
    await fetchData<Category[]>(
      "categories",
      (data:Category[]) => {
        setCategories(data)
      },
      (error) => {
        toast(error)
      }
    )
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDeleteFn = async (id: string) => {
    console.log(`Deleting category: ${id}`)

    await deleteData(
      `categories/${id}`,
      () => {
        setCategories((prev) => prev.filter((category) => category.id !== id))
      },
      (error) =>{
        toast(error)
      }
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.length > 0 ? (
        categories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{category.name}</CardTitle>
              <div className="h-6 w-6 rounded-full" style={{ backgroundColor: category.color }} />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-end">
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
                        setEditCategory(category)
                        setDialogOpen(true)
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteFn(category.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center col-span-full">No categories found.</p>
      )}

      {dialogOpen && <CategoryDialog open={dialogOpen} onOpenChange={setDialogOpen} category={editCategory} />}
    </div>
  )
}
