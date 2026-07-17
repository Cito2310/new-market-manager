import { Batch, Product } from "../../../shared/types";

// Persisted product shape. Mongoose owns `_id`, so it is dropped from the domain type.
export type ProductMongo = Omit<Product, "_id">;

// Batches are created without an _id (Mongoose generates it)
type BatchInput = Omit<Batch, "_id">;
type ExpiryInput = { batches: BatchInput[] };

// POST / — audit fields, active and subdocument ids are set by the server.
export type CreateProductBody = Pick<Product, "details" | "sell"> & {
    stock?: Product["stock"];
    expiry?: ExpiryInput;
};

// PATCH /:id — every top-level block optional; the provided ones replace their sub-object.
export type UpdateProductBody = Partial<CreateProductBody>;
