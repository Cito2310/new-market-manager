import type { JSX } from "react/jsx-runtime";
import { InputForm } from "../../../shared/components/InputForm"
import { SelectForm } from "../../../shared/components/SelectForm"
import { CheckboxForm } from "../../../shared/components/CheckboxForm"
import { MultiInputForm } from "../../../shared/components/MultiInputForm"
import { ButtonForm } from "../../../shared/components/ButtonForm"
import { ModalLayout } from "../../../shared/components/ModalLayout"
import { SubcontainerForm } from "../../../shared/components/SubContainerForm"
import { SIZE_UNITS } from "../../../../../shared/types"
import type { SizeUnit } from "../../../../../shared/types"
import { PromotionsForm } from "../components/PromotionsForm"
import { CategoryCascadeForm } from "../components/CategoryCascadeForm"
import { useAddProduct } from "../hooks/useAddProduct"

const Row = ({ children }: { children: JSX.Element[] | JSX.Element }) => (
    <div className="flex gap-3 w-full">{children}</div>
)

type AddProductModalProps = {
    onClose: () => void;
}

export const AddProductModal = ({ onClose }: AddProductModalProps) => {
    const { cascade, details, sell, stock, expiry, error, isLoading, submit } =
        useAddProduct(onClose);

    return (
        <ModalLayout width="max-w-[800px]" title="Añadir Producto" onClose={onClose}>
            <form onSubmit={submit} className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
                <SubcontainerForm title="Detalles">
                    <CategoryCascadeForm cascade={cascade} />

                    <Row>
                        <InputForm
                            label="Nombre"
                            type="text"
                            placeholder="Ej. Coca-Cola"
                            value={details.name}
                            onChange={(event) => details.setName(event.target.value)}
                        />
                        <InputForm
                            label="Tamaño"
                            type="number"
                            placeholder="0"
                            value={details.size}
                            onChange={(event) => details.setSize(event.target.value)}
                        />
                        <SelectForm
                            label="Unidad"
                            options={SIZE_UNITS}
                            value={details.sizeUnit}
                            onChange={(event) => details.setSizeUnit(event.target.value as SizeUnit)}
                        />
                    </Row>

                    <Row>
                        <MultiInputForm
                            label="Códigos de barra"
                            placeholder="Ej. 7791234567890"
                            addLabel="Añadir código"
                            value={details.barcodes}
                            onChange={details.setBarcodes}
                        />

                        <MultiInputForm
                            label="Etiquetas"
                            placeholder="Ej. oferta"
                            addLabel="Añadir etiqueta"
                            value={details.tags}
                            onChange={details.setTags}
                        />
                    </Row>
                </SubcontainerForm>

                <SubcontainerForm title="Ventas">
                    <Row>
                        <InputForm
                            label="Costo"
                            type="number"
                            placeholder="0.00"
                            value={sell.cost}
                            onChange={(event) => sell.setCost(event.target.value)}
                        />
                        <InputForm
                            label="Precio de venta"
                            type="number"
                            placeholder="0.00"
                            value={sell.salePrice}
                            onChange={(event) => sell.setSalePrice(event.target.value)}
                        />
                    </Row>

                    <CheckboxForm
                        label="Producto pesable"
                        checked={sell.weighable}
                        onChange={(event) => sell.setWeighable(event.target.checked)}
                    />
                </SubcontainerForm>

                <SubcontainerForm title="Promociones">
                    <PromotionsForm value={sell.promotions} onChange={sell.setPromotions} />
                </SubcontainerForm>

                <SubcontainerForm title="Stock" optional open={stock.open} onToggle={stock.toggle}>
                    <Row>
                        <InputForm
                            label="Cantidad"
                            type="number"
                            placeholder="0"
                            value={stock.quantity}
                            onChange={(event) => stock.setQuantity(event.target.value)}
                        />
                    </Row>

                    <CheckboxForm
                        label="Alertas de stock activadas"
                        checked={stock.alertsEnabled}
                        onChange={(event) => stock.setAlertsEnabled(event.target.checked)}
                    />

                    <Row>
                        <InputForm
                            label="Aviso"
                            type="number"
                            placeholder="0"
                            value={stock.warning}
                            onChange={(event) => stock.setWarning(event.target.value)}
                        />
                        <InputForm
                            label="Bajo"
                            type="number"
                            placeholder="0"
                            value={stock.low}
                            onChange={(event) => stock.setLow(event.target.value)}
                        />
                        <InputForm
                            label="Crítico"
                            type="number"
                            placeholder="0"
                            value={stock.critical}
                            onChange={(event) => stock.setCritical(event.target.value)}
                        />
                    </Row>
                </SubcontainerForm>

                <SubcontainerForm title="Vencimiento (lote)" optional open={expiry.open} onToggle={expiry.toggle}>
                    <Row>
                        <InputForm
                            label="Cantidad del lote"
                            type="number"
                            placeholder="0"
                            value={expiry.batchQuantity}
                            onChange={(event) => expiry.setBatchQuantity(event.target.value)}
                        />
                    </Row>

                    <Row>
                        <InputForm
                            label="Vence el"
                            type="date"
                            value={expiry.expirationDate}
                            onChange={(event) => expiry.setExpirationDate(event.target.value)}
                        />
                        <InputForm
                            label="Recibido el"
                            type="date"
                            value={expiry.receivedAt}
                            onChange={(event) => expiry.setReceivedAt(event.target.value)}
                        />
                    </Row>
                </SubcontainerForm>

                {error && <p className="ml-1 text-sm text-red-500">{error}</p>}

                <ButtonForm className="mt-2" disabled={isLoading}>
                    {isLoading ? "Guardando..." : "Guardar Producto"}
                </ButtonForm>
            </form>
        </ModalLayout>
    )
}
