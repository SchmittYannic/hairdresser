import { logEvents } from "../middleware/logger.js";
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

export const getEarliestAppointment = (arr) => {
    if (arr.length === 0) return null;

    let earliestDateObj = arr[0];
    let earliestDate = arr[0].start; // new Date(arr[0].start);

    // Loop through the array to find the earliest date
    for (let i = 1; i < arr.length; i++) {
        const currentDate = arr[i].start;
        if (currentDate < earliestDate) {
            earliestDate = currentDate;
            earliestDateObj = arr[i];
        }
    }

    return earliestDateObj;
}

export const sortByDate = (arr, property, sortOrder = "asc") => {
    if (sortOrder === "asc") {
        arr.sort((a, b) => {
            const dateA = new Date(a[property]);
            const dateB = new Date(b[property]);
            return dateA.getTime() - dateB.getTime()
        })
    } else if (sortOrder === "desc") {
        arr.sort((a, b) => {
            const dateA = new Date(a[property]);
            const dateB = new Date(b[property]);
            return dateB.getTime() - dateA.getTime()
        })
    } else {
        throw Error("Error in sortByDate: unknown sortOrder. Can only be asc or desc")
    }
}

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
};

export const moveExpiredAppointments = async (db) => {
    try {
        const appointmentsCollection = db.collection("appointments");

        const archivedAppointmentsCollection = db.collection("archivedappointments");

        // Fetch expired appointments
        const expiredAppointments = await appointmentsCollection.find({ end: { $lt: new Date() } }).toArray();

        // Modify each expired appointment object to remove "remarks" property
        const modifiedAppointments = expiredAppointments.map(appointment => {
            const { remarks, ...rest } = appointment;
            return rest;
        });

        await archivedAppointmentsCollection.insertMany(modifiedAppointments);

        await appointmentsCollection.deleteMany({ _id: { $in: expiredAppointments.map(appt => appt._id) } })

        console.log("Expired appointments moved to archivedAppointments collection.");
    } catch (err) {
        logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
    }
};