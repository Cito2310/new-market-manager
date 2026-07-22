import { ButtonForm } from "../../../shared/components/ButtonForm"
import { SearchIcon } from "../../../shared/components/icons/SearchIcon"

export const ProductPage = () => {
    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-6 p-8">
            <section className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800">Productos</h1>
                <ButtonForm>Añadir Producto</ButtonForm>
                {/* <button className="cursor-pointer rounded-lg bg-slate-800 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700 active:bg-slate-900">
                    Añadir Producto
                </button> */}
            </section>

            <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl">
                <section className="flex flex-wrap items-center gap-3">
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

                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-200 text-sm font-medium text-slate-500">
                            <td className="py-2.5">Producto</td>
                            <td className="py-2.5">Categorias</td>
                            <td className="py-2.5">Precios</td>
                            <td className="py-2.5">Stock</td>
                            {/* APARTADO PARA BOTONES */}
                            <td className="py-2.5"></td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}
