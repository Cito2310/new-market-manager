import type { SaleLine, SaleTab } from "../posSlice";

// Promotions, discount and surcharge are ignored for now: pricing moves to
// selectors in a later step.
export const lineTotal = (line: SaleLine) => line.unitPrice * line.quantity;

export const tabTotal = (tab: SaleTab) =>
    tab.lines.reduce((sum, line) => sum + lineTotal(line), 0);
