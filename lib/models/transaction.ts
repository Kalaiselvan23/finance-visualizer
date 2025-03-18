import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface ITransaction extends Document {
  amount: number
  date: Date
  description: string
  category: string
  type: "income" | "expense"
  createdAt: Date
  updatedAt: Date
}

const TransactionSchema = new Schema<ITransaction>(
  {
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    description: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
  },
  { timestamps: true },
)

export const Transaction =(mongoose.models.Transaction as Model<ITransaction>) || mongoose.model<ITransaction>("Transaction", TransactionSchema)

