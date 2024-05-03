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
    .pattern(new RegExp(/.*[!@#$%^&-_*].*/))
    .message("Password must contain at least one special character")
    .required()
    .messages({
        "string.empty": "Password is required",
        "any.required": "Password is required"
    });

const lastname = Joi.string().max(80).required().messages({
    "string.max": "Lastname cant be longer than 80 characters",
    "string.empty": "Lastname is required",
    "any.required": "Lastname is required",
});

const firstname = Joi.string().max(80).required().messages({
    "string.max": "Lastname cant be longer than 80 characters",
    "string.empty": "Lastname is required",
    "any.required": "Lastname is required",
});


export const register = Joi.object().keys({
    email,
    password,
    lastname,
    firstname,
});