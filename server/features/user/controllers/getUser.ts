import { Request, Response } from "express";

// Get User - Need Token
export const getUser = (req: Request, res: Response) => {
    res.status(200).json(req.user);
};
