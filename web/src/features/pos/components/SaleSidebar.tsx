import { Button } from "../../../shared/components/Button"
import { HandIcon } from "../../../shared/components/icons/HandIcon"

interface SaleSidebarProps {
    onDebugAdd: () => void
}

// Scanner input, keyboard shortcuts and the payment panel, pinned to the right wall.
export const SaleSidebar = ({ onDebugAdd }: SaleSidebarProps) => {
    return (
        <div className="flex w-72 flex-col justify-between rounded-l-2xl bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-3">
                {/* SCANNER INPUT — styling only, not wired yet. */}
                <div className="flex overflow-hidden rounded-md ring-1 ring-slate-300 transition focus-within:ring-2 focus-within:ring-slate-800">
                    <input
                        value={254051}
                        readOnly
                        placeholder="Código de barras…"
                        className="text-sm min-w-0 flex-1 px-3 py-2 tracking-wide text-slate-800 outline-none placeholder:tracking-normal placeholder:text-slate-400"
                    />
                    <Button
                        variant="ghost"
                        aria-label="Ingresar código a mano"
                        className="rounded-none! border-l border-slate-300 px-3!"
                    >
                        <HandIcon />
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button variant="secondary" className="px-1.5! text-sm">
                        F1 - Buscar
                    </Button>
                    <Button variant="secondary" className="px-1.5! text-sm">
                        F3 - Cantidad
                    </Button>
                    <Button variant="secondary" className="px-1.5! text-sm">
                        F4 - Descuento
                    </Button>
                    <Button variant="secondary" className="px-1.5! text-sm">
                        F5 - Recargo
                    </Button>
                    <Button variant="secondary" className="px-1.5! text-sm">
                        F6 - Caja
                    </Button>
                    <Button variant="secondary" className="px-1.5! text-sm">
                        F8 - Tickets
                    </Button>
                    {/* TODO: remove once the barcode scanner input is wired. */}
                    <Button
                        variant="secondary"
                        className="col-span-2 text-sm"
                        onClick={onDebugAdd}
                    >
                        Debug - Producto al azar
                    </Button>
                    <Button variant="danger-soft" className="col-span-2 text-sm">
                        F7 - Cancelar Venta
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <input
                    placeholder="Efectivo recibido"
                    className="w-full rounded-md px-3 py-2 text-right text-lg font-semibold text-slate-800 ring-1 ring-slate-300 outline-none transition placeholder:text-base placeholder:font-normal placeholder:text-slate-400 focus:ring-2 focus:ring-slate-800"
                />
                <p className="flex items-baseline justify-between text-sm text-slate-500">
                    Vuelto: <span className="text-xl font-bold text-slate-800">$0</span>
                </p>
                <Button variant="success" className="p-3! text-base font-semibold">
                    F2 - Cobrar
                </Button>
            </div>
        </div>
    )
}
