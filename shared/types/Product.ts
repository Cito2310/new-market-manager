import { Auditable } from "./Auditable";

// TERTIARY OBJECT
export interface Promotion {
    minQuantity: number;
    pricePerUnit: number;
}

export type SizeUnit = "unit" | "kg" | "g" | "l" | "ml" | "m" | "oz";

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