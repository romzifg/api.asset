import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'
dotenv.config()

export const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers["authorization"]) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Api Token Not Found'
        })
    }

    if (req.headers["authorization"] !== process.env.API_TOKEN) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Api Token Not Found'
        })
    }

    next()
}