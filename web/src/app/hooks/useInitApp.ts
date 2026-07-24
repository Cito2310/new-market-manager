import { useEffect } from "react";
import axios from "axios";
import type { PublicUser } from "../../../../shared/types";
import { useAppDispatch } from "../store/hooks";
import {
    restoreSession,
    initFinished,
    logout as clearSession,
} from "../../features/auth/authSlice";
import { storage } from "../storage";
import { getProducts } from "../../features/product/productApi";
import { fetchSuccess as productsLoaded } from "../../features/product/productSlice";

// Runs the app-wide initialization logic (restore session, fetch config, etc.).
export const useInitApp = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const init = async () => {
            const token = await storage.get<string>("token");
            const user = await storage.get<PublicUser>("user");

            if (!token || !user) {
                dispatch(initFinished());
                return;
            }

            // Validate the persisted token against the backend before trusting it.
            // The same call preloads the product catalog into the store.
            try {
                const products = await getProducts();
                dispatch(restoreSession({ token, user }));
                dispatch(productsLoaded(products));
            } catch (err) {
                // Token expired / invalid: drop the session and send the user to login.
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    await storage.remove("token");
                    await storage.remove("user");
                    dispatch(clearSession());
                    return;
                }
                // Transient failure (server down / network): keep the session.
                dispatch(restoreSession({ token, user }));
            }
        };

        init();
    }, [dispatch]);
};
