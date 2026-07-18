// Contract for any persistence backend (localStorage now, an Electron JSON file later).
// Async on purpose: file/IPC access is async, so call sites never change on migration.
export interface StorageAdapter {
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
}
