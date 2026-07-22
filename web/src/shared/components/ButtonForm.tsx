import type { ButtonHTMLAttributes } from "react";

type ButtonFormProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonForm = ({
    children,
    type = "submit",
    className = "",
    ...props
}: ButtonFormProps) => {
    return (
        <button
            type={type}
            className={`p-4 cursor-pointer rounded-lg bg-slate-800 py-2.5 font-medium text-white transition hover:bg-slate-700 active:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
