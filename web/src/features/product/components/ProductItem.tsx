import { PencilIcon } from "../../../shared/components/icons/PencilIcon"
import { TrashIcon } from "../../../shared/components/icons/TrashIcon"
import { StockBar } from "./StockBar"
import type { Product } from "../../../../../shared/types"

interface ProductItemProps {
    product: Product
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

// A single row of the products table.
export const ProductItem = ({ product, onEdit, onDelete }: ProductItemProps) => {
    const getProductNameParsed = ({ details }: Product) => {
        const { brand, name, size, sizeUnit } = details

        return `${brand} ${name} ${size}${sizeUnit}`
    }

    return <tr className="border-b border-slate-100 text-slate-700 transition hover:bg-slate-50">
        <td className="py-3 font-medium text-slate-800">{getProductNameParsed(product)}</td>
        <td className="py-3">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {product.details.category}
            </span>
            {product.details.subcategory && (
                <span className="ml-2 text-xs text-slate-400">
                    {product.details.subcategory}
                </span>
            )}
        </td>
        <td className="py-3 font-medium text-slate-800">
            ${product.sell.salePrice.toLocaleString("es-AR")}
        </td>
        {product.stock ? (
            <StockBar
                currentStock={product.stock.quantity}
                lowStock={product.stock.alerts.low}
            />
        ) : (
            <td className="py-3 text-slate-400">-</td>
        )}
        <td className="py-3">
            <div className="flex items-center justify-end gap-1">
                <button
                    type="button"
                    aria-label="Editar producto"
                    onClick={() => onEdit(product)}
                    className="flex cursor-pointer items-center justify-center rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
                >
                    <PencilIcon />
                </button>
                <button
                    type="button"
                    aria-label="Borrar producto"
                    onClick={() => onDelete(product)}
                    className="flex cursor-pointer items-center justify-center rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-red-600"
                >
                    <TrashIcon />
                </button>
            </div>
        </td>
    </tr>
}
