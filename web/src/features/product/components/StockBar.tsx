interface propsStockBar {
    lowStock: number
    currentStock: number
}

const dataStock = {
    goodStock: ["#79B26A", "#E3FCDD", "Alto"],
    lowStock: ["#d3d679", "#edf5be", "Bajo"],
    veryLowStock: ["#e49359", "#FFD9D6", "Muy bajo"],
    outStock: ["#FFD9D6", "#dd656f", "Sin Stock"],
}

export const StockBar = ({ currentStock, lowStock }: propsStockBar) => {
    const getStatusStock = () => {
        const resultStock = currentStock / lowStock
        const statusStock = resultStock === 0 ? "outStock"
                            : resultStock <= 0.5 ? "veryLowStock"
                            : resultStock <= 1 ? "lowStock"
                            : "goodStock"

        return {
            bgColor: dataStock[statusStock][1],
            barColor: dataStock[statusStock][0],
            text: dataStock[statusStock][2],
            percentage: resultStock / 2 * 100 > 100 ? 100 : resultStock / 2 * 100
        }
    }

    const status = getStatusStock()

    return <td className="py-3">
        <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{currentStock} - {status.text}</p>
            <div style={{ backgroundColor: status.bgColor }} className="h-2 w-full rounded-lg">
                <div
                    style={{ backgroundColor: status.barColor, width: `${status.percentage}%` }}
                    className="h-full rounded-lg transition-all"
                />
            </div>
        </div>
    </td>
}
