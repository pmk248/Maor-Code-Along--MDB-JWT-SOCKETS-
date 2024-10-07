import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware";
import userRoutes from "./routes/userRoutes";
import { connectToMongo } from "./DAL/database"

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();

// -- connect to mongo
connectToMongo();
// Middleware:

// -- body-parser:
app.use(express.json());

// -- error-handler:
//app.use(errorHandler);

// -- routes:
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    try {
        console.log('server listening on port: ' + PORT);
    } catch(error) {
        console.error(error);
    }
});
