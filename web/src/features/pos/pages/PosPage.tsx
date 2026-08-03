import { Button } from "../../../shared/components/Button"
import { XIcon } from "../../../shared/components/icons/XIcon"

export const PosPage = () => {
    return (
        <div className="flex h-full gap-4 p-4 pr-0">
            {/* PRODUCTS */}
            <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-white pb-6 shadow-xl">
                {/* SALE TABS */}
                <div className="flex items-end gap-2 border-b border-slate-200">
                    <Button variant="tab-active" className="text-sm font-semibold">
                        Venta 1 - $42.200
                    </Button>
                    <Button variant="tab" className="text-sm">
                        Venta 2 - $0
                    </Button>
                    <Button variant="ghost" square aria-label="Nueva venta" className="font-semibold">
                        +
                    </Button>
                </div>

                <div className="flex flex-1 flex-col">
                    <div className="min-h-0 flex-1 overflow-y-auto">
                        <table className="w-full table-fixed text-left">
                            <thead>
                                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <th className="pb-3 pl-6">Producto</th>
                                    <th className="w-32 pb-3 text-center">Precio</th>
                                    <th className="w-24 pb-3 text-center">Cantidad</th>
                                    <th className="w-28 pb-3 text-right">Importe</th>
                                    <th className="w-20 pb-3 pr-6"></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="border-b border-slate-100 text-slate-700 transition even:bg-slate-50 hover:bg-slate-100">
                                    <td className="py-3 pl-6 font-medium capitalize text-slate-800">Coca-Cola 2.25 L</td>
                                    <td className="py-3 text-center">$2.850</td>
                                    <td className="py-3 text-center font-medium">6</td>
                                    <td className="py-3 text-right font-medium text-slate-800">$17.100</td>
                                    <td className="py-3 pr-6">
                                        <Button variant="ghost" square aria-label="Quitar producto" className="ml-auto hover:text-red-600">
                                            <XIcon />
                                        </Button>
                                    </td>
                                </tr>

                                <tr className="border-b border-slate-100 text-slate-700 transition even:bg-slate-50 hover:bg-slate-100">
                                    <td className="py-3 pl-6 font-medium capitalize text-slate-800">Pan Lactal Bimbo 400 g</td>
                                    <td className="py-3 text-center">$2.920</td>
                                    <td className="py-3 text-center font-medium">5</td>
                                    <td className="py-3 text-right font-medium text-slate-800">$14.600</td>
                                    <td className="py-3 pr-6">
                                        <Button variant="ghost" square aria-label="Quitar producto" className="ml-auto hover:text-red-600">
                                            <XIcon />
                                        </Button>
                                    </td>
                                </tr>

                                <tr className="border-b border-slate-100 text-slate-700 transition even:bg-slate-50 hover:bg-slate-100">
                                    <td className="py-3 pl-6 font-medium capitalize text-slate-800">Leche La Serenísima 1 L</td>
                                    <td className="py-3 text-center">$1.750</td>
                                    <td className="py-3 text-center font-medium">6</td>
                                    <td className="py-3 text-right font-medium text-slate-800">$10.500</td>
                                    <td className="py-3 pr-6">
                                        <Button variant="ghost" square aria-label="Quitar producto" className="ml-auto hover:text-red-600">
                                            <XIcon />
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-baseline justify-between border-t-2 border-slate-300 px-6 pt-4">
                        <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                            Total
                        </span>
                        <span className="text-3xl font-bold text-slate-600">$42.200</span>
                    </div>
                </div>
            </div>

            {/* SIDEBAR */}
            <div className="flex w-72 flex-col justify-between rounded-l-2xl bg-white p-4 shadow-xl">
                <div className="grid grid-cols-2 gap-2">
                    <Button variant="secondary" className="px-2! text-sm">
                        F1 - Buscar
                    </Button>
                    <Button variant="secondary" className="px-2! text-sm">
                        F3 - Cantidad
                    </Button>
                    <Button variant="secondary" className="px-2! text-sm">
                        F4 - Descuento
                    </Button>
                    <Button variant="secondary" className="px-2! text-sm">
                        F5 - Recargo
                    </Button>
                    <Button variant="secondary" className="px-2! text-sm">
                        F6 - Caja
                    </Button>
                    <Button variant="secondary" className="px-2! text-sm">
                        F8 - Tickets
                    </Button>
                    <Button variant="danger-soft" className="col-span-2 text-sm">
                        F7 - Cancelar Venta
                    </Button>
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
        </div>
    )
}
