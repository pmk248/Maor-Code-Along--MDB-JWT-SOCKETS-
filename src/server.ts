import express from "express";
import { connectToMongo } from "./DAL/database";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();
// Middleware:

// -- body-parser:
app.use(express.json());

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
