import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../../../../shared/types";

type CategoryStatus = "idle" | "loading" | "ready" | "error";

interface CategoryState {
    items: Category[];
    status: CategoryStatus;
    error: string | null;
}

const initialState: CategoryState = {
    items: [],
    status: "idle",
    error: null,
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.status = "loading";
            state.error = null;
        },
        fetchSuccess: (state, action: PayloadAction<Category[]>) => {
            state.items = action.payload;
            state.status = "ready";
            state.error = null;
        },
        fetchFailure: (state, action: PayloadAction<string>) => {
            state.status = "error";
            state.error = action.payload;
        },
        // Inserts a new category or replaces the existing one with the same _id.
        upsertCategory: (state, action: PayloadAction<Category>) => {
            const index = state.items.findIndex((c) => c._id === action.payload._id);
            if (index === -1) state.items.push(action.payload);
            else state.items[index] = action.payload;
        },
        removeCategoryById: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((c) => c._id !== action.payload);
        },
    },
});

export const {
    fetchStart,
    fetchSuccess,
    fetchFailure,
    upsertCategory,
    removeCategoryById,
} = categorySlice.actions;

export default categorySlice.reducer;
