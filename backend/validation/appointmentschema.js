import Joi from "joi";
import { availableServices } from "../config/constants.js";


const availableServicesRegex = new RegExp(`^(${availableServices.map(service => service.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})$`);

export const customerschema = Joi.string()
    .label("customer")
    .regex(new RegExp(/^[0-9a-fA-F]{24}$/))
    .message("Keine valide Kunden Id")
    .messages({
        "string.empty": "Kunden Id ist erforderlich",
        "any.required": "Kunden Id ist erforderlich"
    });

export const employeeschema = Joi.string()
    .label("employee")
    .regex(new RegExp(/^[0-9a-fA-F]{24}$/))
    .message("Keine valide Mitarbeiter Id")
    .messages({
        "string.empty": "Mitarbeiter Id ist erforderlich",
        "any.required": "Mitarbeiter Id ist erforderlich"
    });

export const servicenameschema = Joi.string()
    .label("service_name")
    .max(80)
    .regex(availableServicesRegex)
    .message("Unbekannter service_name erhalten")
    .messages({
        "string.empty": "Name der Dienstleistung ist erforderlich",
        "string.max": "Name der Dienstleistung darf nicht mehr als 80 Zeichen lang sein",
        "any.required": "Name der Dienstleistung ist erforderlich"
    });

export const durationschema = Joi.number()
    .label("duration")
    .integer()
    .positive()
    .messages({
        "number.base": "Dauer ist erforderlich",
        "number.integer": "Dauer muss eine Ganzzahl sein",
        "number.positive": "Dauer muss eine positive Zahl sein",
        "any.required": "Dauer ist erforderlich",
    })

export const startschema = Joi.date()
    .label("start")
    .greater("now")
    .less(new Date().getTime() + (3 * 30 * 24 * 60 * 60 * 1000))
    .messages({
        "date.base": "Startdatum ist erforderlich",
        "date.greater": "Startdatum kann nicht in der Vergangenheit liegen",
        "date.less": "Startdatum kann nicht mehr als 3 Monate in die Zukunft liegen",
        "any.required": "Startdatum ist erforderlich",
    })

export const endschema = Joi.date()
    .label("end")
    .greater("now")
    .messages({
        "date.base": "Enddatum ist erforderlich",
        "date.greater": "Enddatum kann nicht in der Vergangenheit liegen",
        "any.required": "Enddatum ist erforderlich",
    })

export const remarksschema = Joi.string()
    .label("remarks")
    .max(255)
    .allow("")
    .messages({
        "string.max": "Bemerkung darf nicht länger als 255 Zeichen sein",
    });

export const appointmentschema = Joi.object().keys({
    customer: customerschema.required(),
    employee: employeeschema.required(),
    service_name: servicenameschema.required(),
    start: startschema.required(),
    end: endschema.required(),
    duration: durationschema.required(),
    remarks: remarksschema,
})