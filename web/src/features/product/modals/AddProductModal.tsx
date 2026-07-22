import { InputForm } from "../../../shared/components/InputForm"
import { SelectForm } from "../../../shared/components/SelectForm"
import { CheckboxForm } from "../../../shared/components/CheckboxForm"
import { MultiInputForm } from "../../../shared/components/MultiInputForm"
import { ButtonForm } from "../../../shared/components/ButtonForm"
import { ModalLayout } from "../../../shared/components/ModalLayout"
import { SIZE_UNITS } from "../../../../../shared/types"

// Section heading used to group the product form fields (visual only for now).
const SectionTitle = ({ children }: { children: string }) => (
    <h3 className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {children}
    </h3>
);

// Static "add product" form: shows every field of the Product model. No logic yet.
export const AddProductModal = () => {
    return (
        <ModalLayout width="max-w-[800px]" title="Añadir Producto" onClose={() => {}}>
            <form className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
                <SectionTitle>Detalles</SectionTitle>

                <div className="flex gap-4 w-full">
                    <InputForm label="Categoría" type="text" placeholder="Ej. Bebidas" />
                    <InputForm label="Subcategoría" type="text" placeholder="Ej. Gaseosas" />
                    <InputForm label="Marca" type="text" placeholder="Ej. Coca-Cola" />
                </div>

                <div className="flex gap-4 w-full">
                    <InputForm label="Nombre" type="text" placeholder="Ej. Coca-Cola" />
                    <InputForm label="Tamaño" type="number" placeholder="0" />
                    <SelectForm
                        label="Unidad"
                        options={SIZE_UNITS}
                        defaultValue="unit"
                    />
                </div>
                
                <div className="flex gap-4 w-full">
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
                </div>

                <SectionTitle>Venta</SectionTitle>

                <div className="flex gap-3">
                    <div className="flex-1">
                        <InputForm label="Costo" type="number" placeholder="0.00" />
                    </div>
                    <div className="flex-1">
                        <InputForm
                            label="Precio de venta"
                            type="number"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <CheckboxForm label="Producto pesable" />

                <SectionTitle>Promoción</SectionTitle>

                <div className="flex gap-3">
                    <div className="flex-1">
                        <InputForm
                            label="Cantidad mínima"
                            type="number"
                            placeholder="0"
                        />
                    </div>
                    <div className="flex-1">
                        <InputForm
                            label="Precio por unidad"
                            type="number"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <SectionTitle>Stock</SectionTitle>

                <InputForm label="Cantidad" type="number" placeholder="0" />

                <CheckboxForm label="Alertas de stock activadas" />

                <div className="flex gap-3">
                    <div className="flex-1">
                        <InputForm label="Aviso" type="number" placeholder="0" />
                    </div>
                    <div className="flex-1">
                        <InputForm label="Bajo" type="number" placeholder="0" />
                    </div>
                    <div className="flex-1">
                        <InputForm label="Crítico" type="number" placeholder="0" />
                    </div>
                </div>

                <SectionTitle>Vencimiento (lote)</SectionTitle>

                <InputForm label="Cantidad del lote" type="number" placeholder="0" />

                <div className="flex gap-3">
                    <div className="flex-1">
                        <InputForm label="Vence el" type="date" />
                    </div>
                    <div className="flex-1">
                        <InputForm label="Recibido el" type="date" />
                    </div>
                </div>

                <ButtonForm className="mt-2">Guardar Producto</ButtonForm>
            </form>
        </ModalLayout>
    )
}
