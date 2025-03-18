import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface ICategory extends Document {
  name: string
  color: string
  icon?: string
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    icon: { type: String },
  },
  { timestamps: true },
)

export const Category =
  (mongoose.models.Category as Model<ICategory>) || mongoose.model<ICategory>("Category", CategorySchema)

