import { CustomValidator } from "express-validator";

import { ProductModel } from "./productModels";

// Fail if any of the given barcodes is already used by another active product.
// On update (:id present) the product being edited is excluded.
export const barcodesAvailable: CustomValidator = async (barcodes, { req }) => {
    if (!Array.isArray(barcodes) || barcodes.length === 0) return true;

    const query = ProductModel.findOne({
        "details.barcodes": { $in: barcodes as string[] },
        active: true,
    });

    const id = req.params?.id;
    if (id) query.where("_id").ne(id);

    const existing = await query;
    if (existing) throw new Error("one or more barcodes are already in use");

    return true;
};
