import { InputForm } from "../../../shared/components/InputForm";
import type { PromotionDraft } from "../hooks/useAddProduct";

type PromotionsFormProps = {
    value: PromotionDraft[];
    onChange: (rows: PromotionDraft[]) => void;
};

// Growable list of promotions (minQuantity + pricePerUnit). Starts empty:
// "no promotions" is just an empty list. Controlled by the parent.
export const PromotionsForm = ({ value, onChange }: PromotionsFormProps) => {
    const add = () =>
        onChange([...value, { minQuantity: "", pricePerUnit: "" }]);

    const remove = (index: number) =>
        onChange(value.filter((_, i) => i !== index));

    const update = (index: number, field: keyof PromotionDraft, next: string) =>
        onChange(
            value.map((row, i) =>
                i === index ? { ...row, [field]: next } : row,
            ),
        );

    return (
        <div className="flex flex-col gap-2">
            {value.map((row, index) => (
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
                        className="flex h-[2.6rem] w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-300 text-slate-400 transition hover:border-red-300 hover:text-red-500"
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
