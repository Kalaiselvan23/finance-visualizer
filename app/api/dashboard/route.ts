import { NextResponse } from "next/server"
import { Transaction } from "@/lib/models/transaction"
import dbConnect from "@/lib/db"

export const GET = async () => {
  try {
    await dbConnect()

    // Fetch total income and expenses
    const totalIncome = await Transaction.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ])

    const totalExpenses = await Transaction.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ])

    // Aggregate expenses by category
    const expensesByCategory = await Transaction.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $project: { name: "$_id", value: "$total", _id: 0 } }
    ])

    // Aggregate expenses by month (last 6 months)
    const expensesByMonth = await Transaction.aggregate([
      { $match: { type: "expense" } },
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
      {
        $project: {
          month: {
            $let: {
              vars: {
                months: [
                  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ]
              },
              in: { $arrayElemAt: ["$$months", "$_id.month"] }
            }
          },
          expenses: "$total",
          _id: 0
        }
      },
      { $sort: { month: 1 } }
    ])

    // Fetch 5 most recent transactions
    const recentTransactions = await Transaction.find({})
      .sort({ date: -1 })
      .limit(5)
      .select("description amount date category type") 
    const income = totalIncome[0]?.total || 0
    const expenses = totalExpenses[0]?.total || 0
    const balance = income - expenses

    return NextResponse.json(
      {
        totalIncome: income,
        totalExpenses: expenses,
        balance,
        expensesByCategory,
        expensesByMonth,
        recentTransactions
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
