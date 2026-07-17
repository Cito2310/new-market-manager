export type UserRole = "cashier" | "admin" | "visit";

export interface User {
    _id: string;
    username: string;
    passwordHash: string;
    role: UserRole;
    displayName: string;
    active: boolean;
}