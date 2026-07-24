// Header row of the products table.
export const ProductTableHead = () => {
    return <thead>
        <tr className="border-b border-slate-200 text-xs font-medium uppercase tracking-wide text-slate-400">
            <td className="py-2.5">Producto</td>
            <td className="py-2.5">Categorias</td>
            <td className="py-2.5">Precios</td>
            <td className="py-2.5">Stock</td>
            {/* APARTADO PARA BOTONES */}
            <td className="py-2.5 text-right">Acciones</td>
        </tr>
    </thead>
}
