import Joi from "joi"
import {
    durationschema,
    servicenameschema,
    startschema,
    endschema,
    customerschema,
    employeeschema,
    remarksschema,
} from "../validation/appointmentschema.js"
import { isAppointmentConflict } from "./helpers.js";
import Appointment from "../models/Appointment.js";
import {
    availableCustomers,
    availableServices,
    availableEmployees,
    employeesInfo,
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
    remarks: remarksschema.required(),
})

const getRandomArrayElement = (arr) => {
    // Check if the array is empty
    if (arr.length === 0) {
        throw new Error("Array is empty");
    }

    // Generate a random index within the bounds of the array length
    const randomIndex = Math.floor(Math.random() * arr.length);

    // Return the randomly selected element
    return arr[randomIndex];
}

const generateRandomDate = () => {
    const now = new Date();
    const maxDaysOffset = 30;
    const hours = Math.floor(Math.random() * 10) + 8; // Random hour between 8 and 17
    const minutes = Math.floor(Math.random() * 2) * 30; // 0 or 30 for 30-minute steps
    const randomMillis = Math.floor(Math.random() * (maxDaysOffset * 24 * 60 * 60 * 1000));
    let randomDate = new Date(now.getTime() + randomMillis);
    // Set time of the randomDate to the generated randomTime
    randomDate.setHours(hours);
    randomDate.setMinutes(minutes);
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

const generateRandomStartDate = () => {
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
    const employee = getRandomArrayElement(availableEmployees);
    const employeeSkill = employeesInfo[employee].skills;

    const result = {
        customer: getRandomArrayElement(availableCustomers),
        employee: employee,
        service_name: getRandomArrayElement(employeeSkill),
        duration,
        start,
        end,
        remarks: "",
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