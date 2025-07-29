import Joi from "joi"
import mongoose from "mongoose";
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
import User from "../models/User.js";
import {
    availableCustomers,
    availableEmployees,
    employeesInfo,
    weekdays,
} from "../config/constants.js";
import { generateFreeTimeSlots } from "./generateFreeSlots.js";
import { getMaxBookingDaysAhead } from "./helpers.js";


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
    const maxDaysOffset = 45;
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

const isWithinWorkingHours = (date, employee) => {
    if (!employee) {
        throw new Error("employee cannot be falsy in isWithinWorkingHours")
    }

    const dayOfWeek = weekdays[date.getDay()];
    const hour = date.getHours();
    const minute = date.getMinutes();
    const { working_hours } = employeesInfo[employee];
    const { start, end } = working_hours[dayOfWeek];

    if (!start || !end) return false

    const timeToMinutes = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);

    const currentTimeMinutes = hour * 60 + minute;

    // Check if the current time is within the working hours range
    return currentTimeMinutes >= startMinutes && currentTimeMinutes < endMinutes;
}

const generateRandomStartDate = (employee) => {
    let randomStartDate = generateRandomDate()
    // Check if the generated date is within opening hours
    while (!isWithinWorkingHours(randomStartDate, employee)) {
        randomStartDate = generateRandomDate();
    }

    return randomStartDate;
}

const generateAppointmentData = () => {
    const employee = getRandomArrayElement(Object.keys(employeesInfo));
    const employeeSkill = employeesInfo[employee].skills;
    const start = generateRandomStartDate(employee);
    const duration = 30;
    const end = new Date(start.getTime() + duration * 60000);

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
        if (!fakeAppointment) throw new Error("failed to create fake appointment")
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
        console.log("fakedata inserted")
    } catch (error) {
        console.log(error)
    }
}

function getFixedServiceForCustomer(customerId, skillsArray) {
    const idStr = customerId.toString();
    const hashBase = parseInt(idStr.slice(-4), 16); // nimmt die letzten 4 hex-Zeichen
    const index = hashBase % skillsArray.length;
    return skillsArray[index];
}

function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export const generateDemoAdminAppointments = async () => {
    try {
        const demoAdminId = "687e51eda45abc802a17a8fb";
        const serviceDuration = 30;
        const maxBookingDaysAhead = getMaxBookingDaysAhead();
        const demoAdminInfo = employeesInfo[demoAdminId];

        const emailList = Array.from({ length: 280 }, (_, i) => `customer${i + 11}@test.de`);
        const customers = await User.find({
            email: { $in: emailList }
        }).select("_id email").lean();
        const customerIds = shuffleArray(customers.map(user => user._id));

        const foundAppointments = await Appointment.find({ employee: demoAdminId });

        const freeTimeslots = generateFreeTimeSlots(maxBookingDaysAhead, serviceDuration, foundAppointments, demoAdminId);

        if (freeTimeslots.length < customerIds.length) {
            throw new Error(`Nicht genug Slots (${slots.length}) für ${customerIds.length} Kunden`);
        }

        const appointments = [];

        for (let i = 0; i < customerIds.length; i++) {
            const appointment = {
                customer: customerIds[i],
                employee: new mongoose.Types.ObjectId(demoAdminId),
                service_name: getFixedServiceForCustomer(customerIds[i], demoAdminInfo.skills),
                duration: serviceDuration,
                start: freeTimeslots[i].startDate,
                end: freeTimeslots[i].endDate,
                remarks: "",
            }

            const isAppointmentConflictResult = await isAppointmentConflict(appointment.employee, appointment.customer, appointment.start, appointment.end)

            if (!isAppointmentConflictResult) {
                appointments.push(appointment)
            }
        }

        await Appointment.insertMany(appointments);
    } catch (err) {
        console.error("Error in generateDemoAdminAppointments:", err);
    }

}