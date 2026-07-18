import axios from "axios";
import type { LoginBody, LoginResponse } from "../../../../shared/types";
import type { AppDispatch } from "../../app/store";
import { api } from "../../app/api";
import { storage } from "../../app/storage";
import {
    loginStart,
    loginSuccess,
    loginFailure,
    logout as clearSession,
} from "./authSlice";

// Authenticates against the API, persists the session, and updates the store.
export const login = (credentials: LoginBody) => {
    return async (dispatch: AppDispatch) => {
        dispatch(loginStart());
        try {
            const { data } = await api.post<LoginResponse>(
                "/user/login",
                credentials,
            );

            await storage.set("token", data.token);
            await storage.set("user", data.user);
            dispatch(loginSuccess(data));
        } catch (err) {
            const message = axios.isAxiosError(err)
                ? (err.response?.data?.msg ?? err.message)
                : "login failed";
            dispatch(loginFailure(message));
        }
    };
};

// Clears the persisted session and resets the store.
export const logout = () => {
    return async (dispatch: AppDispatch) => {
        await storage.remove("token");
        await storage.remove("user");
        dispatch(clearSession());
    };
};
