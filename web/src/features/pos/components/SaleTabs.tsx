import { Button } from "../../../shared/components/Button"
import { TabItem } from "./TabItem"
import type { SaleTab } from "../posSlice"

interface SaleTabsProps {
    tabs: SaleTab[]
    activeTabId: string
    onSelect: (tabId: string) => void
    onClose: (tabId: string) => void
    onOpen: () => void
}

// The strip of parallel sales sitting on top of the lines table.
export const SaleTabs = ({
    tabs,
    activeTabId,
    onSelect,
    onClose,
    onOpen,
}: SaleTabsProps) => {
    return (
        <div className="flex items-end gap-2 border-b border-slate-200">
            {tabs.map((tab, index) => (
                <TabItem
                    key={tab.id}
                    tab={tab}
                    index={index}
                    isActive={tab.id === activeTabId}
                    closable={tabs.length > 1}
                    onSelect={onSelect}
                    onClose={onClose}
                />
            ))}

            <Button
                variant="ghost"
                square
                aria-label="Nueva venta"
                className="font-semibold"
                onClick={onOpen}
            >
                +
            </Button>
        </div>
    )
}
