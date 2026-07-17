import bcryptjs from "bcryptjs";
import { CustomValidator } from "express-validator";

import { User } from "../users_api/userModels";

// Fail if the username is already taken
export const usernameExist: CustomValidator = async (value: string) => {
    const user = await User.findOne({ username: value });
    if (user) throw new Error("username already exists");

    return true;
};

// Fail if the email is already taken
export const emailExist: CustomValidator = async (value: string) => {
    const user = await User.findOne({ email: value });
    if (user) throw new Error("email already exists");

    return true;
};

// Fail if the new email matches the current one
export const emailEqual: CustomValidator = async (value: string, { req }) => {
    if (value === req.user.email) throw new Error("email must be different from the current one");

    return true;
};

// Fail if the new password matches the current one
export const passwordEqual: CustomValidator = async (value: string, { req }) => {
    const samePassword = bcryptjs.compareSync(value, req.user.password);
    if (samePassword) throw new Error("password must be different from the current one");

    return true;
};

// Fail if the new username matches the current one
export const usernameEqual: CustomValidator = async (value: string, { req }) => {
    if (value === req.user.username) throw new Error("username must be different from the current one");

    return true;
};
