import Joi from "joi"
import { faker } from "@faker-js/faker"
import {
    durationschema,
    servicenameschema,
    startschema,
    endschema,
    customerschema,
    employeeschema,
} from "../validation/appointmentschema.js"
import { isAppointmentConflict } from "./helpers.js";
import Appointment from "../models/Appointment.js";
import {
    availableCustomers,
    availableServices,
    availableEmployees,
} from "../config/constants.js";


const availableEmployeesRegex = new RegExp(`^(${availableEmployees.map(employee => employee.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})$`);
const availableCustomersRegex = new RegExp(`^(${availableCustomers.map(customer => customer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})$`);

const fakecustomerschema = customerschema
    .regex(availableCustomersRegex)
    .message("Nur bekannte Kunden")

const fakeemployeeschema = employeeschema
    .regex(availableEmployeesRegex)
    .message("Nur bekannte Mitarbeiter")

const fakeschema = Joi.object({
    customer: fakecustomerschema.required(),
    employee: fakeemployeeschema.required(),
    service_name: servicenameschema.required(),
    start: startschema.required(),
    end: endschema.required(),
    duration: durationschema.required(),
})

const generateRandomTime = () => {
    const hour = Math.floor(Math.random() * 10) + 8; // Random hour between 8 and 17
    const minute = Math.floor(Math.random() * 2) * 30; // 0 or 30 for 30-minute steps
    return `${hour}:${minute.toString().padStart(2, "0")}`;
}

const generateRandomDate = () => {
    const randomTime = generateRandomTime();
    const now = new Date()
    let randomDate = faker.date.soon({ refDate: now, days: 90 });
    // Set time of the randomDate to the generated randomTime
    randomDate.setHours(parseInt(randomTime.split(':')[0]));
    randomDate.setMinutes(parseInt(randomTime.split(':')[1]));
    randomDate.setSeconds(0);
    randomDate.setMilliseconds(0);
    return randomDate;
}

const isWithinOpeningHours = (date) => {
    const dayOfWeek = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();

    // Dienstag - Freitag 08:30 - 17:30
    if (dayOfWeek >= 2 && dayOfWeek <= 5) {
        if ((hour === 8 && minute >= 30) || (hour > 8 && hour < 17) || (hour === 17 && minute <= 30)) {
            return true;
        }
    }
    // Samstag 08:00 - 12:30
    else if (dayOfWeek === 6) {
        if ((hour === 8 && minute >= 0) || (hour > 8 && hour < 12) || (hour === 12 && minute <= 30)) {
            return true;
        }
    }

    return false;
}

function generateRandomStartDate() {
    let randomStartDate = generateRandomDate()
    // Check if the generated date is within opening hours
    while (!isWithinOpeningHours(randomStartDate)) {
        randomStartDate = generateRandomDate();
    }

    return randomStartDate;
}

const generateAppointmentData = () => {
    const start = generateRandomStartDate();
    const duration = 30;
    const end = new Date(start.getTime() + duration * 60000);

    const result = {
        customer: faker.helpers.arrayElement(availableCustomers),
        employee: faker.helpers.arrayElement(availableEmployees),
        service_name: faker.helpers.arrayElement(availableServices),
        duration,
        start,
        end,
    };

    const { error, value } = fakeschema.validate(result);

    if (error) {
        return null
    }

    return value;
}

const generateValidAppointmentData = async () => {
    try {
        let fakeAppointment = generateAppointmentData();
        let counter = 0;
        while (await isAppointmentConflict(fakeAppointment.employee, fakeAppointment.customer, fakeAppointment.start, fakeAppointment.end)) {
            fakeAppointment = generateAppointmentData();
            counter++;

            if (counter >= 100) {
                console.log("Exceeded maximum iterations");
                break;
            }
        }
        return fakeAppointment
    } catch (error) {
        console.log(error)
    }
}

export const insertFakeData = async (amount) => {
    try {
        for (let i = 0; i < amount; i++) {
            const data = await generateValidAppointmentData();
            const createAppointment = await Appointment.create(data);
            if (!createAppointment) throw Error("Error while creating appointment");
        }
    } catch (error) {
        console.log(error)
    }
}