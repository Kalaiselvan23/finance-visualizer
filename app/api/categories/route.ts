import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { Category } from "@/lib/models/category"

export async function GET() {
  try {
    await connectDB()

    const categories = await Category.find().sort({ name: 1 })
    console.log(categories);
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}


export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()
    const category = new Category(body)
    await category.save()
    console.log(category)

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}

