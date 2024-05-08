import Joi from "joi";

const email = Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "any.required": "Email is required"
});

const password = Joi.string()
    .pattern(new RegExp(/^.{6,16}$/))
    .message("Password must be between 6 and 16 characters long")
    .pattern(new RegExp(/.*[A-Z].*/))
    .message("Password must contain at least one uppercase letter")
    .pattern(new RegExp(/.*[a-z].*/))
    .message("Password must contain at least one lowercase letter")
    .pattern(new RegExp(/.*\d.*/))
    .message("Password must contain at least one digit")
    .pattern(new RegExp(/.*[!@#$%^&*_\-].*/))
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
    "string.max": "Firstname cant be longer than 80 characters",
    "string.empty": "Firstname is required",
    "any.required": "Firstname is required",
});

const title = Joi.string()
    .pattern(new RegExp(/^(Herr|Frau|Divers)$/))
    .messages({
        "string.pattern.base": "Title must be either Herr, Frau or Divers",
        "string.empty": "Title is required",
        "any.required": "Title is required",
    })
    .required()

const birthday = Joi.date()
    .less("now")
    .required()
    .messages({
        "date.base": "Birthday is required",
        "date.less": "Birthday cant be in the future",
        "any.required": "Birthday is required",
    })

const phonenumber = Joi.string()
    .pattern(new RegExp(/^\d+$/))
    .message("Phonenumber must only consist of numbers")
    .pattern(new RegExp(/^\d{7,15}$/))
    .message("Phonenumber must be between 7 and 15 digits long")
    .required()
    .messages({
        "any.required": "Phonenumber is required",
    })

const reminderemail = Joi.boolean().required().messages({
    "any.required": "Reminder email optionfield is required"
})

const birthdayemail = Joi.boolean().required().messages({
    "any.required": "Birthday email optionfield is required"
})

const newsletter = Joi.boolean().required().messages({
    "any.required": "Newsletter optionfield is required"
})

export const register = Joi.object().keys({
    email,
    password,
    title,
    lastname,
    firstname,
    birthday,
    phonenumber,
    reminderemail,
    birthdayemail,
    newsletter,
});