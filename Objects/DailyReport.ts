import { SalesByMethod } from "./Sales";
import { Withdrawal } from "./Withdrawal";

export interface DailyReport {
    _id: string;
    businessDay: string;

    shiftIds: string[];

    totalSales: number;
    sales: SalesByMethod[];

    cash: {
        totalDifference: number;
        withdrawals: Withdrawal[];
    }
}