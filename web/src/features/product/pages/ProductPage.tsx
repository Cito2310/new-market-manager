import { useState } from "react"
import { ButtonForm } from "../../../shared/components/ButtonForm"
import { AddProductModal } from "../modals/AddProductModal"
import { useProducts } from "../hooks/useProducts"
import { ProductItem } from "../components/ProductItem"
import { ProductTableHead } from "../components/ProductTableHead"
import { ProductToolbar } from "../components/ProductToolbar"

export const ProductPage = () => {
    const [isAdding, setIsAdding] = useState(false)
    const { products } = useProducts()

    return <>
        {isAdding && <AddProductModal onClose={() => setIsAdding(false)} />}

        <div className="mx-auto flex max-w-5xl flex-col gap-6 p-8">
            <section className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800">Productos</h1>
                <ButtonForm onClick={() => setIsAdding(true)}>+ Añadir Producto</ButtonForm>
            </section>

            <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl">
                <ProductToolbar />

                <table className="w-full text-left">
                    <ProductTableHead />
                    <tbody>
                        {products.map((product) => (
                            <ProductItem key={product._id} product={product} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}
