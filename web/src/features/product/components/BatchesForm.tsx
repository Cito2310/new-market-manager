import { InputForm } from "../../../shared/components/InputForm";
import type { BatchDraft } from "../hooks/useProductForm";

type BatchesFormProps = {
    value: BatchDraft[];
    onChange: (rows: BatchDraft[]) => void;
};

// Growable list of batches (quantity + expiration + received dates). Starts
// empty: "no batches" is just an empty list. Controlled by the parent.
export const BatchesForm = ({ value, onChange }: BatchesFormProps) => {
    const add = () =>
        onChange([...value, { quantity: "", expirationDate: "", receivedAt: "" }]);

    const remove = (index: number) =>
        onChange(value.filter((_, i) => i !== index));

    const update = (index: number, field: keyof BatchDraft, next: string) =>
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
                            label="Cantidad"
                            type="number"
                            placeholder="0"
                            value={row.quantity}
                            onChange={(event) =>
                                update(index, "quantity", event.target.value)
                            }
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <InputForm
                            label="Vence el"
                            type="date"
                            value={row.expirationDate}
                            onChange={(event) =>
                                update(index, "expirationDate", event.target.value)
                            }
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <InputForm
                            label="Recibido el"
                            type="date"
                            value={row.receivedAt}
                            onChange={(event) =>
                                update(index, "receivedAt", event.target.value)
                            }
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => remove(index)}
                        aria-label="Quitar lote"
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
                + Añadir lote
            </button>
        </div>
    );
};
