import Joi from "joi";

const email = Joi.string().email().required();

const password = Joi.string()
    .pattern(new RegExp(/^.{6,16}$/))
    .message("Password must be between 6 and 16 characters long")
    .pattern(new RegExp(/.*[A-Z].*/))
    .message("Password must contain at least one uppercase letter")
    .pattern(new RegExp(/.*[a-z].*/))
    .message("Password must contain at least one lowercase letter")
    .pattern(new RegExp(/.*\d.*/))
    .message("Password must contain at least one digit")
    .pattern(new RegExp(/.*[!@#$%^&*].*/))
    .message("Password must contain at least one special character")
    .required()
    .messages({
        'any.required': 'Password is required'
    });


export const register = Joi.object().keys({
    email,
    password
});