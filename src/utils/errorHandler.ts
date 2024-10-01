import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'
dotenv.config()

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode >= 400 ? res.statusCode : 500
    res.status(statusCode)

    const responseBody = {
        statusCode: statusCode,
        message: err.message,
        stack: process.env.APP_NODE_ENV === 'production' ? 'ERR' : err.stack
    }

    console.log('Error', responseBody)
    return res.json(responseBody)
}