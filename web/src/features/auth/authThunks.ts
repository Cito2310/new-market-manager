import type { LoginBody } from "../../../../shared/types";
import type { AppDispatch } from "../../app/store";
import { storage } from "../../app/storage";
import {
    loginStart,
    loginSuccess,
    loginFailure,
    logout as clearSession,
} from "./authSlice";

const API_URL = import.meta.env.VITE_API_URL;

// Authenticates against the API, persists the token, and updates the store.
export const login = (credentials: LoginBody) => {
    return async (dispatch: AppDispatch) => {
        dispatch(loginStart());
        try {
            const res = await fetch(`${API_URL}/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            if (!res.ok) throw new Error("login invalid");

            const { token } = (await res.json()) as { token: string };
            await storage.set("token", token);
            dispatch(loginSuccess({ token }));
        } catch (err) {
            const message = err instanceof Error ? err.message : "login failed";
            dispatch(loginFailure(message));
        }
    };
};

// Clears the persisted token and resets the session state.
export const logout = () => {
    return async (dispatch: AppDispatch) => {
        await storage.remove("token");
        dispatch(clearSession());
    };
};
