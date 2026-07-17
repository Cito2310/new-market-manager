import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { dbConnection } from "./database/config";
import { validateEnv } from "./config/env";

import { notFound, errorHandler } from "./middlewares/errorHandler";

import { routeUser } from "./features/users/userRoutes";
import { routeHealth } from "./features/health/healthRoutes";

export class Server {
    private app = express();
    private port = process.env.PORT || "8080";
    private paths = {
        health: "/api/health",
        user: "/api/user",
    };

    constructor() {
        validateEnv();
        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan("dev"));
    }

    private routes() {
        this.app.use(this.paths.health, routeHealth);
        this.app.use(this.paths.user, routeUser);

        // Error handling must be registered after the routes
        this.app.use(notFound);
        this.app.use(errorHandler);
    }

    public async listen() {
        await dbConnection();
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
