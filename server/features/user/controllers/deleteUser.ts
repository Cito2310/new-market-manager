import { Request, Response } from "express";

import { UserModel } from "../userModels";

// Delete User (soft delete: deactivate) - Need Token
export const deleteUser = async (req: Request, res: Response) => {
    await UserModel.findByIdAndUpdate(req.user._id, { active: false });
    res.status(204).end();
};
