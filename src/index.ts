import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';
import morgan from 'morgan'
import cors from 'cors'
import cookieParse from 'cookie-parser'
import path from 'path'
import helmet from 'helmet'
import {rateLimit} from 'express-rate-limit'
import { notFound, errorHandler } from './utils/errorHandler';
import apiv1 from '@/routes/v1'
import dotenv from 'dotenv'
dotenv.config()

export const prisma = new PrismaClient()

async function main() {
    const app = express()
    app.use(express.json())

    const limiter = rateLimit({
        windowMs: 10 * 60 * 1000,
        limit: 100,
        standardHeaders: 'draft-7',
        legacyHeaders: false,
    })

    // Middleware
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParse())
    app.use(morgan(`${process.env.API_TYPE}`))
    app.use(cors({
        origin: `${process.env.APP_NODE_URL}`
    }))
    app.use(helmet())
    app.use(limiter)

    const dir = path.join(__dirname, 'public');
    app.use('/public', express.static(dir));

    app.use('/api/v1', apiv1)

    app.use(notFound);
    app.use(errorHandler);

    app.all("*", (req: Request, res: Response) => {
        res.status(404).json({ error: `Route ${req.originalUrl} not found` });
    });
    
    app.listen(process.env.API_PORT, () => {
        console.log(`Running on port ${process.env.API_PORT}`)
    })
}

main()
    .then(async () => {
        await prisma.$connect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
