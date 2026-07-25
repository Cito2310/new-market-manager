import { useState, useMemo } from "react";
import type { Product } from "../../../../../shared/types";
import { getProductName } from "../helpers/productName";
import { getEarliestExpiry } from "../helpers/productExpiry";

export type ProductSortKey = "name" | "category" | "salePrice" | "stock" | "expiry";
export type SortDirection = "asc" | "desc";
export type ProductSort = { key: ProductSortKey; direction: SortDirection } | null;

// The value each column sorts by. Products without stock sort as -1; products
// without an expiry date sort last (Infinity) so the soonest ones come first.
const accessors: Record<ProductSortKey, (product: Product) => string | number> = {
    name: (p) => getProductName(p).toLowerCase(),
    category: (p) => p.details.category.toLowerCase(),
    salePrice: (p) => p.sell.salePrice,
    stock: (p) => p.stock?.quantity ?? -1,
    expiry: (p) => getEarliestExpiry(p)?.getTime() ?? Number.POSITIVE_INFINITY,
};

// Owns the products table sort state and derives the sorted list. Clicking the
// same column toggles asc/desc; clicking a new one starts ascending.
export const useProductSort = (products: Product[]) => {
    const [sort, setSort] = useState<ProductSort>(null);

    const toggle = (key: ProductSortKey) =>
        setSort((current) =>
            current && current.key === key
                ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
                : { key, direction: "asc" },
        );

    const sorted = useMemo(() => {
        if (!sort) return products;

        const get = accessors[sort.key];
        const dir = sort.direction === "asc" ? 1 : -1;

        return [...products].sort((a, b) => {
            const av = get(a);
            const bv = get(b);
            const cmp =
                typeof av === "number" && typeof bv === "number"
                    ? av - bv
                    : String(av).localeCompare(String(bv));
            return cmp * dir;
        });
    }, [products, sort]);

    return { sorted, sort, toggle };
};
