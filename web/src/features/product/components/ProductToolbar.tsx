import { SearchIcon } from "../../../shared/components/icons/SearchIcon"

// Search input and filters above the products table.
export const ProductToolbar = () => {
    return <section className="flex flex-wrap items-center gap-3">
        <div className="flex">
            <input
                placeholder="Buscar"
                className="rounded-l-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-400/20"
            ></input>
            <button
                type="button"
                aria-label="Buscar"
                className="flex cursor-pointer items-center justify-center rounded-r-lg border border-l-0 border-slate-300 bg-slate-100 px-3 text-slate-600 transition hover:bg-slate-200"
            >
                <SearchIcon />
            </button>
        </div>
        <select className="cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-slate-700 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-400/20">
            Section
        </select>

        <select className="cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-slate-700 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-400/20">
            Categorias
        </select>
    </section>
}
