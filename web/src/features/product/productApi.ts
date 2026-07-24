import type {
    CreateProductBody,
    UpdateProductBody,
    Product,
} from "../../../../shared/types";
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

// Updates a product (block replace) and returns the persisted document.
export const updateProduct = async (
    id: string,
    body: UpdateProductBody,
): Promise<Product> => {
    const { data } = await api.patch<Product>(`/product/${id}`, body);
    return data;
};

// Soft-deletes a product.
export const deleteProduct = async (id: string): Promise<void> => {
    await api.delete(`/product/${id}`);
};
