import { User } from "../../../shared/types";

// Persisted user shape. Mongoose owns `_id`, so it is dropped from the domain type.
export type UserMongo = Omit<User, "_id">;

// --- Request body types (DTOs) ---

// POST /register — password comes in plain text (the server hashes it into passwordHash).
// role/active are set by the server, so they are not part of the body.
export type CreateUserBody = Pick<User, "username" | "displayName"> & { password: string };

// PUT / — every field optional; only the provided ones are updated.
export type UpdateUserBody = Partial<CreateUserBody>;

// POST /login
export type LoginBody = Pick<CreateUserBody, "username" | "password">;

// PATCH /:id — admin-only management of another user
export type AdminUpdateUserBody = Partial<Pick<User, "role" | "active">>;