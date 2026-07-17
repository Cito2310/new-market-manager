import { NextFunction, Request, Response } from "express";

// 404 handler for unmatched routes
export const notFound = (req: Request, res: Response) => {
    res.status(404).json({ msg: `1404 - route not found: ${req.method} ${req.originalUrl}` });
};

// Central error handler: last middleware in the chain
export const errorHandler = (
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(error);
    res.status(500).json({ msg: "1500 - unexpected server error" });
};
