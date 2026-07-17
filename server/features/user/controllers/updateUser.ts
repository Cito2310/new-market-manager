import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { UserModel } from "../userModels";
import { UpdateUserBody, UserMongo } from "../userTypes";

// Update User - Need Token
export const updateUser = async (req: Request, res: Response) => {
    const { username, displayName, password } = req.body as UpdateUserBody;
    const { _id } = req.user;

    // build the update only with the provided fields
    const newData: Partial<UserMongo> = {};
    if (username) newData.username = username;
    if (displayName) newData.displayName = displayName;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        newData.passwordHash = bcryptjs.hashSync(password, salt);
    }

    await UserModel.findByIdAndUpdate(_id, newData);

    res.status(204).end();
};
