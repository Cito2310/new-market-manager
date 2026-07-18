import { Request, Response } from "express";

import { UserModel } from "../userModels";
import { AdminUpdateUserBody, UserMongo } from "../../../../shared/types";
import { ApiError } from "../../../helpers/ApiError";

// Update User role/active - Admin only
export const updateUserByAdmin = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role, active } = req.body as AdminUpdateUserBody;

    // self-protection: an admin cannot demote or deactivate themselves
    const isSelf = String(req.user._id) === id;
    if (isSelf && role !== undefined && role !== "admin") {
        throw new ApiError(400, "an admin cannot change their own role");
    }
    if (isSelf && active === false) {
        throw new ApiError(400, "an admin cannot deactivate themselves");
    }

    // build the update only with the provided fields
    const newData: Partial<UserMongo> = {};
    if (role !== undefined) newData.role = role;
    if (active !== undefined) newData.active = active;

    const updated = await UserModel.findByIdAndUpdate(id, newData, { new: true });
    if (!updated) throw new ApiError(404, "user not found");

    res.status(200).json(updated);
};
