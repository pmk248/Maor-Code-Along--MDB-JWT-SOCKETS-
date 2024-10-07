import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import dotenv from "dotenv";

dotenv.config();

export class CustomError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode
    }
}

export function errorHandler() {}