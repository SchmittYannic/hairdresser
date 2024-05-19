import { employeesInfo, openingtimes, weekdays } from "../config/constants.js";

const getOpeningTimes = (dayofweek) => {
    const { openingtime, closingtime } = openingtimes[dayofweek]
    return { openingtime, closingtime }
};

const generateTimeSlotsOfDay = (date, duration, employee) => {
    const dayIndex = date.getDay();
    const dayOfWeek = weekdays[dayIndex];
    const { openingtime, closingtime } = getOpeningTimes(dayOfWeek);
    //if not open today return empty array
    if (openingtime === "" || closingtime === "") return []

    //construct closingtime Date
    const closingtimeParts = closingtime.split(":");
    const closingTimeHours = parseInt(closingtimeParts[0]);
    const closingTimeMinutes = parseInt(closingtimeParts[1]);
    const closingtimeDate = new Date(date.getTime());
    closingtimeDate.setHours(closingTimeHours);
    closingtimeDate.setMinutes(closingTimeMinutes);
    closingtimeDate.setSeconds(0);
    closingtimeDate.setMilliseconds(0);

    console.log("closingtimeDate: ", closingtimeDate)

    //construct startingtime Date
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const openingtimeParts = openingtime.split(":");
    const openingtimeHours = parseInt(openingtimeParts[0]);
    const openingtimeMinutes = parseInt(openingtimeParts[1]);
    let currentTime = new Date(date.getTime());

    //if the time of currentTime is before the openingtime then set the time to the opening time
    if (hours < openingtimeHours || (hours === openingtimeHours && minutes < openingtimeMinutes)) {
        currentTime.setHours(openingtimeHours);
        currentTime.setMinutes(openingtimeMinutes);
        currentTime.setSeconds(0);
        currentTime.setMilliseconds(0);
    } else {
        //set time to the beginning of the next slot 12:07 turns into 12:30 and 13:40 into 14:00
        //currently fixed slots of 30 minutes
        if (minutes < 30) {
            currentTime.setMinutes(30);
            currentTime.setSeconds(0);
            currentTime.setMilliseconds(0);
        } else if (minutes > 30) {
            currentTime.setHours(hours + 1);
            currentTime.setMinutes(0);
            currentTime.setSeconds(0);
            currentTime.setMilliseconds(0);
        } else {
            currentTime.setSeconds(0);
            currentTime.setMilliseconds(0);
        }
    }

    const timeSlots = [];

    while (currentTime < closingtimeDate) {
        //construct appointmentEnd Date which is duration after currentTime
        const appointmentEnd = new Date(currentTime.getTime() + duration * 60000);
        //if appointmentEnd would fall after closingtime break the loop
        if (appointmentEnd > closingtimeDate) break
        //push to timeslot
        timeSlots.push({
            employee: employee,
            employeeFirstname: employeesInfo[employee].firstname,
            employeeLastname: employeesInfo[employee].lastname,
            startDate: currentTime,
            endDate: appointmentEnd
        });
        currentTime = appointmentEnd;
    }

    return timeSlots
};

//generateAllTimeSlots for the next upcoming days
//amountOfDays to generate f.e. next 30 days
//duration of the timeslot f.e. duration of 30 min
const generateAllTimeSlots = (amountOfDays, duration, employee) => {
    const today = new Date();
    const millisecondsInADay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    const allTimeSlots = []
    //call function to get free timeslots for today
    const timeslotsToday = generateTimeSlotsOfDay(today, duration, employee);
    allTimeSlots.push(...timeslotsToday);

    for (let i = 1; i <= amountOfDays; i++) {
        const startDay = new Date(today.getTime());
        startDay.setHours(0, 0, 0, 0);
        const currentDate = new Date(startDay.getTime() + i * millisecondsInADay);
        //call function to get free timeslots for next days
        const timeslotsDate = generateTimeSlotsOfDay(currentDate, duration, employee);
        allTimeSlots.push(...timeslotsDate);
    }

    return allTimeSlots
};

const doTimeIntervalsOverlap = (slot, appointment) => {
    return slot.startDate < appointment.end && slot.endDate > appointment.start;
}

const filterAvailableTimeSlots = (slots, bookedAppointments) => {
    return slots.filter(slot => {
        // Check if the slot overlaps with any booked appointment
        for (let appointment of bookedAppointments) {
            if (doTimeIntervalsOverlap(slot, appointment)) {
                //console.log("slot: ", slot)
                //console.log("overlaps with: ", appointment)
                return false; // Overlaps, so exclude this slot
            }
        }
        return true; // No overlap found, include this slot
    });
}

const generateFreeTimeSlots = (amountOfDays, duration, appointments, employee) => {
    const allTimeSlots = generateAllTimeSlots(amountOfDays, duration, employee);
    const freeTimeSlots = filterAvailableTimeSlots(allTimeSlots, appointments);
    return freeTimeSlots
}

export {
    generateFreeTimeSlots
}