import { InputForm } from "../../../shared/components/InputForm"
import { SelectForm } from "../../../shared/components/SelectForm"
import { CheckboxForm } from "../../../shared/components/CheckboxForm"
import { MultiInputForm } from "../../../shared/components/MultiInputForm"
import { ButtonForm } from "../../../shared/components/ButtonForm"
import { ModalLayout } from "../../../shared/components/ModalLayout"
import { SIZE_UNITS } from "../../../../../shared/types"
import type { JSX } from "react/jsx-runtime";
import { SubcontainerForm } from "../../../shared/components/SubContainerForm"
import { PromotionsForm } from "../components/PromotionsForm"
import { CategoryCascadeForm } from "../components/CategoryCascadeForm"

// Section heading used to group the product form fields (visual only for now).
const Row = ({ children }: { children: JSX.Element[] | JSX.Element }) => (
    <div className="flex gap-3 w-full">{children}</div>
)

// Static "add product" form: shows every field of the Product model. No logic yet.
export const AddProductModal = () => {
    return (
        <ModalLayout width="max-w-[800px]" title="Añadir Producto" onClose={() => {}}>
            <form className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
                <SubcontainerForm title="Detalles">
                    <CategoryCascadeForm />

                    <Row>
                        <InputForm label="Nombre" type="text" placeholder="Ej. Coca-Cola" />
                        <InputForm label="Tamaño" type="number" placeholder="0" />
                        <SelectForm
                            label="Unidad"
                            options={SIZE_UNITS}
                            defaultValue="unit"
                        />
                    </Row>

                    <Row>
                        <MultiInputForm
                            label="Códigos de barra"
                            placeholder="Ej. 7791234567890"
                            addLabel="Añadir código"
                        />

                        <MultiInputForm
                            label="Etiquetas"
                            placeholder="Ej. oferta"
                            addLabel="Añadir etiqueta"
                        />
                    </Row>
                </SubcontainerForm>

                <SubcontainerForm title="Ventas">
                    <Row>
                        <InputForm label="Costo" type="number" placeholder="0.00" />
                        <InputForm
                            label="Precio de venta"
                            type="number"
                            placeholder="0.00"
                        />
                    </Row>
                    
                    <CheckboxForm label="Producto pesable" />
                </SubcontainerForm>



                <SubcontainerForm title="Promociones">
                    <PromotionsForm />
                </SubcontainerForm>

                <SubcontainerForm title="Stock" optional>
                    <Row>
                        <InputForm label="Cantidad" type="number" placeholder="0" />
                    </Row>

                    <CheckboxForm label="Alertas de stock activadas" />

                    <Row>
                        <InputForm label="Aviso" type="number" placeholder="0" />
                        <InputForm label="Bajo" type="number" placeholder="0" />
                        <InputForm label="Crítico" type="number" placeholder="0" />
                    </Row>
                </SubcontainerForm>

                <SubcontainerForm title="Vencimiento (lote)" optional>
                    <Row>
                        <InputForm label="Cantidad del lote" type="number" placeholder="0" />
                    </Row>

                    <Row>
                        <InputForm label="Vence el" type="date" />
                        <InputForm label="Recibido el" type="date" />
                    </Row>
                </SubcontainerForm>

                <ButtonForm className="mt-2">Guardar Producto</ButtonForm>
            </form>
        </ModalLayout>
    )
}
