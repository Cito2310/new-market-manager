import { Request, Response } from "express";

import { CategoryModel } from "../categoryModels";
import { CategoryMongo, UpdateCategoryBody } from "../../../../shared/types";
import { ApiError } from "../../../helpers/ApiError";

// Update Category
export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { section, name, subcategories } = req.body as UpdateCategoryBody;

    // build the update only with the provided fields
    const newData: Partial<CategoryMongo> = { updatedBy: String(req.user._id) };
    if (section !== undefined) newData.section = section;
    if (name !== undefined) newData.name = name;
    if (subcategories !== undefined) newData.subcategories = subcategories;

    const updated = await CategoryModel.findOneAndUpdate({ _id: id, active: true }, newData, { new: true });
    if (!updated) throw new ApiError(404, "category not found");

    res.status(200).json(updated);
};
