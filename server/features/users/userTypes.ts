import { User } from "../../../shared/types";

// Persisted user shape. Mongoose owns `_id`, so it is dropped from the domain type.
// This is the target type for the schema; the controllers/validators migration comes later.
export type UserMongo = Omit<User, "_id">;
