export type UserRole = "cashier" | "admin";

export interface User {
    _id: string;
    username: string;
    passwordHash: string;
    role: UserRole;
    displayName: string;
    active: boolean;
}