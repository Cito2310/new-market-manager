import { Request, Response } from "express";

import { ProductModel } from "../productModels";
import { CreateProductBody } from "../productTypes";

// Create Product
export const createProduct = async (req: Request, res: Response) => {
    const { details, sell, stock, expiry } = req.body as CreateProductBody;
    const userId = String(req.user._id);

    // stock/expiry fall back to undefined when omitted
    const product = new ProductModel({
        details,
        sell,
        stock,
        expiry,
        createdBy: userId,
        updatedBy: userId,
    });
    await product.save();

    res.status(201).json(product);
};
