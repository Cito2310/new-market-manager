import { useState } from "react";
import axios from "axios";
import type { Product } from "../../../../../shared/types";
import { useAppDispatch } from "../../../app/store/hooks";
import { deleteProduct } from "../productApi";
import { removeProductById } from "../productSlice";

// Handles the delete request for a single product: drops it from the store on
// success and surfaces any failure. `onClose` runs after a successful delete.
export const useDeleteProduct = (product: Product, onClose: () => void) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const remove = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await deleteProduct(product._id);
            dispatch(removeProductById(product._id));
            onClose();
        } catch (err) {
            const message = axios.isAxiosError(err)
                ? (err.response?.data?.msg ?? err.message)
                : "No se pudo eliminar el producto";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return { remove, isLoading, error };
};
