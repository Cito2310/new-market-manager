import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import categoryReducer from "../../features/category/categorySlice";
import productReducer from "../../features/product/productSlice";
import posReducer from "../../features/pos/posSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        product: productReducer,
        pos: posReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
