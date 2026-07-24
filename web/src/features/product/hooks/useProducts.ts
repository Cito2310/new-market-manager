import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { fetchProducts } from "../productThunks";

// Owns the product catalog: exposes the cached data and triggers its loading.
export const useProducts = () => {
    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector((state) => state.product);

    // Load the catalog once; the "idle" guard avoids refetching on every mount.
    useEffect(() => {
        if (status === "idle") dispatch(fetchProducts());
    }, [status, dispatch]);

    return {
        products: items,
        status,
        error,
    };
};
