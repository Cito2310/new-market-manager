import type { Product } from "../../../../../shared/types";

// The full display name of a product: "brand name size+unit" (e.g. "CocaCola Coca-Cola 1.5l").
export const getProductName = ({ details }: Product) => {
    const { brand, name, size, sizeUnit } = details;

    return `${brand} ${name} ${size}${sizeUnit}`;
};
