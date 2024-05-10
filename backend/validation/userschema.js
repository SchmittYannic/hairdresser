import Joi from "joi";

export const emailschema = Joi.string()
    .email()
    .required()
    .label("email")
    .messages({
        "string.email": "ungültiges Email-Format",
        "string.empty": "Email is required",
        "any.required": "Email is required"
    });

export const passwordschema = Joi.string()
    .label("password")
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

export const lastnameschema = Joi.string()
    .label("lastname")
    .max(80)
    .required()
    .messages({
        "string.max": "Lastname cant be longer than 80 characters",
        "string.empty": "Lastname is required",
        "any.required": "Lastname is required",
    });

export const firstnameschema = Joi.string()
    .label("firstname")
    .max(80)
    .required()
    .messages({
        "string.max": "Firstname cant be longer than 80 characters",
        "string.empty": "Firstname is required",
        "any.required": "Firstname is required",
    });

export const titleschema = Joi.string()
    .label("title")
    .pattern(new RegExp(/^(Herr|Frau|Divers)$/))
    .messages({
        "string.pattern.base": "Title must be either Herr, Frau or Divers",
        "string.empty": "Title is required",
        "any.required": "Title is required",
    })
    .required()

export const birthdayschema = Joi.date()
    .label("birthday")
    .less("now")
    .required()
    .messages({
        "date.base": "Birthday is required",
        "date.less": "Birthday cant be in the future",
        "any.required": "Birthday is required",
    })

export const phonenumberschema = Joi.string()
    .label("phonenumber")
    .pattern(new RegExp(/^\d+$/))
    .message("Phonenumber must only consist of numbers")
    .pattern(new RegExp(/^\d{7,15}$/))
    .message("Phonenumber must be between 7 and 15 digits long")
    .required()
    .messages({
        "any.required": "Phonenumber is required",
    })

export const reminderemailschema = Joi.boolean()
    .label("reminderemail")
    .required()
    .messages({
        "any.required": "Reminder email optionfield is required"
    })

export const birthdayemailschema = Joi.boolean()
    .label("birthdayemail")
    .required()
    .messages({
        "any.required": "Birthday email optionfield is required"
    })

export const newsletterschema = Joi.boolean()
    .label("newsletter")
    .required()
    .messages({
        "any.required": "Newsletter optionfield is required"
    })

export const userschema = Joi.object().keys({
    email: emailschema,
    password: passwordschema,
    title: titleschema,
    lastname: lastnameschema,
    firstname: firstnameschema,
    birthday: birthdayschema,
    phonenumber: phonenumberschema,
    reminderemail: reminderemailschema,
    birthdayemail: birthdayemailschema,
    newsletter: newsletterschema,
});