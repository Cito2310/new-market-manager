import type { SVGProps } from "react";

// Inline pencil icon (edit action). Rendered from local markup so it works offline.
export const PencilIcon = ({
    width = 18,
    height = 18,
    ...props
}: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
    );
};
