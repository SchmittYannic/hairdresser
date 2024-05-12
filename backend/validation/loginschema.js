import Joi from "joi";
import { requiredMsg } from "../config/constants.js";

const email = Joi.string().email().required().messages({
    "string.email": "ungültiges Email-Format",
    "string.empty": requiredMsg,
    "any.required": requiredMsg,
});

const password = Joi.string().max(80).required().messages({
    "string.max": "Passwort darf nicht mehr als 80 Zeichen lang sein",
    "string.empty": requiredMsg,
    "any.required": requiredMsg,
});

export default Joi.object().keys({
    email,
    password,
});