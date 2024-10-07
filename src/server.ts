import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorMiddleware";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();
// Middleware:

// -- body-parser:
app.use(express.json());

// -- error-handler:
app.use(errorHandler);

// -- routes:
app.use('api/users', userRoutes);

// -- connect to mongo
mongoose.connect(process.env.MONGODB_URI as string)
.then(() => console.log("connected to mongo"))
.catch((error) => console.error(error));


app.listen(PORT, () => {
    try {
        console.log('server listening on port: ' + PORT);
    } catch(error) {
        console.error(error);
    }
});
