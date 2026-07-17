import jwt from "jsonwebtoken";

import { UserModel } from "../features/user/userModels";
import { ApiError } from "../helpers/ApiError";

import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export interface ITokenUser {
    id: Types.ObjectId;
}

export const validateJWT = async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.header("token");
    if (!token) throw new ApiError(401, "token needed");

    let payload: ITokenUser;
    try {
        payload = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY as string) as ITokenUser;
    } catch {
        throw new ApiError(401, "invalid token");
    }

    const user = await UserModel.findById(payload.id);
    if (!user) throw new ApiError(401, "invalid token");

    // deactivated users lose access immediately
    if (!user.active) throw new ApiError(403, "user is inactive");

    req.user = user;
    next();
};
