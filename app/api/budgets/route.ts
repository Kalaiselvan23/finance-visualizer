import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { Budget } from "@/lib/models/budget"

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const month = searchParams.get("month")
    const year = searchParams.get("year")

    const query: any = {}

    if (month && year) {
      query.month = Number.parseInt(month)
      query.year = Number.parseInt(year)
    }

    const budgets = await Budget.find(query)

    return NextResponse.json(budgets)
  } catch (error) {
    console.error("Error fetching budgets:", error)
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()

    // Check if budget already exists for this category, month, and year
    const existingBudget = await Budget.findOne({
      category: body.category,
      month: body.month,
      year: body.year,
    })

    if (existingBudget) {
      // Update existing budget
      existingBudget.amount = body.amount
      await existingBudget.save()
      return NextResponse.json(existingBudget)
    } else {
      // Create new budget
      const budget = new Budget(body)
      await budget.save()
      return NextResponse.json(budget, { status: 201 })
    }
  } catch (error) {
    console.error("Error creating/updating budget:", error)
    return NextResponse.json({ error: "Failed to create/update budget" }, { status: 500 })
  }
}

