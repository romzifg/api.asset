import { UserInputInterface } from "@/interfaces/user.interface";
import Joi from "joi";

export const createUserValidation = (payload: UserInputInterface) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required().min(6),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
        confirm_password: Joi.string().required().min(8),
    })

    return schema.validate(payload)
}