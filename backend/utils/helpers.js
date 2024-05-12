import Appointment from "../models/Appointment.js";

export const parseError = err => {
    if (err.isJoi) return err.details[0];
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
};

export const sessionizeUser = user => {
    return {
        userId: user.id ?? user._id.toString(),
        email: user.email,
    };
};

export const birthdayToString = (date) => {
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    };
    return date.toLocaleDateString("de-DE", options)
};

export const isAppointmentConflict = async (employee, customer, start, end) => {
    try {
        // Check if there are any appointments that overlap with the given start and end times
        const employeeConflict = await Appointment.findOne({
            employee,
            $or: [
                { $and: [{ start: { $lte: start } }, { end: { $gt: start } }] }, // New start time falls within existing appointment
                { $and: [{ start: { $lt: end } }, { end: { $gte: end } }] },     // New end time falls within existing appointment
                { $and: [{ start: { $gte: start } }, { end: { $lte: end } }] }    // New appointment completely overlaps with existing appointment
            ]
        });

        const customerConflict = await Appointment.findOne({
            customer,
            $or: [
                { $and: [{ start: { $lte: start } }, { end: { $gt: start } }] }, // New start time falls within existing appointment
                { $and: [{ start: { $lt: end } }, { end: { $gte: end } }] },     // New end time falls within existing appointment
                { $and: [{ start: { $gte: start } }, { end: { $lte: end } }] }    // New appointment completely overlaps with existing appointment
            ]
        });

        return !!employeeConflict || !!customerConflict; // Return true if there's a conflict, false otherwise
    } catch (error) {
        //console.error("Error checking for appointment conflict:", error);
        return false; // Return false if there's an error
    }
};

//check if customer already has an appointment booked
export const hasUpcomingAppointments = async (customer) => {
    try {
        // Find appointments for the specified employee where the end date is in the future
        const upcomingAppointments = await Appointment.find({
            customer,
            end: { $gt: new Date() } // End date is in the future
        });

        return upcomingAppointments.length > 0; // Return true if there are upcoming appointments, false otherwise
    } catch (error) {
        //console.error("Error checking for upcoming appointments:", error);
        return false; // Return false if there's an error
    }
}