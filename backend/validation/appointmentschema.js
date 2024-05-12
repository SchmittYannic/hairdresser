import Joi from "joi";

const availableServices = [
    "Schneiden",
    "KindU6",
    "KindU12",
    "TeenU14",
    "Cornrows",
    "Rasur",
    "Greyblending",
    "Dauerwelle",
    "Coloration",
];

const availableServicesRegex = new RegExp(`^(${availableServices.map(service => service.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})$`);

const customerschema = Joi.string()
    .label("customer")
    .regex(new RegExp(/^[0-9a-fA-F]{24}$/))
    .message("Keine valide Kunden Id")
    .messages({
        "string.empty": "Kunden Id ist erforderlich",
        "any.required": "Kunden Id ist erforderlich"
    });

const employeeschema = Joi.string()
    .label("employee")
    .regex(new RegExp(/^[0-9a-fA-F]{24}$/))
    .message("Keine valide Mitarbeiter Id")
    .messages({
        "string.empty": "Mitarbeiter Id ist erforderlich",
        "any.required": "Mitarbeiter Id ist erforderlich"
    });

const servicenameschema = Joi.string()
    .label("service_name")
    .max(80)
    .regex(availableServicesRegex)
    .message("Unbekannter service_name erhalten")
    .messages({
        "string.empty": "Name der Dienstleistung ist erforderlich",
        "string.max": "Name der Dienstleistung darf nicht mehr als 80 Zeichen lang sein",
        "any.required": "Name der Dienstleistung ist erforderlich"
    });

const durationschema = Joi.number()
    .label("duration")
    .integer()
    .positive()
    .messages({
        "number.base": "Dauer ist erforderlich",
        "number.integer": "Dauer muss eine Ganzzahl sein",
        "number.positive": "Dauer muss eine positive Zahl sein",
        "any.required": "Dauer ist erforderlich",
    })

const startschema = Joi.date()
    .label("start")
    .greater("now")
    .less(Joi.date().min(new Date().getTime() + (3 * 30 * 24 * 60 * 60 * 1000)))
    .messages({
        "date.base": "Startdatum ist erforderlich",
        "date.greater": "Startdatum kann nicht in der Vergangenheit liegen",
        "date.less": "Startdatum kann nicht mehr als 3 Monate in die Zukunft liegen",
        "any.required": "Startdatum ist erforderlich",
    })

const endschema = Joi.date()
    .label("end")
    .greater("now")
    .when("start", {
        is: Joi.date().required(),
        then: Joi.date().min(Joi.ref("start", { adjust: (value) => value.getTime() + duration * 60000 })),
        otherwise: Joi.date().min("now")
    })
    .messages({
        "date.base": "Enddatum ist erforderlich",
        "date.greater": "Enddatum kann nicht in der Vergangenheit liegen",
        "any.required": "Enddatum ist erforderlich",
    })

export const appointmentschema = Joi.object().keys({
    customer: customerschema.required(),
    employee: employeeschema.required(),
    service_name: servicenameschema.required(),
    start: startschema.required(),
    end: endschema.required(),
    duration: durationschema.required(),
})