import { CustomValidator } from "express-validator";

import { CategoryModel } from "./categoryModels";

// Fail if a category with the same name already exists in the given section
export const categoryExists: CustomValidator = async (name: string, { req }) => {
    const category = await CategoryModel.findOne({ section: req.body.section, name });
    if (category) throw new Error("category already exists in this section");

    return true;
};

// Fail if the resulting (section, name) collides with a different category.
// section/name fall back to the current values when not provided in the update.
export const categoryUpdatable: CustomValidator = async (_value, { req }) => {
    const id = req.params?.id;

    const current = await CategoryModel.findById(id);
    if (!current) return true; // the controller will answer 404

    const section = req.body.section ?? current.section;
    const name = req.body.name ?? current.name;

    const duplicate = await CategoryModel.findOne({ section, name, _id: { $ne: id } });
    if (duplicate) throw new Error("category already exists in this section");

    return true;
};
