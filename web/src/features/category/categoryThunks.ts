import axios from "axios";
import type {
    Category,
    UpdateCategoryBody,
    Section,
} from "../../../../shared/types";
import type { AppDispatch } from "../../app/store";
import { api } from "../../app/api";
import {
    fetchStart,
    fetchSuccess,
    fetchFailure,
    upsertCategory,
    removeCategoryById,
} from "./categorySlice";

// Extracts a human-readable message from an axios error.
const toMessage = (err: unknown, fallback: string) =>
    axios.isAxiosError(err)
        ? (err.response?.data?.msg ?? err.message)
        : fallback;

// Loads every active category into the store.
export const fetchCategories = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchStart());
        try {
            const { data } = await api.get<Category[]>("/category");
            dispatch(fetchSuccess(data));
        } catch (err) {
            dispatch(fetchFailure(toMessage(err, "failed to load categories")));
        }
    };
};

// Creates a category within a section and stores it. Returns the created doc.
// Throws a user-facing message so callers can surface it as feedback.
export const createCategory = (section: Section, name: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await api.post<Category>("/category", { section, name });
            dispatch(upsertCategory(data));
            return data;
        } catch (err) {
            throw new Error(toMessage(err, "No se pudo crear la categoría"));
        }
    };
};

// Patches a category (e.g. its nested subcategories) and stores the result.
export const patchCategory = (id: string, body: UpdateCategoryBody) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await api.patch<Category>(`/category/${id}`, body);
            dispatch(upsertCategory(data));
            return data;
        } catch (err) {
            throw new Error(toMessage(err, "No se pudo actualizar la categoría"));
        }
    };
};

// Soft-deletes a category and drops it from the store.
export const removeCategory = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await api.delete(`/category/${id}`);
            dispatch(removeCategoryById(id));
        } catch (err) {
            throw new Error(toMessage(err, "No se pudo eliminar la categoría"));
        }
    };
};
