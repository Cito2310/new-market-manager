type PaginationProps = {
    page: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    canPrev: boolean;
    canNext: boolean;
};

const buttonClass =
    "cursor-pointer rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50";

// Page navigation controls: previous / current page / next.
export const Pagination = ({
    page,
    totalPages,
    onPrev,
    onNext,
    canPrev,
    canNext,
}: PaginationProps) => {
    return (
        <div className="flex items-center justify-between">
            <button type="button" onClick={onPrev} disabled={!canPrev} className={buttonClass}>
                Anterior
            </button>

            <span className="text-sm text-slate-500">
                Página {page} de {totalPages}
            </span>

            <button type="button" onClick={onNext} disabled={!canNext} className={buttonClass}>
                Siguiente
            </button>
        </div>
    );
};
