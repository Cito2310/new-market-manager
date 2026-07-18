import { HydratedDocument, model, Schema } from "mongoose";
import { UserMongo } from "../../../shared/types";

// Hydrated Mongoose document for a user (what queries return, what req.user holds)
export type UserDocument = HydratedDocument<UserMongo>;

const userSchema = new Schema<UserMongo>({
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["cashier", "admin", "visit"], default: "visit" },
    displayName: { type: String, required: true },
    active: { type: Boolean, default: true },
});

userSchema.methods.toJSON = function () {
    const { __v, passwordHash, ...rest } = this.toObject();
    return rest;
};

export const UserModel = model("User", userSchema);
