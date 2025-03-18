import connectDB from "@/lib/db";
import { Budget } from "@/lib/models/budget";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(req:NextRequest,{params}:{params:{id:string}}) {
    try {
      await connectDB()
    //   const categories = await Category.find().sort({ name: 1 })
        const deletedBudget=await Budget.findByIdAndDelete(params.id)
      return NextResponse.json(deletedBudget)
    } catch (error) {
      console.error("Error deleting budget:", error)
      return NextResponse.json({ error: "Failed to delete budget" }, { status: 500 })
    }
  }