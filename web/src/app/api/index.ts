import axios from "axios";
import { storage } from "../storage";

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
