import { differenceInMinutes } from "date-fns";

import { employeesInfo, weekdaysEnglish } from "src/constants";
import { arrayChildrenType } from "../components/ImageSlider";
import { EmployeesInfoType, ServiceInfoType, WeeklyStartEndTimesType } from "./types";

const splitArray = (array: arrayChildrenType[], number: number): arrayChildrenType[][] => {
    const arrLength = array.length;

    if (!arrLength) throw Error("Error in splitArray function: arrLength cant be null or undefined")
    if (arrLength % number !== 0) throw Error("Error in splitArray function: arrLength must be evenly divisible by number without leaving a remainder")

    const result = [];
    for (let i = 0; i < array.length; i += number) {
        result.push(array.slice(i, i + number));
    }
    return result;
}

const repeatArray = (array: arrayChildrenType[], number: number): arrayChildrenType[] => {
    const result: arrayChildrenType[] = [];
    for (let i = 0; i < number; i++) {
        result.push(...array);
    }
    return result;
}

const padArray = (array: arrayChildrenType[], number: number): arrayChildrenType[] => {
    const arrLength = array.length;
    if (number > arrLength) throw Error("Error in padArray function: num cant be bigger than arrLength")
    const start = array.slice(0, number);
    const end = array.slice(arrLength - number, arrLength);
    const result: arrayChildrenType[] = [...end, ...array, ...start];
    return result
}

const insertSpace = (string: string) => {
    if (typeof string !== "string" || string.length <= 5) {
        return string; // return the string as is if it's not a string or its length is 5 or less
    }

    return string.slice(0, 5) + " " + string.slice(5);
}

const isOpenNow = (): boolean => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Check if it's Tuesday to Friday and within 08:30 - 18:00
    if (dayOfWeek >= 2 && dayOfWeek <= 5 && (hours > 8 || (hours === 8 && minutes >= 30)) && (hours < 18 || (hours === 18 && minutes <= 0))) {
        return true;
    }

    // Check if it's Saturday and within 08:00 - 13:00
    if (dayOfWeek === 6 && (hours > 8 || (hours === 8 && minutes >= 0)) && (hours < 13 || (hours === 13 && minutes <= 0))) {
        return true;
    }

    // Shop is closed
    return false;
}

//parseTime in HH:MM format
const parseTime = (timeString: string) => {
    const timePattern = /^\d{2}:\d{2}$/;
    if (!timePattern.test(timeString)) {
        throw new Error("Invalid time format. Please provide time in HH:MM format.");
    }
    const [hours, minutes] = timeString.split(":");
    return new Date(0, 0, 0, parseInt(hours), parseInt(minutes));
}

const getPossibleSlotsPerWeekday = (serviceInfo: ServiceInfoType, slotLength: number = 30): Record<string, number> => {
    const { employee_id } = serviceInfo;
    const slotsMap: Record<string, number> = {};

    if (employee_id !== "") {
        const { working_hours } = employeesInfo[employee_id as keyof EmployeesInfoType]

        weekdaysEnglish.forEach((day, index) => {
            const { start, end } = working_hours[day as keyof WeeklyStartEndTimesType];

            if (!start || !end) {
                slotsMap[index] = 0;
                return;
            }

            const startTime = parseTime(start);
            const endTime = parseTime(end);
            const minutesOpen = differenceInMinutes(endTime, startTime);

            const possibleSlots = Math.floor(minutesOpen / slotLength);
            slotsMap[index] = possibleSlots;
        })
    } else {
        const { service_name } = serviceInfo;

        for (const employee in employeesInfo) {
            const { skills, working_hours } = employeesInfo[employee as keyof EmployeesInfoType]

            if (!(service_name !== "" && skills.includes(service_name))) continue

            weekdaysEnglish.forEach((day, index) => {
                const { start, end } = working_hours[day as keyof WeeklyStartEndTimesType];

                if (!start || !end) {
                    slotsMap[index] = slotsMap[index] || 0
                    return;
                }

                const startTime = parseTime(start);
                const endTime = parseTime(end);
                const minutesOpen = differenceInMinutes(endTime, startTime);

                const possibleSlots = Math.floor(minutesOpen / slotLength);
                slotsMap[index] = (slotsMap[index] || 0) + possibleSlots;
            })
        }
    }

    return slotsMap;
};

export {
    splitArray,
    repeatArray,
    padArray,
    insertSpace,
    isOpenNow,
    parseTime,
    getPossibleSlotsPerWeekday,
}