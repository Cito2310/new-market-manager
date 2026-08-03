import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "nav" | "secondary" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    square?: boolean;
};

const ButtonVariant = "nav";

const variants = {
    "primary": "bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-900",
    "secondary": "ring-1 ring-slate-300 text-slate-700 bg-white hover:brightness-[.97] active:brightness-[.94]",
    "danger": "bg-red-600 text-white hover:brightness-[.95] active:brightness-[.90]",
    "nav": "bg-slate-300 hover:brightness-[.97] active:brightness-[.94] rounded-none"
}


export const Button = ({ children, type = "button", square, variant = "primary", className = "", ...props }: ButtonProps) => {
    return (
        <button type={type} {...props}
            className={`
                flex items-center justify-center rounded-md
                ${ square ? "w-[2.25em] aspect-square" : "p-2 px-4" }
                transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-60
                ${variants[variant]} ${className}
            `}>
            {children}
        </button>
    );
};
