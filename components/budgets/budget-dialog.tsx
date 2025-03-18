"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import Api from "@/lib/api"

const formSchema = z.object({
  category: z.string().min(1, { message: "Please select a category." }),
  amount: z.coerce.number().positive({ message: "Amount must be a positive number." }),
})

type FormValues = z.infer<typeof formSchema>

interface BudgetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaveSuccess:()=>void;
  budget?: {
    id: string
    category: string
    amount: number
    spent: number
    month: number
    year: number
    color: string
  } | null
  month: number
  year: number
}

export function BudgetDialog({ open, onOpenChange, budget, month, year,onSaveSuccess }: BudgetDialogProps) {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Api.get("categories")
        setCategories(response.data)
      } catch (err) {
        setError("Failed to load categories")
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: budget?.category || "",
      amount: budget?.amount || 0,
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      const res = await Api.post("/budgets", { ...values, month, year })
      if (res.status === 201) {
        toast(budget ? "Budget updated" : "Budget created", {
          description: `Successfully ${budget ? "updated" : "created"} budget for "${values.category}"`,
        })
        onSaveSuccess();
      } else {
        toast("Unable to create budget..!!!")
      }
    } catch (err: any) {
      toast(err.message)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{budget ? "Edit" : "Add"} Budget</DialogTitle>
          <DialogDescription>
            {budget ? "Edit the details of your budget." : "Add a new budget to track your spending."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!!budget}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {loading ? (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                      ) : error ? (
                        <SelectItem value="error" disabled>{error}</SelectItem>
                      ) : (
                        categories.map((category) => (
                          <SelectItem key={category._id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{budget ? "Update" : "Add"} Budget</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
