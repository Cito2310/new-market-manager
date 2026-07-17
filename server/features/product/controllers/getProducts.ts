import { Request, Response } from "express";

import { ProductModel } from "../productModels";

// List Products (only active)
export const getProducts = async (_req: Request, res: Response) => {
    const products = await ProductModel.find({ active: true });
    res.status(200).json(products);
};
