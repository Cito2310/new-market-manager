export type UserRole = "cashier" | "admin" | "visit";

export interface User {
    _id: string;
    username: string;
    passwordHash: string;
    role: UserRole;
    displayName: string;
    active: boolean;
}


// --- Persistence & request body types (DTOs) ---

// Persisted user shape. Mongoose owns `_id`, so it is dropped from the domain type.
export type UserMongo = Omit<User, "_id">;

// User shape safe to send to the client (never includes passwordHash).
export type PublicUser = Omit<User, "passwordHash">;

// POST /login response
export interface LoginResponse {
    token: string;
    user: PublicUser;
}

// POST /register — password comes in plain text (the server hashes it into passwordHash).
// role/active are set by the server, so they are not part of the body.
export type CreateUserBody = Pick<User, "username" | "displayName"> & { password: string };

// PUT / — every field optional; only the provided ones are updated.
export type UpdateUserBody = Partial<CreateUserBody>;

// POST /login
export type LoginBody = Pick<CreateUserBody, "username" | "password">;

// PATCH /:id — admin-only management of another user
export type AdminUpdateUserBody = Partial<Pick<User, "role" | "active">>;