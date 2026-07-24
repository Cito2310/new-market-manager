import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../../../shared/types";

type ProductStatus = "idle" | "loading" | "ready" | "error";

interface ProductState {
    items: Product[];
    status: ProductStatus;
    error: string | null;
}

const initialState: ProductState = {
    items: [],
    status: "idle",
    error: null,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.status = "loading";
            state.error = null;
        },
        fetchSuccess: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
            state.status = "ready";
            state.error = null;
        },
        fetchFailure: (state, action: PayloadAction<string>) => {
            state.status = "error";
            state.error = action.payload;
        },
        // Inserts a new product or replaces the existing one with the same _id.
        upsertProduct: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex((p) => p._id === action.payload._id);
            if (index === -1) state.items.push(action.payload);
            else state.items[index] = action.payload;
        },
        removeProductById: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((p) => p._id !== action.payload);
        },
    },
});

export const {
    fetchStart,
    fetchSuccess,
    fetchFailure,
    upsertProduct,
    removeProductById,
} = productSlice.actions;

export default productSlice.reducer;
