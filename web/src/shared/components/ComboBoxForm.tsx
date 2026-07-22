import { useEffect, useRef, useState } from "react";

type ComboBoxFormProps = {
    label: string;
    options: readonly string[];
    value: string;
    onChange: (value: string) => void;
    // Called when the user picks the "create" option for a value not in `options`.
    onCreate?: (value: string) => void;
    // When set, each option shows a delete button (✕) that calls this.
    onDelete?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
};

// Creatable combobox: filters existing options while typing, and offers to
// create the typed value when it doesn't match any option.
export const ComboBoxForm = ({
    label,
    options,
    value,
    onChange,
    onCreate,
    onDelete,
    placeholder,
    disabled = false,
    className = "",
}: ComboBoxFormProps) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(value);
    const containerRef = useRef<HTMLDivElement>(null);

    // Keep the visible text in sync when the selected value changes from outside.
    useEffect(() => {
        setQuery(value);
    }, [value]);

    // Close (and discard uncommitted typing) when clicking outside.
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setOpen(false);
                setQuery(value);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [value]);

    const normalized = query.trim().toLowerCase();
    const filtered = options.filter((option) =>
        option.toLowerCase().includes(normalized),
    );
    const exactMatch = options.some(
        (option) => option.toLowerCase() === normalized,
    );
    const canCreate = Boolean(onCreate) && query.trim() !== "" && !exactMatch;

    const select = (option: string) => {
        onChange(option);
        setQuery(option);
        setOpen(false);
    };

    const create = () => {
        const name = query.trim();
        onCreate?.(name);
        onChange(name);
        setQuery(name);
        setOpen(false);
    };

    return (
        <div ref={containerRef} className={`relative flex flex-col gap-1.5 ${className}`}>
            <label className="ml-1 text-sm font-medium text-slate-700">
                {label}
            </label>

            <input
                type="text"
                value={query}
                disabled={disabled}
                placeholder={placeholder}
                onChange={(event) => {
                    setQuery(event.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-400/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
            />

            {open && !disabled && (filtered.length > 0 || canCreate) && (
                <ul className="absolute top-full z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                    {filtered.map((option) => (
                        <li
                            key={option}
                            className="group flex items-center transition hover:bg-slate-100"
                        >
                            <button
                                type="button"
                                onClick={() => select(option)}
                                className="flex-1 cursor-pointer px-3 py-1.5 text-left text-sm text-slate-700"
                            >
                                {option}
                            </button>
                            {onDelete && (
                                <button
                                    type="button"
                                    onClick={() => onDelete(option)}
                                    aria-label={`Borrar ${option}`}
                                    className="hidden shrink-0 px-2.5 py-1.5 text-slate-300 transition hover:text-red-500 group-hover:block"
                                >
                                    ✕
                                </button>
                            )}
                        </li>
                    ))}

                    {canCreate && (
                        <li>
                            <button
                                type="button"
                                onClick={create}
                                className="block w-full cursor-pointer px-3 py-1.5 text-left text-sm font-medium text-slate-800 transition hover:bg-slate-100"
                            >
                                ➕ Crear «{query.trim()}»
                            </button>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};
