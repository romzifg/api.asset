import { UserInputInterface, UserUpdateInputInterface } from "@/interfaces/user.interface";
import Joi from "joi";

export const createUserValidation = (payload: UserInputInterface) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required().min(6),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
    })

    return schema.validate(payload)
}

export const updateUserValidation = (payload: UserUpdateInputInterface) => {
    const schema = Joi.object({
        name: Joi.string(),
        username: Joi.string().min(6),
        email: Joi.string().email(),
        profile_pircutre: Joi.string()
    })
    
    return schema.validate(payload)
}

export const changeStatusValidation = (payload: number) => {
    const schema = Joi.number().required()

    return schema.validate(payload)
}