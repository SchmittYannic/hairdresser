import { appointmentschema, durationschema, startschema, employeeschema } from "../validation/appointmentschema.js"
import { parseError, isAppointmentConflict, hasUpcomingAppointments, getEarliestAppointment, sortByDate } from "../utils/helpers.js";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import { generateFreeTimeSlots } from "../utils/generateFreeSlots.js";
import { availableEmployees, employeesInfo } from "../config/constants.js";
import Archivedappointment from "../models/Archivedappointment.js";

// @desc Get upcoming apointment of user
// @route GET /appointment
// @access Private
const getUpcomingAppointmentOfUser = async (req, res) => {
    const cookieInfo = {
        cookie_expires: req.session.cookie._expires,
        cookie_originalMaxAge: req.session.cookie.originalMaxAge,
    }

    try {
        console.log("UpcomingAppointment: ", req.session)
        const { userId } = req.session.user;

        const foundAppointments = await Appointment.find({ customer: userId, end: { $gt: new Date() } }).lean().exec();

        if (!foundAppointments || foundAppointments.length === 0) {
            return res.status(200).json({ message: "keine gebuchten Termine", nextAppointment: [], cookieInfo })
        }

        const earliestAppointment = getEarliestAppointment(foundAppointments);

        return res.status(200).json({ message: "Gebuchte Termine gefunden", nextAppointment: [earliestAppointment], cookieInfo })
    } catch (error) {
        return res.status(400).json({ message: "Fehler bei Abfrage nach Terminen", cookieInfo })
    }
}

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
            remarks,
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
            remarks,
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
            remarks: remarks ? remarks : "",
        })

        if (!appointment) {
            return res.status(400).json({ message: "Konnte keinen neuen Termin in der Datenbank anlegen.", cookieInfo });
        }

        return res.status(200).json({ message: "Termin gebucht", cookieInfo });
    } catch (err) {
        return res.status(400).send({ ...parseError(err), cookieInfo });
    }
};

// @desc Delete appointment
// @route DELETE /appointment
// @access Private
const deleteAppointment = async (req, res) => {
    const cookieInfo = {
        cookie_expires: req.session.cookie._expires,
        cookie_originalMaxAge: req.session.cookie.originalMaxAge,
    }
    try {
        const { userId } = req.session.user
        const appointmentId = req.params.id

        const foundAppointment = await Appointment.findById(appointmentId).exec();

        if (!foundAppointment) {
            return res.status(400).json({ message: "Kein Termin in Datenbank gefunden", cookieInfo })
        }

        if (!foundAppointment.customer.equals(userId)) {
            return res.status(401).json({ message: "Keine Autorisierung für Löschung des Termins vorhanden", cookieInfo })
        }

        /* Hier etwas machen im Fall, dass Termin innerhalb der nächsten 24 Stunden */

        const result = await foundAppointment.deleteOne();

        if (!result) {
            return res.status(400).json({ message: "Fehler bei Löschung des Termins aus Datenbank", cookieInfo })
        }

        return res.status(200).json({ message: "Termin erfolgreich storniert", cookieInfo })
    } catch (error) {
        return res.status(400).json({ message: "Fehler bei Löschung des Termins", cookieInfo })
    }
}

// @desc Get all upcoming appointments filtered by employee
// @route POST /appointment/filter
// @access Private
const getAllFreeTimeSlotsByEmployee = async (req, res) => {
    const cookieInfo = {
        cookie_expires: req.session.cookie._expires,
        cookie_originalMaxAge: req.session.cookie.originalMaxAge,
    }

    try {
        const { employee, duration, service_name } = req.body
        if (!duration) {
            return res.status(400).json({ message: "Keine Dauer angegeben", cookieInfo })
        }

        if (!service_name) {
            return res.status(400).json({ message: "Keine Dienstleistung angegeben", cookieInfo })
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
                if (employeesInfo[employee].skills.includes(service_name)) {
                    const foundAppointments = await Appointment.find({ employee });
                    const freeTimeslotsByEmployee = generateFreeTimeSlots(90, duration, foundAppointments, employee);
                    freeTimeslots.push(...freeTimeslotsByEmployee);
                }
            }

            return res.status(200).json({ message: "okay", freeTimeslots, cookieInfo })
        }
    } catch (err) {
        return res.status(400).send({ ...parseError(err), cookieInfo });
    }
}

// @desc Get archived apointments of user
// @route GET /appointment/archive
// @access Private
const getArchivedAppointmentsOfUser = async (req, res) => {
    const cookieInfo = {
        cookie_expires: req.session.cookie._expires,
        cookie_originalMaxAge: req.session.cookie.originalMaxAge,
    }
    try {
        const { userId } = req.session.user;
        const foundAppointments = await Archivedappointment.find({ customer: userId }).lean().exec();

        if (!foundAppointments) {
            return res.status(200).json({ message: "keine archivierten Termine", archivedAppointments: [], cookieInfo })
        }

        sortByDate(foundAppointments, "start", "desc");

        return res.status(200).json({ message: "Archivierte Termine gefunden", archivedAppointments: foundAppointments, cookieInfo })
    } catch (error) {
        return res.status(400).json({ message: "Fehler bei Abfrage nach archivierten Terminen", cookieInfo })
    }
}

export {
    getUpcomingAppointmentOfUser,
    createNewAppointment,
    deleteAppointment,
    getAllFreeTimeSlotsByEmployee,
    getArchivedAppointmentsOfUser,
}