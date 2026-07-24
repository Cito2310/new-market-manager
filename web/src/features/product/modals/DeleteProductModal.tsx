import { ModalLayout } from "../../../shared/components/ModalLayout"
import type { Product } from "../../../../../shared/types"
import { useDeleteProduct } from "../hooks/useDeleteProduct"

type DeleteProductModalProps = {
    product: Product;
    onClose: () => void;
}

// Simple confirmation dialog for soft-deleting a product.
export const DeleteProductModal = ({ product, onClose }: DeleteProductModalProps) => {
    const { remove, isLoading, error } = useDeleteProduct(product, onClose);

    return (
        <ModalLayout width="max-w-md" title="Eliminar producto" onClose={onClose}>
            <p className="text-sm text-slate-600">
                ¿Seguro que querés eliminar{" "}
                <span className="font-medium text-slate-800">{product.details.name}</span>?
                Esta acción lo desactiva del catálogo.
            </p>

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

            <div className="mt-6 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    onClick={remove}
                    disabled={isLoading}
                    className="cursor-pointer rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white transition hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading ? "Eliminando..." : "Eliminar"}
                </button>
            </div>
        </ModalLayout>
    )
}
