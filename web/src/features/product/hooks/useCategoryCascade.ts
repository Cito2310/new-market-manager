import { useState, useEffect } from "react";
import type { Section } from "../../../../../shared/types";
import { useCategories } from "../../category/hooks/useCategories";

// Values to preselect the cascade with (e.g. when editing an existing product).
// The section is derived from the catalog, since a product only stores names.
type CascadeInitial = {
    category?: string;
    subcategory?: string;
    brand?: string;
};

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
export const useCategoryCascade = (initial?: CascadeInitial) => {
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

    // Preselect from `initial` once the catalog is available: the section is
    // looked up from the product's category. Runs a single time.
    const [prefilled, setPrefilled] = useState(!initial);
    useEffect(() => {
        if (prefilled || !initial || categories.length === 0) return;

        const owner = categories.find((c) => c.name === initial.category);
        if (owner) setSection(owner.section);
        if (initial.category) setCategory(initial.category);
        if (initial.subcategory) setSubcategory(initial.subcategory);
        if (initial.brand) setBrand(initial.brand);
        setPrefilled(true);
    }, [categories, initial, prefilled]);

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
