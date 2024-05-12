import { appointmentschema, durationschema, startschema } from "../validation/appointmentschema.js"
import { parseError, isAppointmentConflict, hasUpcomingAppointments } from "../utils/helpers.js";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";

// @desc Create new appointment
// @route POST /appointment
// @access Private
const createNewAppointment = async (req, res) => {
    try {
        const {
            customer,
            employee,
            service_name,
            duration,
            start,
        } = req.body;

        const startAsDate = new Date(start);
        await startschema.validateAsync(startAsDate);
        await durationschema.validateAsync(duration);

        const endAsDate = new Date(startAsDate.getTime() + duration * 60000);

        if ((endAsDate - startAsDate) / 60000 !== parseInt(duration)) {
            return res.status(400).json({ message: "Enddatum muss duration minutes after Startdatum liegen", context: { key: "end" } });
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
            return res.status(400).json({ message: "Konnte Kunde nicht in Datenbank finden" });
        }

        const foundEmployee = await User.findById(employee).lean().exec();

        if (!foundEmployee) {
            return res.status(400).json({ message: "Konnte Mitarbeiter nicht in Datenbank finden" });
        }

        if (!foundEmployee.roles.includes("Employee")) {
            return res.status(400).json({ message: "Die gefundene Person ist nicht als Mitarbeiter autorisiert" });
        }

        if (await hasUpcomingAppointments(customer)) {
            return res.status(400).json({ message: "Termin konnte nicht gebucht werden, da der Kunde bereits einen offenen Termin besitzt" });
        }

        if (await isAppointmentConflict(employee, customer, startAsDate, endAsDate)) {
            return res.status(400).json({ message: "Termin konnte nicht gebucht werden, da er im Konflikt mit einem existierenden Termins steht" });
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
            return res.status(400).json({ message: "Konnte keinen neuen Termin in der Datenbank anlegen." });
        }

        return res.status(200).json({ message: "Termin gebucht" });
    } catch (err) {
        return res.status(400).send(parseError(err));
    }
};

export {
    createNewAppointment,
}