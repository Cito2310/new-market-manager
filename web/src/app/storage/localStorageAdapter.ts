import type { StorageAdapter } from "./storage.types";

// Browser implementation. Values are JSON-serialized so any shape can be stored.
export const localStorageAdapter: StorageAdapter = {
    get: async <T>(key: string): Promise<T | null> => {
        const raw = localStorage.getItem(key);
        return raw === null ? null : (JSON.parse(raw) as T);
    },
    set: async <T>(key: string, value: T): Promise<void> => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove: async (key: string): Promise<void> => {
        localStorage.removeItem(key);
    },
};
