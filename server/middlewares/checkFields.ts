import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const checkFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const details = errors.array().map((error) => ({
            field: error.type === "field" ? error.path : "",
            msg: error.msg,
        }));
        res.status(400).json({ msg: "validation error", errors: details });
        return;
    }

    next();
};
