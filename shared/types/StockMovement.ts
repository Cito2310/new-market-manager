export type MovementType = 
    | "purchase"
    | "adjustment"
    | "return"
    | "loss";

export interface StockMovement {
    _id: string;
    productId: string;
    type: MovementType;
    quantityChange: number;
    stockAfter: number;
    reason?: string;
    reference?: string;
    occurredAt: Date;
    createdBy: string;
}