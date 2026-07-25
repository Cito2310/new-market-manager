import { SearchIcon } from "../../../shared/components/icons/SearchIcon"

type ProductToolbarProps = {
    search: string;
    onSearchChange: (value: string) => void;
    section: string;
    onSectionChange: (value: string) => void;
    category: string;
    onCategoryChange: (value: string) => void;
    sections: readonly string[];
    categoryOptions: string[];
}

const selectClass =
    "cursor-pointer rounded-lg border border-slate-300 px-3 py-2 capitalize text-slate-700 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-400/20"

// Search input and filters (section + category) above the products table.
export const ProductToolbar = ({
    search,
    onSearchChange,
    section,
    onSectionChange,
    category,
    onCategoryChange,
    sections,
    categoryOptions,
}: ProductToolbarProps) => {
    return <section className="flex flex-wrap items-center gap-3">
        <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <SearchIcon />
            </span>
            <input
                placeholder="Buscar"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                className="rounded-lg border border-slate-300 py-2 pl-10 pr-3 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-400/20"
            ></input>
        </div>

        <select
            value={section}
            onChange={(event) => onSectionChange(event.target.value)}
            className={selectClass}
        >
            <option value="">Secciones</option>
            {sections.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>

        <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className={selectClass}
        >
            <option value="">Todas las Categorías</option>
            {categoryOptions.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </section>
}
