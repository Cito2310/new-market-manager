import type { SalesByMethod } from "./Sales";
import type { Withdrawal } from "./Withdrawal";


export interface ShiftClose {
    _id: string;
    openedAt: Date;
    openedBy: string;
    closedAt: Date;
    closedBy: string;

    cash: {
        opening: number;
        expected: number;
        counted: number;
        difference: number;
        withdrawals: Withdrawal[];
    };

    sales: SalesByMethod[];
}