import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Budget } from "@/lib/models/budget";
import { Transaction } from "@/lib/models/transaction";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (!month || !year) {
      return NextResponse.json({ error: "Month and year are required" }, { status: 400 });
    }

    const numericMonth = Number.parseInt(month);
    const numericYear = Number.parseInt(year);

    const budgets = await Budget.find({ month: numericMonth, year: numericYear });

    const transactions = await Transaction.find({
      date: {
        $gte: new Date(numericYear, numericMonth - 1, 1), // First day of the month
        $lt: new Date(numericYear, numericMonth, 1), // First day of the next month
      },
      type: "expense",
    });

    const spentByCategory: Record<string, number> = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    const responseData = budgets.map((budget) => {
      const spent = spentByCategory[budget.category] || 0;
      return {
        ...budget.toObject(),
        spent,
        left: Math.max(budget.amount - spent, 0), 
      };
    });

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const existingBudget = await Budget.findOne({
      category: body.category,
      month: body.month,
      year: body.year,
    });

    if (existingBudget) {
      existingBudget.amount = body.amount;
      await existingBudget.save();
      return NextResponse.json(existingBudget);
    } else {
      // Create new budget
      const budget = new Budget({ ...body, spent: 0 });
      await budget.save();
      return NextResponse.json(budget, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating/updating budget:", error);
    return NextResponse.json({ error: "Failed to create/update budget" }, { status: 500 });
  }
}
