import { LineItem } from "./LineItem"
import { formatMoney } from "../helpers/formatMoney"
import type { SaleLine } from "../posSlice"

interface SaleDetailProps {
    lines: SaleLine[]
    total: number
    onRemove: (productId: string) => void
    onQuantityChange: (productId: string, quantity: number) => void
}

// The body of the active sale: its lines scroll, the total stays pinned below.
export const SaleDetail = ({
    lines,
    total,
    onRemove,
    onQuantityChange,
}: SaleDetailProps) => {
    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto">
                <table className="w-full table-fixed text-left">
                    <thead>
                        <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <th className="pb-3 pl-6">Producto</th>
                            <th className="w-26 pb-3 text-center">Precio</th>
                            <th className="w-28 pb-3 text-center">Cantidad</th>
                            <th className="w-26 pb-3 text-center">Importe</th>
                            <th className="w-20 pb-3 pr-6"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {lines.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-10 text-center text-slate-400">
                                    Escaneá un producto para empezar la venta
                                </td>
                            </tr>
                        )}

                        {lines.map((line) => (
                            <LineItem
                                key={line.productId}
                                line={line}
                                onRemove={onRemove}
                                onQuantityChange={onQuantityChange}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-baseline justify-end border-t-2 border-slate-300 px-6 pt-4">
                <span className="text-2xl font-bold text-slate-600">{formatMoney(total)}</span>
            </div>
        </div>
    )
}
