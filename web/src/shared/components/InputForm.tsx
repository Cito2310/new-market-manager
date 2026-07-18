import type { ComponentPropsWithRef } from "react";

type InputFormProps = ComponentPropsWithRef<"input"> & {
    label: string;
    error?: string;
};

export const InputForm = ({
    label,
    error,
    className = "",
    ...props
}: InputFormProps) => {
    const borderColor = error
        ? "border-red-400 focus:border-red-500 focus:ring-red-400/20"
        : "border-slate-300 focus:border-slate-500 focus:ring-slate-400/20";

    return (
        <div className="flex flex-col gap-1.5">
            <label className="ml-1 text-sm font-medium text-slate-700">
                {label}
            </label>
            <input
                className={`rounded-lg border px-3 py-2 text-slate-800 outline-none transition focus:ring-2 ${borderColor} ${className}`}
                {...props}
            />
            {error && <span className="ml-1 text-sm text-red-500">{error}</span>}
        </div>
    );
};
