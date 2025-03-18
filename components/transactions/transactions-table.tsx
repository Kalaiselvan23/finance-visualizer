"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TransactionDialog } from "@/components/transactions/transaction-dialog"

// In a real app, you would fetch this data from your API
const transactions = [
  {
    id: "1",
    description: "Grocery Shopping",
    amount: 85.75,
    date: new Date("2023-03-15"),
    category: "Food",
    type: "expense",
  },
  {
    id: "2",
    description: "Salary",
    amount: 3500.0,
    date: new Date("2023-03-01"),
    category: "Income",
    type: "income",
  },
  {
    id: "3",
    description: "Netflix Subscription",
    amount: 15.99,
    date: new Date("2023-03-10"),
    category: "Entertainment",
    type: "expense",
  },
  {
    id: "4",
    description: "Electricity Bill",
    amount: 75.5,
    date: new Date("2023-03-05"),
    category: "Utilities",
    type: "expense",
  },
  {
    id: "5",
    description: "Freelance Work",
    amount: 750.0,
    date: new Date("2023-03-12"),
    category: "Income",
    type: "income",
  },
  {
    id: "6",
    description: "Restaurant Dinner",
    amount: 65.3,
    date: new Date("2023-03-18"),
    category: "Food",
    type: "expense",
  },
  {
    id: "7",
    description: "Gas",
    amount: 45.0,
    date: new Date("2023-03-20"),
    category: "Transportation",
    type: "expense",
  },
  {
    id: "8",
    description: "Mobile Phone Bill",
    amount: 55.0,
    date: new Date("2023-03-08"),
    category: "Utilities",
    type: "expense",
  },
  {
    id: "9",
    description: "Gym Membership",
    amount: 30.0,
    date: new Date("2023-03-02"),
    category: "Health",
    type: "expense",
  },
  {
    id: "10",
    description: "Online Course",
    amount: 199.99,
    date: new Date("2023-03-25"),
    category: "Education",
    type: "expense",
  },
]

type Transaction = (typeof transactions)[0]

export function TransactionsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div className="font-medium">{row.getValue("description")}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant={row.original.type === "income" ? "outline" : "secondary"}>{row.getValue("category")}</Badge>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => format(row.original.date, "MMM dd, yyyy"),
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("amount"))
        const type = row.original.type

        return (
          <div className={`text-right ${type === "income" ? "text-green-600" : "text-red-600"}`}>
            {type === "income" ? "+" : "-"}${amount.toFixed(2)}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const transaction = row.original

        return (
          <div className="text-right">
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
                    setEditTransaction(transaction)
                    setDialogOpen(true)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => {
                    // In a real app, you would call your API to delete the transaction
                    console.log("Delete transaction", transaction.id)
                  }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: transactions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter transactions..."
          value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("description")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>

      {dialogOpen && <TransactionDialog open={dialogOpen} onOpenChange={setDialogOpen} transaction={editTransaction} />}
    </div>
  )
}

