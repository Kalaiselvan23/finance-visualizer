import connectDB from "@/lib/db";
import { Category } from "@/lib/models/category";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!params?.id) {
      return NextResponse.json(
        { message: "Category ID is required" },
        { status: 400 }
      );
    }
    const deletedCategory = await Category.findByIdAndDelete(params.id);
    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.error("Error deleting categories:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
