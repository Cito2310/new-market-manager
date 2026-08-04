import { Button } from "../../../shared/components/Button"
import { XIcon } from "../../../shared/components/icons/XIcon"
import { QuantityCell } from "./QuantityCell"
import { formatMoney } from "../helpers/formatMoney"
import { lineTotal } from "../helpers/saleTotals"
import type { SaleLine } from "../posSlice"

interface LineItemProps {
    line: SaleLine
    onRemove: (productId: string) => void
    onQuantityChange: (productId: string, quantity: number) => void
}

// A single row of the sale: one product with its quantity and amount.
export const LineItem = ({ line, onRemove, onQuantityChange }: LineItemProps) => {
    return (
        <tr className="border-b border-slate-100 text-slate-700 transition even:bg-slate-50 hover:bg-slate-100">
            <td className="py-1 pl-6 capitalize text-slate-800">{line.name}</td>
            <td className="py-1 text-center">{formatMoney(line.unitPrice)}</td>
            <QuantityCell
                quantity={line.quantity}
                weighable={line.weighable}
                onChange={(quantity) => onQuantityChange(line.productId, quantity)}
            />
            <td className="py-1 text-center font-medium text-slate-800">
                {formatMoney(lineTotal(line))}
            </td>
            <td className="py-1 pr-6">
                <Button
                    variant="ghost"
                    square
                    aria-label="Quitar producto"
                    className="ml-auto hover:text-red-600"
                    onClick={() => onRemove(line.productId)}
                >
                    <XIcon />
                </Button>
            </td>
        </tr>
    )
}
