import { Request, Response } from "express";

import { ProductModel } from "../productModels";
import { ApiError } from "../../../helpers/ApiError";

// Delete Product (soft delete: deactivate)
export const deleteProduct = async (req: Request, res: Response) => {
    const updated = await ProductModel.findOneAndUpdate(
        { _id: req.params.id, active: true },
        { active: false, updatedBy: String(req.user._id) },
        { new: true }
    );
    if (!updated) throw new ApiError(404, "product not found");

    res.status(204).end();
};
