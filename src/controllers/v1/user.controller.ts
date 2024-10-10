import { NextFunction, Request, Response } from 'express'
import prisma from '@/utils/prisma'
import bcrypt from 'bcrypt'
import { changeStatusValidation, createUserValidation, updateUserValidation } from '@/validation/user.validation'
import { UserInputInterface, UserInterface, UserUpdateInputInterface } from '@/interfaces/user.interface'

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
                    { email: body.email },
                    { username: body.username }
                ]
            }
        })

        if (validateUserExists) {
            const errorMessage = validateUserExists.email == body.email ? 'Email already exists' : 'Username already exists'

            res.statusCode = 409
            throw new Error(errorMessage)
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

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body: UserUpdateInputInterface = req.body
        const userId: number = parseInt(req.params.id)
        const validate = updateUserValidation(body)
        if (validate.error) {
            res.statusCode = 422
            throw new Error(validate.error.details[0].message.replace("\"", "").replace("\"", ""))
        }

        const user: UserInterface | null = await prisma.user.findFirst({ where: { id: userId } })
        if (!user) {
            res.statusCode = 404
            throw new Error('User not found')
        }

        await prisma.user.update({
            data: body,
            where: {
                id: userId
            }
        })

        delete user.password

        return res.status(200).json({
            statusCode: 200,
            message: 'Success',
            data: {
                ...user,
                ...body
            }
        })
    } catch (e) {
        next(e)
    }
}


export const changeStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const status: number = req.body.status
        const userId: number = parseInt(req.params.id)
        const validate = changeStatusValidation(status)
        if (validate.error) {
            res.statusCode = 422
            throw new Error(validate.error.details[0].message.replace("\"", "").replace("\"", ""))
        }

        const user = await prisma.user.findFirst({ where: { id: userId } })
        if (!user) {
            res.statusCode = 404
            throw new Error('User not found')
        }

        await prisma.user.update({
            data: {
                status: status
            },
            where: {
                id: userId
            }
        })

        user.status = status
        return res.status(200).json({
            statusCode: 200,
            message: 'Success',
            data: user
        })
    } catch (e) {
        next(e)
    }
}