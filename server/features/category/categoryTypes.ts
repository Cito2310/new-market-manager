import { Category } from "../../../shared/types";

// Persisted category shape. Mongoose owns `_id`, so it is dropped from the domain type.
export type CategoryMongo = Omit<Category, "_id">;

// POST / — audit fields (createdBy/updatedBy/timestamps) and active are set by the server.
export type CreateCategoryBody = Pick<Category, "section" | "name"> & {
    subcategories?: string[];
    brands?: string[];
};

// PATCH /:id — every field optional; only the provided ones are updated.
export type UpdateCategoryBody = Partial<CreateCategoryBody>;
