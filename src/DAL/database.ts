import mongoose from "mongoose";

export const connectToMongo = async (): Promise<void> => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGO NOT DEFINED!");
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MONGO CONNECTION SUCCESSFUL");
    } catch(error) {
        console.error("MONGO CONNECTION FAILED:", error);
        process.exit(1);
    }
}

