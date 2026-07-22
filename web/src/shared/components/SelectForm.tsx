import type { ComponentPropsWithRef } from "react";

type SelectFormProps = ComponentPropsWithRef<"select"> & {
    label: string;
    options: readonly string[];
    error?: string;
    placeholder?: string;
};

export const SelectForm = ({
    label,
    options,
    error,
    placeholder,
    className = "",
    ...props
}: SelectFormProps) => {
    const borderColor = error
        ? "border-red-400 focus:border-red-500 focus:ring-red-400/20"
        : "border-slate-300 focus:border-slate-500 focus:ring-slate-400/20";

    return (
        <div className="flex flex-col gap-1.5">
            <label className="ml-1 text-sm font-medium text-slate-700">
                {label}
            </label>
            <select
                className={`cursor-pointer rounded-lg border bg-white px-3 py-[0.55rem] text-slate-800 outline-none transition focus:ring-2 ${borderColor} ${className}`}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {error && <span className="ml-1 text-sm text-red-500">{error}</span>}
        </div>
    );
};
