import type { Auditable } from "./Auditable";

export const SECTIONS = [
    "almacén",
    "limpieza",
    "perfumería",
    "lácteos",
    "bebidas",
    "congelados",
    "bazar",
    "pollería",
    "fiambrería",
] as const;

export type Section = (typeof SECTIONS)[number];


export interface Subcategory {
    name: string;
    brands: string[];
}


export interface Category extends Auditable {
    _id: string;
    section: Section;
    name: string;
    subcategories: Subcategory[];
    active: boolean;
}


// --- Persistence & request body types (DTOs) ---

// Persisted category shape. Mongoose owns `_id`, so it is dropped from the domain type.
export type CategoryMongo = Omit<Category, "_id">;

// POST / — audit fields (createdBy/updatedBy/timestamps) and active are set by the server.
export type CreateCategoryBody = Pick<Category, "section" | "name"> & {
    subcategories?: Subcategory[];
};

// PATCH /:id — every field optional; only the provided ones are updated.
export type UpdateCategoryBody = Partial<CreateCategoryBody>;
