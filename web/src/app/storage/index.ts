import { localStorageAdapter } from "./localStorageAdapter";

// Single swap point: change this line to migrate the whole app (e.g. electronAdapter).
export const storage = localStorageAdapter;
