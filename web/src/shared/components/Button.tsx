import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "nav";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    square?: boolean;
};

const ButtonVariant = "nav";

const variants = {
    "primary": "",
    "nav": "bg-slate-300 hover:brightness-[.97] active:brightness-[.94]"
}


export const Button = ({ children, type = "button", square, variant = "primary", className = "", ...props }: ButtonProps) => {
    return (
        <button type={type} {...props}
            className={`
                flex items-center justify-center
                ${ square ? "w-[2.25em] aspect-square" : "p-3" }
                transition-all cursor-pointer disabled:pointer-events-none
                ${variants[variant]} ${className}
            `}>
            {children}
        </button>
    );
};
