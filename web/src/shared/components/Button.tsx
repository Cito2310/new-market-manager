import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "nav" | "tab" | "tab-active" | "secondary" | "ghost" | "danger" | "danger-soft" | "success";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    square?: boolean;
};

const ButtonVariant = "nav";

const variants = {
    "primary": "bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-900",
    "secondary": "ring-1 ring-slate-300 text-slate-700 bg-white hover:brightness-[.97] active:brightness-[.94]",
    // No background or border until hovered. The hover text color is left to the
    // caller, so the same variant serves edit (blue), delete (red), etc.
    "ghost": "text-slate-400 hover:bg-slate-100 active:bg-slate-200",
    // Borderless tabs that sit on top of a divider: square bottom corners so the
    // edge touching the line stays flush.
    "tab": "rounded-t-lg rounded-b-none text-slate-500 hover:bg-slate-100 hover:text-slate-700",
    "tab-active": "rounded-t-lg rounded-b-none bg-slate-800 text-white",
    "danger": "bg-red-600 text-white hover:brightness-[.95] active:brightness-[.90]",
    // Reads as secondary until touched: red text on hover, reddish tint when pressed.
    "danger-soft": "ring-1 ring-slate-300 text-slate-700 bg-white hover:text-red-600 active:bg-red-100 active:text-red-700 active:brightness-[.95]",
    "success": "bg-emerald-600 text-white hover:brightness-[.95] active:brightness-[.90]",
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
