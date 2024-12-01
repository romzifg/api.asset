import { CustomerInputInterface, CustomerUpdateInterface } from "@/interfaces/customer.interface";
import Joi from "joi";

export const createCustomerValidation = (payload: CustomerInputInterface) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        pic: Joi.string(),
        phone: Joi.string(),
        email: Joi.string().email().required,
    })

    return schema.validate(payload)
}

export const updateCustomerValidation = (payload: CustomerUpdateInterface) => {
    const schema = Joi.object({
        name: Joi.string(),
        address: Joi.string(),
        pic: Joi.string(),
        phone: Joi.string(),
        email: Joi.string().email().required,
    })

    return schema.validate(payload)
}