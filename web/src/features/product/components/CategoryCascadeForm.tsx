import { useState } from "react";
import { ComboBoxForm } from "../../../shared/components/ComboBoxForm";

type Subcategory = { name: string; brands: string[] };
type CategoryNode = { name: string; subcategories: Subcategory[] };

// Mock catalog for the UI-only phase. Replace with API data when wiring the
// backend (the persisted Category type must nest `brands` under each subcategory).
const INITIAL_CATEGORIES: CategoryNode[] = [
    {
        name: "bebidas",
        subcategories: [
            { name: "gaseosas", brands: ["coca-cola", "pepsi", "manaos"] },
            { name: "aguas", brands: ["villavicencio", "eco de los andes"] },
        ],
    },
    {
        name: "lácteos",
        subcategories: [
            { name: "leches", brands: ["la serenísima", "sancor"] },
            { name: "quesos", brands: ["la paulina", "milkaut"] },
        ],
    },
];

// Dependent category -> subcategory -> brand selection with creatable options.
export const CategoryCascadeForm = () => {
    const [categories, setCategories] = useState<CategoryNode[]>(INITIAL_CATEGORIES);
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [brand, setBrand] = useState("");

    const currentCategory = categories.find((c) => c.name === category);
    const currentSubcategory = currentCategory?.subcategories.find(
        (s) => s.name === subcategory,
    );

    const subcategoryOptions =
        currentCategory?.subcategories.map((s) => s.name) ?? [];
    const brandOptions = currentSubcategory?.brands ?? [];

    const selectCategory = (name: string) => {
        setCategory(name);
        setSubcategory("");
        setBrand("");
    };

    const createCategory = (name: string) =>
        setCategories((prev) => [...prev, { name, subcategories: [] }]);

    const deleteCategory = (name: string) => {
        setCategories((prev) => prev.filter((c) => c.name !== name));
        if (category === name) {
            setCategory("");
            setSubcategory("");
            setBrand("");
        }
    };

    const selectSubcategory = (name: string) => {
        setSubcategory(name);
        setBrand("");
    };

    const createSubcategory = (name: string) =>
        setCategories((prev) =>
            prev.map((c) =>
                c.name === category
                    ? {
                          ...c,
                          subcategories: [
                              ...c.subcategories,
                              { name, brands: [] },
                          ],
                      }
                    : c,
            ),
        );

    const deleteSubcategory = (name: string) => {
        setCategories((prev) =>
            prev.map((c) =>
                c.name === category
                    ? {
                          ...c,
                          subcategories: c.subcategories.filter(
                              (s) => s.name !== name,
                          ),
                      }
                    : c,
            ),
        );
        if (subcategory === name) {
            setSubcategory("");
            setBrand("");
        }
    };

    const createBrand = (name: string) =>
        setCategories((prev) =>
            prev.map((c) =>
                c.name === category
                    ? {
                          ...c,
                          subcategories: c.subcategories.map((s) =>
                              s.name === subcategory
                                  ? { ...s, brands: [...s.brands, name] }
                                  : s,
                          ),
                      }
                    : c,
            ),
        );

    const deleteBrand = (name: string) => {
        setCategories((prev) =>
            prev.map((c) =>
                c.name === category
                    ? {
                          ...c,
                          subcategories: c.subcategories.map((s) =>
                              s.name === subcategory
                                  ? {
                                        ...s,
                                        brands: s.brands.filter(
                                            (b) => b !== name,
                                        ),
                                    }
                                  : s,
                          ),
                      }
                    : c,
            ),
        );
        if (brand === name) setBrand("");
    };

    return (
        <div className="flex w-full gap-3">
            <ComboBoxForm
                label="Categoría"
                options={categories.map((c) => c.name)}
                value={category}
                onChange={selectCategory}
                onCreate={createCategory}
                onDelete={deleteCategory}
                placeholder="Elegí o creá"
                className="min-w-0 flex-1 capitalize"
            />

            <ComboBoxForm
                label="Subcategoría"
                options={subcategoryOptions}
                value={subcategory}
                onChange={selectSubcategory}
                onCreate={createSubcategory}
                onDelete={deleteSubcategory}
                placeholder={category ? "Elegí o creá" : "Elegí una categoría"}
                disabled={!category}
                className="min-w-0 flex-1 capitalize"
            />

            <ComboBoxForm
                label="Marca"
                options={brandOptions}
                value={brand}
                onChange={setBrand}
                onCreate={createBrand}
                onDelete={deleteBrand}
                placeholder={subcategory ? "Elegí o creá" : "Elegí una subcategoría"}
                disabled={!subcategory}
                className="min-w-0 flex-1 capitalize"
            />
        </div>
    );
};
