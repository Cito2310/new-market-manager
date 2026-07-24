type MultiInputFormProps = {
    label: string;
    value: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    addLabel?: string;
    className?: string;
};

// Label with a growing list of text inputs: the button appends a new row below.
// Controlled: the value list and its updates are owned by the parent.
export const MultiInputForm = ({
    label,
    value,
    onChange,
    placeholder,
    addLabel = "Añadir",
    className = "",
}: MultiInputFormProps) => {
    const add = () => onChange([...value, ""]);

    const remove = (index: number) =>
        onChange(value.filter((_, i) => i !== index));

    const update = (index: number, next: string) =>
        onChange(value.map((v, i) => (i === index ? next : v)));

    return (
        <div className={`flex w-full min-w-0 flex-col gap-1.5 ${className}`}>
            <label className="ml-1 text-sm font-medium text-slate-700">
                {label}
            </label>

            <div className="flex flex-col gap-2">
                {value.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            value={entry}
                            onChange={(event) => update(index, event.target.value)}
                            placeholder={placeholder}
                            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-400/20"
                        />
                        {value.length > 1 && (
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                aria-label="Quitar"
                                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-300 text-slate-400 transition hover:border-red-300 hover:text-red-500"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={add}
                className="ml-1 mt-1 self-start cursor-pointer text-sm font-medium text-slate-600 transition hover:text-slate-800"
            >
                + {addLabel}
            </button>
        </div>
    );
};
