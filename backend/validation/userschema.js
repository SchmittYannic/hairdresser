import Joi from "joi";

export const emailschema = Joi.string()
    .email()
    .pattern(new RegExp(/^\S.*\S$|^\S$/))
    .message("Email darf nicht mit Leerzeichen beginnen oder enden.")
    .required()
    .label("email")
    .messages({
        "string.email": "ungültiges Email-Format",
        "string.empty": "Email ist erforderlich",
        "any.required": "Email ist erforderlich"
    });

export const passwordschema = Joi.string()
    .label("password")
    .pattern(new RegExp(/^\S*$/))
    .message("Passwort darf keine Leerzeichen enthalten")
    .pattern(new RegExp(/^.{6,16}$/))
    .message("Passwort muss zwischen 6 und 16 Zeichen lang sein")
    .pattern(new RegExp(/.*[A-Z].*/))
    .message("Passwort muss mindestens einen Großbuchstaben enthalten")
    .pattern(new RegExp(/.*[a-z].*/))
    .message("Passwort muss mindestens einen Kleinbuchstaben enthalten")
    .pattern(new RegExp(/.*\d.*/))
    .message("Passwort muss mindestens eine Ziffer enthalten")
    .pattern(new RegExp(/.*[!@#$%^&*_\-].*/))
    .message("Passwort muss mindestens ein Sonderzeichen enthalten")
    .required()
    .messages({
        "string.empty": "Passwort ist erforderlich",
        "any.required": "Passwort ist erforderlich"
    });

export const lastnameschema = Joi.string()
    .label("lastname")
    .max(80)
    .pattern(new RegExp(/^\S.*\S$|^\S$/))
    .message("Nachname darf nicht mit Leerzeichen beginnen oder enden.")
    .required()
    .messages({
        "string.max": "Nachname darf nicht mehr als 80 Zeichen lang sein",
        "string.empty": "Nachname ist erforderlich",
        "any.required": "Nachname ist erforderlich",
    });

export const firstnameschema = Joi.string()
    .label("firstname")
    .max(80)
    .pattern(new RegExp(/^\S.*\S$|^\S$/))
    .message("Vorname darf nicht mit Leerzeichen beginnen oder enden.")
    .required()
    .messages({
        "string.max": "Vorname darf nicht mehr als 80 Zeichen lang sein",
        "string.trim": "Vorname darf nicht mit Leerzeichen beginnen oder enden",
        "string.empty": "Vorname ist erforderlich",
        "any.required": "Vorname ist erforderlich",
    });

export const titleschema = Joi.string()
    .label("title")
    .pattern(new RegExp(/^(Herr|Frau|Divers)$/))
    .messages({
        "string.pattern.base": "Titel kann nur Herr, Frau oder Divers sein",
        "string.empty": "Titel ist erforderlich",
        "any.required": "Titel ist erforderlich",
    })
    .required()

export const birthdayschema = Joi.date()
    .label("birthday")
    .less("now")
    .required()
    .messages({
        "date.base": "Geburtstag ist erforderlich",
        "date.less": "Geburtstag kann nicht in der Zukunft liegen",
        "any.required": "Geburtstag ist erforderlich",
    })

export const phonenumberschema = Joi.string()
    .label("phonenumber")
    .pattern(new RegExp(/^\S*$/))
    .message("Handynummer darf keine Leerzeichen enthalten")
    .pattern(new RegExp(/^\d+$/))
    .message("Handynummer darf nur aus Zahlen bestehen")
    .pattern(new RegExp(/^\d{7,15}$/))
    .message("Handynummer muss zwischen 7 und 15 Zeichen lang sein")
    .required()
    .messages({
        "any.required": "Handynummer ist erforderlich",
    })

export const reminderemailschema = Joi.boolean()
    .label("reminderemail")
    .required()
    .messages({
        "any.required": "Das Optionsfeld für Terminerinnerung ist erforderlich"
    })

export const birthdayemailschema = Joi.boolean()
    .label("birthdayemail")
    .required()
    .messages({
        "any.required": "Das Optionsfeld für Geburtstagsemail ist erforderlich"
    })

export const newsletterschema = Joi.boolean()
    .label("newsletter")
    .required()
    .messages({
        "any.required": "Das Optionsfeld für Newsletter ist erforderlich"
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