import { Request, Response } from "express";

import { CategoryModel } from "../categoryModels";
import { ApiError } from "../../../helpers/ApiError";

// Delete Category (soft delete: deactivate)
export const deleteCategory = async (req: Request, res: Response) => {
    const updated = await CategoryModel.findOneAndUpdate(
        { _id: req.params.id, active: true },
        { active: false, updatedBy: String(req.user._id) },
        { new: true }
    );
    if (!updated) throw new ApiError(404, "category not found");

    res.status(204).end();
};
