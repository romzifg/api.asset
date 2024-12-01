import { NextFunction, Request, Response } from 'express'
import prisma from '@/utils/prisma'
import { CustomerInputInterface, CustomerInterface, CustomerUpdateInterface } from '@/interfaces/customer.interface'
import { createCustomerValidation, updateCustomerValidation } from '@/validation/customer.validation'

export const getAll = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await prisma.customer.findMany()

        return res.status(200).json({
            statusCode: 200,
            message: 'Success',
            data: data
        })
    } catch (e) {
        next(e)
    }
}

export const store = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const body: CustomerInputInterface = req.body
        const validate = createCustomerValidation(body)
        if (validate.error) {
            res.statusCode = 422
            throw new Error(validate.error.details[0].message.replace("\"", "").replace("\"", ""))
        }

        const customer = await prisma.customer.create({
            data: {
                name: body.name,
                address: body.address,
                pic: body.pic,
                phone: body.phone,
                email: body.email,
                status: 0,
            }
        })

        return res.status(200).json({
            statusCode: 200,
            message: 'Success',
            data: customer
        })
    } catch (e) {
        next(e)
    }
}

export const update = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const body: CustomerUpdateInterface = req.body
        const customerId: number = parseInt(req.params.id)
        const validate = updateCustomerValidation(body)
        if (validate.error) {
            res.statusCode = 422
            throw new Error(validate.error.details[0].message.replaceAll("\"", ""))
        }

        const cust = await prisma.customer.findFirst({ where: { id: customerId } })
        if (!cust) {
            res.statusCode = 404
            throw new Error('User not found')
        }

        await prisma.customer.update({
            data: body,
            where: {
                id: customerId
            }
        })

        return res.status(200).json({
            statusCode: 200,
            message: 'Success',
            data: {
                ...cust,
                ...body
            }
        })
    } catch (e) {
        next(e)
    }
}