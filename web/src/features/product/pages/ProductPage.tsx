import { useState } from "react"
import type { Product } from "../../../../../shared/types"
import { Button } from "../../../shared/components/Button"
import { ProductFormModal } from "../modals/ProductFormModal"
import { DeleteProductModal } from "../modals/DeleteProductModal"
import { useProducts } from "../hooks/useProducts"
import { useProductFilters } from "../hooks/useProductFilters"
import { useProductSort } from "../hooks/useProductSort"
import { ProductItem } from "../components/ProductItem"
import { ProductTableHead } from "../components/ProductTableHead"
import { ProductToolbar } from "../components/ProductToolbar"
import { Pagination } from "../../../shared/components/Pagination"
import { usePagination } from "../../../shared/hooks/usePagination"

const PAGE_SIZE = 20

export const ProductPage = () => {
    const [isAdding, setIsAdding] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
    const { products } = useProducts()
    const {
        filtered,
        search,
        setSearch,
        section,
        changeSection,
        category,
        setCategory,
        sections,
        categoryOptions,
    } = useProductFilters(products)
    const { sorted, sort, toggle } = useProductSort(filtered)
    const { pageItems, page, totalPages, next, prev, canPrev, canNext } =
        usePagination(sorted, PAGE_SIZE)

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
                <Button onClick={() => setIsAdding(true)}>+ Añadir Producto</Button>
            </section>

            <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl">
                <ProductToolbar
                    search={search}
                    onSearchChange={setSearch}
                    section={section}
                    onSectionChange={changeSection}
                    category={category}
                    onCategoryChange={setCategory}
                    sections={sections}
                    categoryOptions={categoryOptions}
                />

                <table className="w-full table-fixed text-left">
                    <ProductTableHead sort={sort} onSort={toggle} />
                    <tbody>
                        {pageItems.map((product) => (
                            <ProductItem
                                key={product._id}
                                product={product}
                                onEdit={setEditingProduct}
                                onDelete={setDeletingProduct}
                            />
                        ))}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPrev={prev}
                        onNext={next}
                        canPrev={canPrev}
                        canNext={canNext}
                    />
                )}
            </div>
        </div>
    </>
}
