import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/ApiError";

// 404 handler for unmatched routes
export const notFound = (req: Request, _res: Response, next: NextFunction) => {
    next(new ApiError(404, `route not found: ${req.method} ${req.originalUrl}`));
};

// Central error handler: the single place that formats error responses
export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ApiError) {
        res.status(error.status).json({ msg: error.message });
        return;
    }

    console.error(error);
    res.status(500).json({ msg: "unexpected server error" });
};
