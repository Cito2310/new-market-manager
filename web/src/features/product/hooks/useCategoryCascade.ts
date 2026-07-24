import { useState } from "react";
import type { Section } from "../../../../../shared/types";
import { useCategories } from "../../category/hooks/useCategories";

// A creatable combo level ready to spread onto <ComboBoxForm />.
type CascadeCombo = {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    onCreate: (value: string) => void;
    onDelete: (value: string) => void;
    placeholder: string;
    disabled: boolean;
};

// Drives the Section -> Category -> Subcategory -> Brand cascade for the product
// form: it owns the selection state and derives each level's options from the
// category catalog, delegating every create/delete to the category feature.
export const useCategoryCascade = () => {
    const {
        categories,
        addCategory,
        removeCategoryById,
        addSubcategory,
        removeSubcategory,
        addBrand,
        removeBrand,
    } = useCategories();

    const [section, setSection] = useState<Section | "">("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [brand, setBrand] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Runs a mutation, surfacing any failure as `error` and letting the caller
    // roll back its optimistic selection through `onError`.
    const run = async (op: () => Promise<unknown>, onError?: () => void) => {
        setError(null);
        try {
            await op();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ocurrió un error inesperado");
            onError?.();
        }
    };

    const sectionCategories = categories.filter((c) => c.section === section);
    const currentCategory = sectionCategories.find((c) => c.name === category);
    const currentSubcategory = currentCategory?.subcategories.find(
        (s) => s.name === subcategory,
    );

    const categoryOptions = sectionCategories.map((c) => c.name);
    const subcategoryOptions =
        currentCategory?.subcategories.map((s) => s.name) ?? [];
    const brandOptions = currentSubcategory?.brands ?? [];

    const selectSection = (value: string) => {
        setSection(value as Section);
        setCategory("");
        setSubcategory("");
        setBrand("");
    };

    const selectCategory = (name: string) => {
        setCategory(name);
        setSubcategory("");
        setBrand("");
    };

    const selectSubcategory = (name: string) => {
        setSubcategory(name);
        setBrand("");
    };

    const createCategory = (name: string) => {
        if (!section) return;
        return run(
            async () => {
                await addCategory(section, name);
                selectCategory(name);
            },
            () => selectCategory(""), // roll back the optimistic selection
        );
    };

    const deleteCategory = (name: string) => {
        const target = sectionCategories.find((c) => c.name === name);
        if (!target) return;
        return run(async () => {
            await removeCategoryById(target._id);
            if (category === name) selectCategory("");
        });
    };

    const createSubcategory = (name: string) => {
        if (!currentCategory) return;
        return run(
            async () => {
                await addSubcategory(currentCategory, name);
                selectSubcategory(name);
            },
            () => selectSubcategory(""), // roll back the optimistic selection
        );
    };

    const deleteSubcategory = (name: string) => {
        if (!currentCategory) return;
        return run(async () => {
            await removeSubcategory(currentCategory, name);
            if (subcategory === name) selectSubcategory("");
        });
    };

    const createBrand = (name: string) => {
        if (!currentCategory || !subcategory) return;
        return run(
            async () => {
                await addBrand(currentCategory, subcategory, name);
                setBrand(name);
            },
            () => setBrand(""), // roll back the optimistic selection
        );
    };

    const deleteBrand = (name: string) => {
        if (!currentCategory || !subcategory) return;
        return run(async () => {
            await removeBrand(currentCategory, subcategory, name);
            if (brand === name) setBrand("");
        });
    };

    // The three creatable levels, shaped as <ComboBoxForm /> props so the form
    // can render them by mapping instead of repeating each block.
    const levels: CascadeCombo[] = [
        {
            label: "Categoría",
            value: category,
            options: categoryOptions,
            onChange: selectCategory,
            onCreate: createCategory,
            onDelete: deleteCategory,
            placeholder: section ? "Elegí o creá" : "Elegí una sección",
            disabled: !section,
        },
        {
            label: "Subcategoría",
            value: subcategory,
            options: subcategoryOptions,
            onChange: selectSubcategory,
            onCreate: createSubcategory,
            onDelete: deleteSubcategory,
            placeholder: category ? "Elegí o creá" : "Elegí una categoría",
            disabled: !category,
        },
        {
            label: "Marca",
            value: brand,
            options: brandOptions,
            onChange: setBrand,
            onCreate: createBrand,
            onDelete: deleteBrand,
            placeholder: subcategory ? "Elegí o creá" : "Elegí una subcategoría",
            disabled: !subcategory,
        },
    ];

    return { section, category, subcategory, brand, selectSection, error, levels };
};
