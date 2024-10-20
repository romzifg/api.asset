import { Request } from "express";
import { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends Request {
    user_id: string | number | JwtPayload;
}