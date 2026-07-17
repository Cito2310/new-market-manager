import * as dotenv from "dotenv";
dotenv.config();

import { Server } from "./server";

const server = new Server();

server.listen().catch((error) => {
    console.error(error);
    process.exit(1);
});
