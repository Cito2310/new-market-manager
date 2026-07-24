import { useState } from "react"
import type { Product } from "../../../../../shared/types"
import { ButtonForm } from "../../../shared/components/ButtonForm"
import { ProductFormModal } from "../modals/ProductFormModal"
import { DeleteProductModal } from "../modals/DeleteProductModal"
import { useProducts } from "../hooks/useProducts"
import { ProductItem } from "../components/ProductItem"
import { ProductTableHead } from "../components/ProductTableHead"
import { ProductToolbar } from "../components/ProductToolbar"

export const ProductPage = () => {
    const [isAdding, setIsAdding] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
    const { products } = useProducts()

    return <>
        {isAdding && <ProductFormModal onClose={() => setIsAdding(false)} />}

        {editingProduct && (
            <ProductFormModal product={editingProduct} onClose={() => setEditingProduct(null)} />
        )}

        {deletingProduct && (
            <DeleteProductModal product={deletingProduct} onClose={() => setDeletingProduct(null)} />
        )}

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
                            <ProductItem
                                key={product._id}
                                product={product}
                                onEdit={setEditingProduct}
                                onDelete={setDeletingProduct}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}
