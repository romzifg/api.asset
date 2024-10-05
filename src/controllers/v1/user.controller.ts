import { NextFunction, Request, Response } from 'express'
import prisma from '@/utils/prisma'
import bcrypt from 'bcrypt'
import { createUserValidation } from '@/validation/user.validation'
import { UserInputInterface, UserInterface } from '@/interfaces/user.interface'

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findMany()

        return res.status(200).json({
            statusCode: 200,
            message: 'Success',
            data: user
        })
    } catch (e) {
        next(e)
    }
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body: UserInputInterface = req.body
        const validate = createUserValidation(body)
        if (validate.error) {
            res.statusCode = 422
            throw new Error(validate.error.details[0].message.replace("\"", "").replace("\"", ""))
        }
        
        const validateUserExists = await prisma.user.findFirst({
            where: {
                OR: [
                    {email: body.email},
                    {username: body.username}
                ]
            }
        })

        if(validateUserExists) {
            const errorMessage = validateUserExists.email == body.email ? 'Email already exists' : 'Username already exists'
            
            res.statusCode = 409
            throw new Error(errorMessage)
        }
        
        if (body.password !== body.confirm_password) {
            res.statusCode = 422
            throw new Error('Password not match')
        }

        const salt = await bcrypt.genSaltSync(10)
        body.password = bcrypt.hashSync(body.password, salt)

        const user: UserInterface = await prisma.user.create({
            data: {
                name: body.name,
                username: body.username,
                email: body.email,
                password: body.password
            }
        })

        delete user.password
        return res.status(200).json({
            statusCode: 200,
            message: 'Success',
            data: user
        })
    } catch (e) {
        next(e)
    }
}