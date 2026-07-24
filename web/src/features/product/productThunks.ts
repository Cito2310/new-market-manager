import axios from "axios";
import type { AppDispatch } from "../../app/store";
import { getProducts } from "./productApi";
import { fetchStart, fetchSuccess, fetchFailure } from "./productSlice";

// Extracts a human-readable message from an axios error.
const toMessage = (err: unknown, fallback: string) =>
    axios.isAxiosError(err)
        ? (err.response?.data?.msg ?? err.message)
        : fallback;

// Loads every active product into the store.
export const fetchProducts = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchStart());
        try {
            const data = await getProducts();
            dispatch(fetchSuccess(data));
        } catch (err) {
            dispatch(fetchFailure(toMessage(err, "failed to load products")));
        }
    };
};
