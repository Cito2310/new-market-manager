export type PaymentMethod = "cash" | "transfer" | "debit" | "credit" | "qr";

export interface SalesByMethod {
    method: PaymentMethod;
    detail?: string;
    count: number;
    total: number;
}