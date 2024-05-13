import { appointmentschema, durationschema, startschema, employeeschema } from "../validation/appointmentschema.js"
import { parseError, isAppointmentConflict, hasUpcomingAppointments } from "../utils/helpers.js";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import { generateFreeTimeSlots } from "../utils/generateFreeSlots.js";
import { availableEmployees } from "../config/constants.js";

// @desc Get all upcoming appointments
// @route GET /appointment
// @access Private
// const getAppointments = async (req, res) => {
//     const cookieInfo = {
//         cookie_expires: req.session.cookie._expires,
//         cookie_originalMaxAge: req.session.cookie.originalMaxAge,
//     }

//     try {
//         const { employee } = req.body

//         if (employee) {
//             await employeeschema.validateAsync(employee)
//             const foundAppointments = await Appointment.find({ employee });
//             res.status(200).json({ message: "Success", cookieInfo, appointments: foundAppointments })
//         } else {
//             const appointments = await Appointment.find();
//             res.status(200).json({ message: "Success", cookieInfo, appointments: appointments })
//         }
//     } catch (error) {
//         return res.status(400).json({ message: "Fehler beim Abrufen der Daten", cookieInfo });
//     }
// }

// @desc Create new appointment
// @route POST /appointment
// @access Private
const createNewAppointment = async (req, res) => {
    const cookieInfo = {
        cookie_expires: req.session.cookie._expires,
        cookie_originalMaxAge: req.session.cookie.originalMaxAge,
    }

    try {
        const {
            customer,
            employee,
            service_name,
            duration,
            start,
        } = req.body;

        if (req.session.user.userId !== customer) {
            return res.status(401).json({ message: "Nicht autorisiert einen Termin zu buchen", cookieInfo });
        }

        const startAsDate = new Date(start);
        await startschema.validateAsync(startAsDate);
        await durationschema.validateAsync(duration);

        const endAsDate = new Date(startAsDate.getTime() + duration * 60000);

        if ((endAsDate - startAsDate) / 60000 !== parseInt(duration)) {
            return res.status(400).json({ message: "Enddatum muss duration minutes after Startdatum liegen", context: { key: "end" }, cookieInfo });
        }

        await appointmentschema.validateAsync({
            customer,
            employee,
            service_name,
            duration,
            start: startAsDate,
            end: endAsDate,
        });

        const foundCustomer = await User.findById(customer).lean().exec();

        if (!foundCustomer) {
            return res.status(400).json({ message: "Konnte Kunde nicht in Datenbank finden", cookieInfo });
        }

        const foundEmployee = await User.findById(employee).lean().exec();

        if (!foundEmployee) {
            return res.status(400).json({ message: "Konnte Mitarbeiter nicht in Datenbank finden", cookieInfo });
        }

        if (!foundEmployee.roles.includes("Employee")) {
            return res.status(400).json({ message: "Die gefundene Person ist nicht als Mitarbeiter autorisiert", cookieInfo });
        }

        if (await hasUpcomingAppointments(customer)) {
            return res.status(400).json({ message: "Termin konnte nicht gebucht werden, da der Kunde bereits einen offenen Termin besitzt", cookieInfo });
        }

        if (await isAppointmentConflict(employee, customer, startAsDate, endAsDate)) {
            return res.status(400).json({ message: "Termin konnte nicht gebucht werden, da er im Konflikt mit einem existierenden Termins steht", cookieInfo });
        }

        const appointment = await Appointment.create({
            customer,
            employee,
            service_name,
            duration,
            start: startAsDate,
            end: endAsDate,
        })

        if (!appointment) {
            return res.status(400).json({ message: "Konnte keinen neuen Termin in der Datenbank anlegen.", cookieInfo });
        }

        return res.status(200).json({ message: "Termin gebucht", cookieInfo });
    } catch (err) {
        return res.status(400).send({ ...parseError(err), cookieInfo });
    }
};

// @desc Get all upcoming appointments filtered by employee
// @route POST /appointment/filter
// @access Private
const getAllFreeTimeSlotsByEmployee = async (req, res) => {
    const cookieInfo = {
        cookie_expires: req.session.cookie._expires,
        cookie_originalMaxAge: req.session.cookie.originalMaxAge,
    }

    try {
        const { employee, duration } = req.body
        if (!duration) {
            return res.status(400).json({ message: "Keine Dauer angegeben", cookieInfo })
        }

        if (employee) {
            await employeeschema.validateAsync(employee);
            const foundAppointments = await Appointment.find({ employee });

            const freeTimeslots = generateFreeTimeSlots(90, duration, foundAppointments, employee);

            return res.status(200).json({ message: "okay", freeTimeslots, cookieInfo })
        } else {
            const freeTimeslots = [];

            for (let idx in availableEmployees) {
                const employee = availableEmployees[idx];
                const foundAppointments = await Appointment.find({ employee });
                const freeTimeslotsByEmployee = generateFreeTimeSlots(90, duration, foundAppointments, employee);
                freeTimeslots.push(...freeTimeslotsByEmployee);
            }

            return res.status(200).json({ message: "okay", freeTimeslots, cookieInfo })
        }
    } catch (err) {
        return res.status(400).send({ ...parseError(err), cookieInfo });
    }
}

export {
    createNewAppointment,
    getAllFreeTimeSlotsByEmployee,
}