import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
    mongoose.set("strictQuery", false);

    try {
        await mongoose.connect(process.env.MONGODB_CNN as string);
        console.log("Database online");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to start the database connection");
    }
};
