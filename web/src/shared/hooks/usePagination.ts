import { useState, useMemo, useEffect } from "react";

// Client-side pagination over an in-memory list: slices `items` into pages of
// `pageSize` and exposes the current page plus navigation helpers.
export const usePagination = <T>(items: T[], pageSize: number) => {
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

    // Clamp the page if the list shrinks (e.g. after a delete leaves it empty).
    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [page, totalPages]);

    const pageItems = useMemo(() => {
        const start = (page - 1) * pageSize;
        return items.slice(start, start + pageSize);
    }, [items, page, pageSize]);

    return {
        page,
        totalPages,
        pageItems,
        next: () => setPage((p) => Math.min(p + 1, totalPages)),
        prev: () => setPage((p) => Math.max(p - 1, 1)),
        canPrev: page > 1,
        canNext: page < totalPages,
    };
};
