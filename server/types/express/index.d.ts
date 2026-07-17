import type { UserDocument } from "../../features/user/userModels";

declare module "express-serve-static-core" {
    interface Request {
        user: UserDocument;
    }
}
