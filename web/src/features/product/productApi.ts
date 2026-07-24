import type { CreateProductBody, Product } from "../../../../shared/types";
import { api } from "../../app/api";

// Creates a product and returns the persisted document.
export const createProduct = async (body: CreateProductBody): Promise<Product> => {
    const { data } = await api.post<Product>("/product", body);
    return data;
};

// Lists all active products.
export const getProducts = async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>("/product");
    return data;
};
