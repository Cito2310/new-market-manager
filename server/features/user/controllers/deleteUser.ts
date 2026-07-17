import { Request, Response } from "express";

import { UserModel } from "../userModels";

// Delete User - Need Token
export const deleteUser = async (req: Request, res: Response) => {
    await UserModel.findByIdAndDelete(req.user._id);
    res.status(204).end();
};
