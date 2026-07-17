import { CustomValidator } from "express-validator";

import { CategoryModel } from "./categoryModels";

// Fail if a category with the same name already exists in the given section
export const categoryExists: CustomValidator = async (name: string, { req }) => {
    const category = await CategoryModel.findOne({ section: req.body.section, name });
    if (category) throw new Error("category already exists in this section");

    return true;
};
