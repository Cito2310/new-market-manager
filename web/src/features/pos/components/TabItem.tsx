import { XIcon } from "../../../shared/components/icons/XIcon"
import { formatMoney } from "../helpers/formatMoney"
import { tabTotal } from "../helpers/saleTotals"
import type { SaleTab } from "../posSlice"

interface TabItemProps {
    tab: SaleTab
    index: number
    isActive: boolean
    closable: boolean
    onSelect: (tabId: string) => void
    onClose: (tabId: string) => void
}

// A single sale tab. The label and the close action are sibling buttons because a
// button cannot be nested inside another one.
export const TabItem = ({
    tab,
    index,
    isActive,
    closable,
    onSelect,
    onClose,
}: TabItemProps) => {
    return (
        <div
            className={`flex items-center rounded-t-lg pr-2 transition-all ${
                isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            }`}
        >
            <button
                type="button"
                className="cursor-pointer py-2 pl-4 pr-2 text-sm font-semibold"
                onClick={() => onSelect(tab.id)}
            >
                Venta {index + 1} - {formatMoney(tabTotal(tab))}
            </button>

            {closable && (
                <button
                    type="button"
                    aria-label={`Cerrar venta ${index + 1}`}
                    className="flex cursor-pointer items-center justify-center rounded p-1 opacity-60 transition hover:text-red-500 hover:opacity-100"
                    onClick={() => onClose(tab.id)}
                >
                    <XIcon />
                </button>
            )}
        </div>
    )
}
