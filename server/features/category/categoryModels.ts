import { HydratedDocument, model, Schema } from "mongoose";

import { CategoryMongo, SECTIONS } from "../../../shared/types";

// Hydrated Mongoose document for a category
export type CategoryDocument = HydratedDocument<CategoryMongo>;

// A subcategory groups its own list of brands under the parent category
const subcategorySchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        brands: { type: [String], default: [] },
    },
    { _id: false }
);

const categorySchema = new Schema<CategoryMongo>(
    {
        section: { type: String, enum: [...SECTIONS], required: true },
        name: { type: String, required: true, trim: true },
        subcategories: { type: [subcategorySchema], default: [] },
        createdBy: { type: String, required: true },
        updatedBy: { type: String, required: true },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// a category name is unique within its section
categorySchema.index({ section: 1, name: 1 }, { unique: true });

export const CategoryModel = model("Category", categorySchema);
