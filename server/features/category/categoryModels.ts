import { HydratedDocument, model, Schema } from "mongoose";

import { CategoryMongo } from "./categoryTypes";
import { SECTIONS } from "../../../shared/types";

// Hydrated Mongoose document for a category
export type CategoryDocument = HydratedDocument<CategoryMongo>;

const categorySchema = new Schema<CategoryMongo>(
    {
        section: { type: String, enum: [...SECTIONS], required: true },
        name: { type: String, required: true, trim: true },
        subcategories: { type: [String], default: [] },
        brands: { type: [String], default: [] },
        createdBy: { type: String, required: true },
        updatedBy: { type: String, required: true },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// a category name is unique within its section
categorySchema.index({ section: 1, name: 1 }, { unique: true });

export const CategoryModel = model("Category", categorySchema);
