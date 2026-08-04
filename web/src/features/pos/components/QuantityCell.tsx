import { useState } from "react"
import type { KeyboardEvent } from "react"

interface QuantityCellProps {
    quantity: number
    weighable: boolean
    onChange: (quantity: number) => void
}

// Table cell holding a line quantity. Double clicking it turns it into an input.
export const QuantityCell = ({ quantity, weighable, onChange }: QuantityCellProps) => {
    // A null draft means the cell is not being edited.
    const [draft, setDraft] = useState<string | null>(null)

    const commit = () => {
        if (draft === null) return
        setDraft(null)

        // Accept the comma as a decimal separator: it is what an es-AR keypad types.
        const next = Number(draft.replace(",", "."))
        if (!Number.isFinite(next) || next === quantity) return

        onChange(next)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") commit()
        if (event.key === "Escape") setDraft(null)
    }

    return (
        <td
            className="select-none py-1 text-center"
            title="Doble clic para editar la cantidad"
            onDoubleClick={() => setDraft(String(quantity))}
        >
            {draft === null ? (
                quantity
            ) : (
                <input
                    autoFocus
                    type="number"
                    min="0"
                    step={weighable ? "0.001" : "1"}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onFocus={(event) => event.target.select()}
                    onBlur={commit}
                    onKeyDown={handleKeyDown}
                    className="w-20 rounded-md px-2 py-0.5 text-center ring-1 ring-slate-300 outline-none focus:ring-2 focus:ring-slate-800"
                />
            )}
        </td>
    )
}
