import { ModalLayout } from "../../../shared/components/ModalLayout"
import type { Product } from "../../../../../shared/types"
import { useDeleteProduct } from "../hooks/useDeleteProduct"
import { FormError } from "../../../shared/components/FormError"
import { Button } from "../../../shared/components/Button"

type DeleteProductModalProps = {
    product: Product;
    onClose: () => void;
}
// CHECKED
export const DeleteProductModal = ({ product, onClose }: DeleteProductModalProps) => {
    const { remove, isLoading, error } = useDeleteProduct(product, onClose);

    return (
        <ModalLayout width="max-w-md" title="Eliminar producto" onClose={onClose}>
            <p className="text-sm text-slate-600">
                ¿Seguro que querés eliminar{" "}
                <span className="font-medium text-slate-800">{product.details.brand} {product.details.name} {product.details.size}{product.details.sizeUnit}</span>?
                Esta acción lo desactiva del catálogo.
            </p>

            <FormError message={error} />

            <div className="mt-6 flex justify-end gap-3">
                <Button onClick={onClose} disabled={isLoading} variant="secondary">
                    Cancelar
                </Button>

                <Button onClick={remove} disabled={isLoading} variant="danger">
                    Eliminar
                </Button>
            </div>
        </ModalLayout>
    )
}
