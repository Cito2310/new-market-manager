import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../shared/types";
import { ApiError } from "../helpers/ApiError";

// Requires the authenticated user to have one of the given roles.
// Must run after validateJWT (which sets req.user).
export const hasRole =
    (...roles: UserRole[]) =>
    (req: Request, _res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            throw new ApiError(403, "insufficient permissions");
        }

        next();
    };
