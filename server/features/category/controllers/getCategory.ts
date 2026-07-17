import { Request, Response } from "express";

import { CategoryModel } from "../categoryModels";
import { ApiError } from "../../../helpers/ApiError";

// Get Category by id (only active)
export const getCategory = async (req: Request, res: Response) => {
    const category = await CategoryModel.findOne({ _id: req.params.id, active: true });
    if (!category) throw new ApiError(404, "category not found");

    res.status(200).json(category);
};
