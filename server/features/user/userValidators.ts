import bcryptjs from "bcryptjs";
import { CustomValidator } from "express-validator";

import { UserModel } from "./userModels";

// Fail if the username is already taken
export const usernameExist: CustomValidator = async (value: string) => {
    const user = await UserModel.findOne({ username: value });
    if (user) throw new Error("username already exists");

    return true;
};

// Fail if the new password matches the current one
export const passwordEqual: CustomValidator = async (value: string, { req }) => {
    const samePassword = bcryptjs.compareSync(value, req.user.passwordHash);
    if (samePassword) throw new Error("password must be different from the current one");

    return true;
};

// Fail if the new username matches the current one
export const usernameEqual: CustomValidator = async (value: string, { req }) => {
    if (value === req.user.username) throw new Error("username must be different from the current one");

    return true;
};
