import { useEffect } from "react";
import type { Category, Section } from "../../../../../shared/types";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
    fetchCategories,
    createCategory,
    patchCategory,
    removeCategory,
} from "../categoryThunks";

// Owns the category catalog: exposes the cached data and the CRUD operations.
// Subcategory/brand changes are persisted by patching the whole parent category,
// since the backend nests brands under each subcategory of a category document.
export const useCategories = () => {
    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector((state) => state.category);

    // Load the catalog once; the "idle" guard avoids refetching on every mount.
    useEffect(() => {
        if (status === "idle") dispatch(fetchCategories());
    }, [status, dispatch]);

    const addCategory = (section: Section, name: string) =>
        dispatch(createCategory(section, name));

    const removeCategoryById = (id: string) => dispatch(removeCategory(id));

    const addSubcategory = (category: Category, name: string) =>
        dispatch(
            patchCategory(category._id, {
                subcategories: [...category.subcategories, { name, brands: [] }],
            }),
        );

    const removeSubcategory = (category: Category, name: string) =>
        dispatch(
            patchCategory(category._id, {
                subcategories: category.subcategories.filter((s) => s.name !== name),
            }),
        );

    const addBrand = (category: Category, subcategory: string, brand: string) =>
        dispatch(
            patchCategory(category._id, {
                subcategories: category.subcategories.map((s) =>
                    s.name === subcategory
                        ? { ...s, brands: [...s.brands, brand] }
                        : s,
                ),
            }),
        );

    const removeBrand = (category: Category, subcategory: string, brand: string) =>
        dispatch(
            patchCategory(category._id, {
                subcategories: category.subcategories.map((s) =>
                    s.name === subcategory
                        ? { ...s, brands: s.brands.filter((b) => b !== brand) }
                        : s,
                ),
            }),
        );

    return {
        categories: items,
        status,
        error,
        addCategory,
        removeCategoryById,
        addSubcategory,
        removeSubcategory,
        addBrand,
        removeBrand,
    };
};
