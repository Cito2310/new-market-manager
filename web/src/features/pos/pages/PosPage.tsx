import { useAppDispatch, useAppSelector } from "../../../app/store/hooks"
import {
    addProduct,
    closeTab,
    openTab,
    removeLine,
    selectTab,
    setLineQuantity,
} from "../posSlice"
import { SaleDetail } from "../components/SaleDetail"
import { SaleSidebar } from "../components/SaleSidebar"
import { SaleTabs } from "../components/SaleTabs"
import { tabTotal } from "../helpers/saleTotals"

export const PosPage = () => {
    const dispatch = useAppDispatch()
    const products = useAppSelector((state) => state.product.items)
    const { tabs, activeTabId } = useAppSelector((state) => state.pos)

    const activeTab = tabs.find((tab) => tab.id === activeTabId)
    const lines = activeTab?.lines ?? []

    // Temporary: stands in for the barcode scanner until F1 - Buscar exists.
    const addRandomProduct = () => {
        if (products.length === 0) return
        const product = products[Math.floor(Math.random() * 10)]
        dispatch(addProduct({ product }))
    }

    return (
        <div className="flex h-full gap-4 p-4 pr-0">
            {/* PRODUCTS */}
            <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-white pb-6 shadow-xl">
                <SaleTabs
                    tabs={tabs}
                    activeTabId={activeTabId}
                    onSelect={(tabId) => dispatch(selectTab(tabId))}
                    onClose={(tabId) => dispatch(closeTab(tabId))}
                    onOpen={() => dispatch(openTab())}
                />

                <SaleDetail
                    lines={lines}
                    total={activeTab ? tabTotal(activeTab) : 0}
                    onRemove={(productId) => dispatch(removeLine(productId))}
                    onQuantityChange={(productId, quantity) =>
                        dispatch(setLineQuantity({ productId, quantity }))
                    }
                />
            </div>

            <SaleSidebar onDebugAdd={addRandomProduct} />
        </div>
    )
}
