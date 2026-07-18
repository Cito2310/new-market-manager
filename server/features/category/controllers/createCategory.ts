import { Request, Response } from "express";

import { CategoryModel } from "../categoryModels";
import { CreateCategoryBody } from "../../../../shared/types";

// Create Category
export const createCategory = async (req: Request, res: Response) => {
    const { section, name, subcategories, brands } = req.body as CreateCategoryBody;
    const userId = String(req.user._id);

    // subcategories/brands fall back to the schema defaults ([]) when omitted
    const category = new CategoryModel({
        section,
        name,
        subcategories,
        brands,
        createdBy: userId,
        updatedBy: userId,
    });
    await category.save();

    res.status(201).json(category);
};
