import type { ComponentPropsWithRef } from "react";

type CheckboxFormProps = ComponentPropsWithRef<"input"> & {
    label: string;
};

export const CheckboxForm = ({
    label,
    className = "",
    ...props
}: CheckboxFormProps) => {
    return (
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
            <input
                type="checkbox"
                className={`h-4 w-4 cursor-pointer rounded border-slate-300 text-slate-800 accent-slate-800 ${className}`}
                {...props}
            />
            {label}
        </label>
    );
};
