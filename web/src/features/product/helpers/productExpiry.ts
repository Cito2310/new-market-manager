import type { Product } from "../../../../../shared/types";

// The soonest expiration date across a product's batches, or null when it has none.
export const getEarliestExpiry = (product: Product): Date | null => {
    const times = (product.expiry?.batches ?? [])
        .map((batch) => new Date(batch.expirationDate).getTime())
        .filter((time) => !isNaN(time));

    if (times.length === 0) return null;

    return new Date(Math.min(...times));
};

const DAY_MS = 1000 * 60 * 60 * 24;
const startOfDay = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

export type ExpiryInfo = { label: string; className: string };

// A human label + color for how close an expiration date is:
// red when expired or under 10 days, amber under 30, green otherwise.
export const describeExpiry = (date: Date): ExpiryInfo => {
    const days = Math.round((startOfDay(date) - startOfDay(new Date())) / DAY_MS);

    const label =
        days < 0 ? "Vencido"
            : days === 0 ? "Vence hoy"
                : days === 1 ? "Falta 1 día"
                    : `Faltan ${days} días`;

    const className =
        days < 10 ? "text-red-600 font-medium"
            : days < 30 ? "text-amber-600"
                : "text-emerald-600";

    return { label, className };
};
