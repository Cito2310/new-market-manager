import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product, Promotion } from "../../../../shared/types";
import { getProductName } from "../product/helpers/productName";

type PosStatus = "idle" | "charging" | "error";

// A line snapshots what the cashier saw when the product was added: prices edited
// afterwards must not change a sale that is already in progress.
export interface SaleLine {
    productId: string;
    name: string;
    unitPrice: number;
    quantity: number;
    weighable: boolean;
    promotions: Promotion[];
}

// One sale in progress. Totals are never stored here: they are derived by selectors.
export interface SaleTab {
    id: string;
    lines: SaleLine[];
    discountPercent: number;
    surchargePercent: number;
    cashReceived: number | null;
}

interface PosState {
    tabs: SaleTab[];
    activeTabId: string;
    status: PosStatus;
    error: string | null;
}

const createTab = (id: string): SaleTab => ({
    id,
    lines: [],
    discountPercent: 0,
    surchargePercent: 0,
    cashReceived: null,
});

const findActiveTab = (state: PosState) =>
    state.tabs.find((tab) => tab.id === state.activeTabId);

const firstTab = createTab(nanoid());

const initialState: PosState = {
    tabs: [firstTab],
    activeTabId: firstTab.id,
    status: "idle",
    error: null,
};

export const posSlice = createSlice({
    name: "pos",
    initialState,
    reducers: {
        // Rehydrates sales left open before a reload. Ignores an empty payload so a
        // corrupted or cleared storage never leaves the POS without a tab.
        restoreTabs: (state, action: PayloadAction<SaleTab[]>) => {
            if (action.payload.length === 0) return;
            state.tabs = action.payload;
            state.activeTabId = action.payload[0].id;
        },
        openTab: {
            reducer: (state, action: PayloadAction<string>) => {
                state.tabs.push(createTab(action.payload));
                state.activeTabId = action.payload;
            },
            prepare: () => ({ payload: nanoid() }),
        },
        // Closing the last remaining tab empties it instead: the POS always has one.
        closeTab: {
            reducer: (
                state,
                action: PayloadAction<{ tabId: string; replacementId: string }>,
            ) => {
                const { tabId, replacementId } = action.payload;
                const index = state.tabs.findIndex((tab) => tab.id === tabId);
                if (index === -1) return;

                if (state.tabs.length === 1) {
                    state.tabs = [createTab(replacementId)];
                    state.activeTabId = replacementId;
                    return;
                }

                state.tabs.splice(index, 1);
                if (state.activeTabId !== tabId) return;
                // Activate the neighbour that took its place, or the new last one.
                state.activeTabId = state.tabs[Math.min(index, state.tabs.length - 1)].id;
            },
            prepare: (tabId: string) => ({ payload: { tabId, replacementId: nanoid() } }),
        },
        selectTab: (state, action: PayloadAction<string>) => {
            if (state.tabs.some((tab) => tab.id === action.payload)) {
                state.activeTabId = action.payload;
            }
        },
        // Scanning a product already in the sale adds to its quantity.
        addProduct: (
            state,
            action: PayloadAction<{ product: Product; quantity?: number }>,
        ) => {
            const tab = findActiveTab(state);
            if (!tab) return;

            const { product, quantity = 1 } = action.payload;
            const line = tab.lines.find((item) => item.productId === product._id);

            if (line) {
                line.quantity += quantity;
                return;
            }

            tab.lines.push({
                productId: product._id,
                name: getProductName(product),
                unitPrice: product.sell.salePrice,
                quantity,
                weighable: product.sell.weighable,
                promotions: product.sell.promotions,
            });
        },
        // Setting a quantity of zero or less removes the line.
        setLineQuantity: (
            state,
            action: PayloadAction<{ productId: string; quantity: number }>,
        ) => {
            const tab = findActiveTab(state);
            if (!tab) return;

            const { productId, quantity } = action.payload;
            if (quantity <= 0) {
                tab.lines = tab.lines.filter((line) => line.productId !== productId);
                return;
            }

            const line = tab.lines.find((item) => item.productId === productId);
            if (line) line.quantity = quantity;
        },
        removeLine: (state, action: PayloadAction<string>) => {
            const tab = findActiveTab(state);
            if (!tab) return;
            tab.lines = tab.lines.filter((line) => line.productId !== action.payload);
        },
        setDiscountPercent: (state, action: PayloadAction<number>) => {
            const tab = findActiveTab(state);
            if (tab) tab.discountPercent = action.payload;
        },
        setSurchargePercent: (state, action: PayloadAction<number>) => {
            const tab = findActiveTab(state);
            if (tab) tab.surchargePercent = action.payload;
        },
        setCashReceived: (state, action: PayloadAction<number | null>) => {
            const tab = findActiveTab(state);
            if (tab) tab.cashReceived = action.payload;
        },
        // Empties the active sale (F7) without closing its tab.
        clearActiveTab: (state) => {
            const tab = findActiveTab(state);
            if (!tab) return;
            tab.lines = [];
            tab.discountPercent = 0;
            tab.surchargePercent = 0;
            tab.cashReceived = null;
        },
        chargeStart: (state) => {
            state.status = "charging";
            state.error = null;
        },
        // The sale is registered: its tab is emptied and ready for the next customer.
        chargeSuccess: (state) => {
            state.status = "idle";
            state.error = null;
            const tab = findActiveTab(state);
            if (!tab) return;
            tab.lines = [];
            tab.discountPercent = 0;
            tab.surchargePercent = 0;
            tab.cashReceived = null;
        },
        chargeFailure: (state, action: PayloadAction<string>) => {
            state.status = "error";
            state.error = action.payload;
        },
    },
});

export const {
    restoreTabs,
    openTab,
    closeTab,
    selectTab,
    addProduct,
    setLineQuantity,
    removeLine,
    setDiscountPercent,
    setSurchargePercent,
    setCashReceived,
    clearActiveTab,
    chargeStart,
    chargeSuccess,
    chargeFailure,
} = posSlice.actions;

export default posSlice.reducer;
