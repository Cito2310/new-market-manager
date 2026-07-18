import { Request, Response } from "express";

import { ProductModel } from "../productModels";
import { UpdateProductBody } from "../../../../shared/types";
import { ApiError } from "../../../helpers/ApiError";

// Update Product (replaces the provided top-level blocks)
export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { details, sell, stock, expiry } = req.body as UpdateProductBody;

    // build the update only with the provided blocks
    const newData: UpdateProductBody & { updatedBy: string } = {
        updatedBy: String(req.user._id),
    };
    if (details !== undefined) newData.details = details;
    if (sell !== undefined) newData.sell = sell;
    if (stock !== undefined) newData.stock = stock;
    if (expiry !== undefined) newData.expiry = expiry;

    const updated = await ProductModel.findOneAndUpdate({ _id: id, active: true }, newData, { new: true });
    if (!updated) throw new ApiError(404, "product not found");

    res.status(200).json(updated);
};
