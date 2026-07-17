import { Router, Request, Response } from "express";

export const routeHealth = Router();

routeHealth.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
});
