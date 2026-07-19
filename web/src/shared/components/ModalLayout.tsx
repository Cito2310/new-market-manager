import { useEffect } from "react";
import type { ReactNode } from "react";

type ModalLayoutProps = {
    title?: string;
    subtitle?: string;
    onClose?: () => void;
    children: ReactNode;
};

// Centered white card shared by auth pages and modals (login, register, addProduct...).
// Passing `onClose` turns it into an overlay modal (backdrop, close button, Escape).
export const ModalLayout = ({
    title,
    subtitle,
    onClose,
    children,
}: ModalLayoutProps) => {
    // Modal-only behavior: Escape to close and lock body scroll.
    useEffect(() => {
        if (!onClose) return;

        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    const card = (
        <div
            role={onClose ? "dialog" : undefined}
            aria-modal={onClose ? true : undefined}
            onClick={onClose ? (event) => event.stopPropagation() : undefined}
            className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl"
        >
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar"
                    className="absolute right-4 top-4 cursor-pointer text-slate-400 transition hover:text-slate-600"
                >
                    ✕
                </button>
            )}

            {(title || subtitle) && (
                <section className="mb-4 text-center">
                    {title && (
                        <h1 className="text-2xl font-bold text-slate-800">
                            {title}
                        </h1>
                    )}
                    {subtitle && (
                        <p className="mt-1 text-sm text-slate-500">
                            {subtitle}
                        </p>
                    )}
                </section>
            )}

            {children}
        </div>
    );

    // Page mode: plain centered card, no overlay.
    if (!onClose) {
        return <div className="flex items-center justify-center p-12">{card}</div>;
    }

    // Modal mode: full-screen backdrop; clicking outside the card closes it.
    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
        >
            {card}
        </div>
    );
};
