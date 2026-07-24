import type { Auditable } from "./Auditable";

// TERTIARY OBJECT
export interface Promotion {
    minQuantity: number;
    pricePerUnit: number;
}

export const SIZE_UNITS = ["unit", "kg", "g", "l", "ml", "m", "oz"] as const;

export type SizeUnit = (typeof SIZE_UNITS)[number];

export interface Batch {
    _id: string;
    quantity: number;
    expirationDate: Date;
    receivedAt: Date;
}


// SECONDARY OBJECT
export interface Details {
    name: string;
    brand: string;
    category: string;
    subcategory: string;
    barcodes: string[];
    size: number;
    sizeUnit: SizeUnit;
    tags: string[];
}

export interface Sell {
    cost: number;
    salePrice: number;
    promotions: Promotion[];
    weighable: boolean;
}

export interface Stock {
    quantity: number;
    alerts: {
        enabled: boolean;
        warning: number;
        low: number;
        critical: number;
    };
}

export interface Expiry {
    batches: Batch[];
}


// PRIMARY OBJECT
export interface Product extends Auditable {
    _id: string;
    details: Details;
    sell: Sell;
    stock?: Stock;
    expiry?: Expiry;
    active: boolean;
}


// --- Persistence & request body types (DTOs) ---

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

// PATCH /:id — every top-level block optional; the provided ones replace their
// sub-object. `stock`/`expiry` also accept `null` to clear (remove) the block.
export type UpdateProductBody = Partial<Pick<CreateProductBody, "details" | "sell">> & {
    stock?: Product["stock"] | null;
    expiry?: ExpiryInput | null;
};