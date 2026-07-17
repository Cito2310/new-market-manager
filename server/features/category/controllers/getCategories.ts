import { Request, Response } from "express";

import { CategoryModel } from "../categoryModels";

// List Categories (only active)
export const getCategories = async (_req: Request, res: Response) => {
    const categories = await CategoryModel.find({ active: true });
    res.status(200).json(categories);
};
