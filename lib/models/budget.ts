import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IBudget extends Document {
  category: string
  amount: number
  month: number
  year: number
  createdAt: Date
  updatedAt: Date
}

const BudgetSchema = new Schema<IBudget>(
  {
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true },
)

BudgetSchema.index({ category: 1, month: 1, year: 1 }, { unique: true })

export const Budget = (mongoose.models.Budget as Model<IBudget>) || mongoose.model<IBudget>("Budget", BudgetSchema)

