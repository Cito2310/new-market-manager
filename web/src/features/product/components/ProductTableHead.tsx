import type { ProductSort, ProductSortKey } from "../hooks/useProductSort"

type ProductTableHeadProps = {
    sort: ProductSort;
    onSort: (key: ProductSortKey) => void;
}

const columns: { key: ProductSortKey; label: string; width: string }[] = [
    { key: "name", label: "Producto", width: "w-[28%]" },
    { key: "category", label: "Categorias", width: "w-[16%]" },
    { key: "salePrice", label: "Precios", width: "w-[12%]" },
    { key: "stock", label: "Stock", width: "w-[16%]" },
    { key: "expiry", label: "Vencimiento", width: "w-[16%]" },
]

// Header row of the products table: every column is a sort button.
export const ProductTableHead = ({ sort, onSort }: ProductTableHeadProps) => {
    // ▲ / ▼ when the column is active; a faint ↕ otherwise.
    const indicator = (key: ProductSortKey) => {
        if ( sort?.key === key ) return <span>{sort.direction === "asc" ? "▲" : "▼"}</span>
    }

    return <thead>
        <tr className="border-b border-slate-200 text-xs font-medium uppercase tracking-wide text-slate-400">
            {columns.map((column) => (
                <td key={column.key} className={`py-2.5 ${column.width} ${column.key === "name" ? "" : "text-center"}`}>
                    <button
                        type="button"
                        onClick={() => onSort(column.key)}
                        className="inline-flex cursor-pointer items-center gap-1 uppercase transition hover:text-slate-600"
                    >
                        {column.label}
                        {indicator(column.key)}
                    </button>
                </td>
            ))}
            {/* APARTADO PARA BOTONES */}
            <td className="py-2.5 text-center w-[12%]">Acciones</td>
        </tr>
    </thead>
}
