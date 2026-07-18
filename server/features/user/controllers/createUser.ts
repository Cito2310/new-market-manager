import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { UserModel } from "../userModels";
import { CreateUserBody } from "../../../../shared/types";
import { generatorJWT } from "../../../helpers/generatorJWT";

// Create User
export const createUser = async (req: Request, res: Response) => {
    const { username, displayName, password } = req.body as CreateUserBody;

    // hash the plain password into passwordHash
    const salt = bcryptjs.genSaltSync();
    const passwordHash = bcryptjs.hashSync(password, salt);

    // role and active come from the schema defaults
    const newUser = new UserModel({ username, displayName, passwordHash });
    await newUser.save();

    const token: string = await generatorJWT({ id: newUser._id });

    res.status(201).json({ user: newUser, token });
};
