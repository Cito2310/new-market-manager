import jwt from "jsonwebtoken";

import { User } from "../features/users/userModels";

import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export interface ITokenUser {
    id: Types.ObjectId;
}

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("token");

    if (!token) {
        res.status(401).json([{ msg: "0013 - token needed" }]);
        return;
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY as string) as ITokenUser;

        // search user with id
        const user = await User.findById(id);

        // check user exist
        if (!user) {
            res.status(401).json([{ msg: "0012 - invalid token" }]);
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json([{ msg: "0012 - invalid token" }]);
    }
};
