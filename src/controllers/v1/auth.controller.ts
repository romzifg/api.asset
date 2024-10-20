import { NextFunction, Request, Response } from 'express'
import prisma from '@/utils/prisma'
import bcrypt from 'bcrypt'
import { UserInterface, UserLoginInterface } from '@/interfaces/user.interface'
import { loginValidation } from '@/validation/user.validation'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body: UserLoginInterface = req.body
        const validate = loginValidation(body)
        if (validate.error) {
            res.statusCode = 422
            throw new Error(validate.error.details[0].message.replace("\"", "").replace("\"", ""))
        }

        const user: UserInterface | null = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: body.username },
                    { username: body.username }
                ]
            }
        })

        if (!user) {
            res.statusCode = 404
            throw new Error('User not found')
        }

        const compare = bcrypt.compare(body.password, user?.password ?? "")
        if (!compare) {
            res.statusCode = 401
            throw new Error('User is not match')
        }

        const token = jwt.sign({ user_id: user.id }, `${process.env.JWT_SECRET}`, {
            expiresIn: '2h'
        })

        return res.status(200).json({
            statusCode: 200,
            message: 'Success',
            data: token
        })
    } catch (e) {
        next(e)
    }
}