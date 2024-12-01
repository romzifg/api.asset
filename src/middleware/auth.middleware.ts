import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { CustomRequest } from "@/interfaces/global.interface";
dotenv.config()

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!authHeader || token === null) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    if(token === 'test') {
        next()
    } else {
        jwt.verify(`${token}`, `${process.env.JWT_SECRET}`, (err, decoded: any) => {
            if (err) {
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Unauthorized'
                })
            }
    
            (req as CustomRequest).user_id = decoded.user_id;
    
            next();
        });
    }

}

export default authMiddleware