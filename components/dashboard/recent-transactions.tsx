import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// In a real app, you would fetch this data from your API
const recentTransactions = [
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
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your most recent financial activities</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>
                  <Badge variant={transaction.type === "income" ? "outline" : "secondary"}>
                    {transaction.category}
                  </Badge>
                </TableCell>
                <TableCell>{format(transaction.date, "MMM dd, yyyy")}</TableCell>
                <TableCell
                  className={`text-right ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                >
                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

