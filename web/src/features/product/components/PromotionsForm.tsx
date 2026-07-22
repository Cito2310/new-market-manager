import { useState } from "react";
import { InputForm } from "../../../shared/components/InputForm";

type PromotionRow = {
    minQuantity: string;
    pricePerUnit: string;
};

// Growable list of promotions (minQuantity + pricePerUnit). Starts empty:
// "no promotions" is just an empty list. Visual only for now.
export const PromotionsForm = () => {
    const [rows, setRows] = useState<PromotionRow[]>([]);

    const add = () =>
        setRows((prev) => [...prev, { minQuantity: "", pricePerUnit: "" }]);

    const remove = (index: number) =>
        setRows((prev) => prev.filter((_, i) => i !== index));

    const update = (index: number, field: keyof PromotionRow, value: string) =>
        setRows((prev) =>
            prev.map((row, i) =>
                i === index ? { ...row, [field]: value } : row,
            ),
        );

    return (
        <div className="flex flex-col gap-2">
            {rows.map((row, index) => (
                <div key={index} className="flex items-end gap-2">
                    <div className="min-w-0 flex-1">
                        <InputForm
                            label="Cantidad mínima"
                            type="number"
                            placeholder="0"
                            value={row.minQuantity}
                            onChange={(event) =>
                                update(index, "minQuantity", event.target.value)
                            }
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <InputForm
                            label="Precio por unidad"
                            type="number"
                            placeholder="0.00"
                            value={row.pricePerUnit}
                            onChange={(event) =>
                                update(index, "pricePerUnit", event.target.value)
                            }
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => remove(index)}
                        aria-label="Quitar promoción"
                        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-300 text-slate-400 transition hover:border-red-300 hover:text-red-500"
                    >
                        ✕
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={add}
                className="ml-1 mt-1 self-start cursor-pointer text-sm font-medium text-slate-600 transition hover:text-slate-800"
            >
                + Añadir promoción
            </button>
        </div>
    );
};
