import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { UserModel } from "../userModels";
import { LoginBody } from "../userTypes";
import { generatorJWT } from "../../../helpers/generatorJWT";
import { ApiError } from "../../../helpers/ApiError";

// Login User
export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body as LoginBody;

    const user = await UserModel.findOne({ username });
    if (!user) throw new ApiError(400, "login invalid");

    const samePassword = bcryptjs.compareSync(password, user.passwordHash);
    if (!samePassword) throw new ApiError(400, "login invalid");

    // deactivated users cannot obtain a token
    if (!user.active) throw new ApiError(403, "user is inactive");

    const token: string = await generatorJWT({ id: user._id });
    res.status(200).json({ token });
};
