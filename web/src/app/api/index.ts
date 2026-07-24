import axios from "axios";
import { storage } from "../storage";
import { store } from "../store";
import { logout as clearSession } from "../../features/auth/authSlice";

// Central HTTP client. Base URL comes from the environment (VITE_API_URL).
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Attach the persisted auth token (header "token") to every request.
api.interceptors.request.use(async (config) => {
    const token = await storage.get<string>("token");
    if (token) config.headers.token = token;
    return config;
});

// Drop the session on any 401 (expired / invalid token) so guards send the user to login.
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            await storage.remove("token");
            await storage.remove("user");
            store.dispatch(clearSession());
        }
        return Promise.reject(error);
    },
);
