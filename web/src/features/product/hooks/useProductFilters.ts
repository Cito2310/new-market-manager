import { useState, useMemo } from "react";
import type { Product, Section } from "../../../../../shared/types";
import { SECTIONS } from "../../../../../shared/types";
import { useCategories } from "../../category/hooks/useCategories";
import { getProductName } from "../helpers/productName";

// Owns the products toolbar filters (text search + section + category) and
// derives the filtered list. Category options depend on the chosen section,
// which is resolved through the category catalog (a product only stores names).
export const useProductFilters = (products: Product[]) => {
    const { categories } = useCategories();

    const [search, setSearch] = useState("");
    const [section, setSection] = useState<Section | "">("");
    const [category, setCategory] = useState("");

    // Selecting a section narrows the category options and clears the category.
    const changeSection = (value: string) => {
        setSection(value as Section | "");
        setCategory("");
    };

    const sectionCategories = useMemo(
        () => (section ? categories.filter((c) => c.section === section) : categories),
        [categories, section],
    );

    const categoryOptions = useMemo(
        () => [...new Set(sectionCategories.map((c) => c.name))],
        [sectionCategories],
    );

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        const sectionNames = new Set(sectionCategories.map((c) => c.name));

        return products.filter((product) => {
            if (query) {
                const matches =
                    getProductName(product).toLowerCase().includes(query) ||
                    product.details.barcodes.some((b) => b.toLowerCase().includes(query));
                if (!matches) return false;
            }

            if (category) return product.details.category === category;
            if (section) return sectionNames.has(product.details.category);
            return true;
        });
    }, [products, search, section, category, sectionCategories]);

    return {
        filtered,
        search,
        setSearch,
        section,
        changeSection,
        category,
        setCategory,
        sections: SECTIONS,
        categoryOptions,
    };
};
