import { useEffect } from "react";
import type { ReactNode } from "react";

type ModalLayoutProps = {
    title?: string;
    subtitle?: string;
    onClose?: () => void;
    // Tailwind max-width class for the card (e.g. "max-w-md", "max-w-2xl").
    width?: string;
    children: ReactNode;
};

// Centered white card shared by auth pages and modals (login, register, addProduct...).
// Passing `onClose` turns it into an overlay modal (backdrop, close button, Escape).
export const ModalLayout = ({
    title,
    subtitle,
    onClose,
    width = "max-w-sm",
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
            className={`relative w-full ${width} rounded-2xl bg-white p-8 shadow-xl`}
        >
            <div className="flex justify-between items-center mb-4">
                {(title || subtitle) && (
                    <section className="text-center">
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

                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Cerrar"
                        className="cursor-pointer text-slate-400 transition hover:text-slate-600"
                    >
                        ✕
                    </button>
                )}
            </div>

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
            className="fixed inset-0 z-50 flex flex-col items-center bg-slate-900/20 p-12"
        >
            {card}
        </div>
    );
};
