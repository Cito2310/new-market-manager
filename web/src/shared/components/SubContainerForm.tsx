import { useState } from "react";
import type { JSX } from "react/jsx-runtime";

interface props {
    title: string;
    // When true, shows a switch in the header that mounts/unmounts the children.
    // Meant for optional model blocks (stock, expiry): hidden => sent as undefined.
    optional?: boolean;
    // Optional controlled switch: pass both to let the parent own the open state
    // (so it knows whether to include the block). Falls back to internal state.
    open?: boolean;
    onToggle?: () => void;
    children: JSX.Element[] | JSX.Element | string
}

export const SubcontainerForm = ({ children, title, optional = false, open, onToggle }: props) => {
    const [internalOpen, setInternalOpen] = useState(false);

    const isOpen = open ?? internalOpen;
    const toggle = () => (onToggle ? onToggle() : setInternalOpen((value) => !value));

    const showChildren = !optional || isOpen;

    return (
        <div className="w-full flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <h3 className="ml-1 mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{ title }</h3>

                {optional && (
                    <button
                        type="button"
                        role="switch"
                        aria-checked={isOpen}
                        aria-label={`Incluir ${title}`}
                        onClick={toggle}
                        className={`relative mt-2 h-5 w-9 shrink-0 cursor-pointer rounded-full transition ${isOpen ? "bg-slate-800" : "bg-slate-300"}`}
                    >
                        <span
                            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${isOpen ? "left-4" : "left-0.5"}`}
                        />
                    </button>
                )}
            </div>

            { showChildren && children }
        </div>

    )
}
