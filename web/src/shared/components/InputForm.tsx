import type { ComponentPropsWithRef } from "react";

type InputFormProps = ComponentPropsWithRef<"input"> & {
    label: string;
};

export const InputForm = ({ label, className = "", ...props }: InputFormProps) => {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="ml-1 text-sm font-medium text-slate-700">
                {label}
            </label>
            <input
                className={`rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-400/20 ${className}`}
                {...props}
            />
        </div>
    );
};
