const requiredMsg = "Bitte ausfüllen";

const availableEmployees = [
    "66401720b8fb65815722ab38",
    "6642f2eb23c54c42bf7d7f30",
    "66403f93eef48844b222489c",
    "6642f2ca23c54c42bf7d7f2d",
];

const availableCustomers = [
    "663d237c7d1a2c31d6b93f78",
    "663eab633c669f771382674e",
];

const availableServices = [
    "Schneiden",
    "KindU6",
    "KindU12",
    "TeenU14",
    "Cornrows",
    "Rasur",
    "Greyblending",
    "Dauerwelle",
    "Coloration",
];

const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

const openingtimes = {
    monday: {
        openingtime: "",
        closingtime: "",
    },
    tuesday: {
        openingtime: "08:30",
        closingtime: "18:00",
    },
    wednesday: {
        openingtime: "08:30",
        closingtime: "18:00",
    },
    thursday: {
        openingtime: "08:30",
        closingtime: "18:00",
    },
    friday: {
        openingtime: "08:30",
        closingtime: "18:00",
    },
    saturday: {
        openingtime: "08:00",
        closingtime: "13:00",
    },
    sunday: {
        openingtime: "",
        closingtime: "",
    },
};

const employeesInfo = {
    "66401720b8fb65815722ab38": {
        firstname: "Mirjam",
        lastname: "Schmid",
        skills: ["Schneiden", "KindU12"],
    },
    "6642f2eb23c54c42bf7d7f30": {
        firstname: "Nina",
        lastname: "Helm",
        skills: ["Schneiden"],
    },
    "66403f93eef48844b222489c": {
        firstname: "Hannah",
        lastname: "Geier",
        skills: ["Schneiden", "TeenU14"],
    },
    "6642f2ca23c54c42bf7d7f2d": {
        firstname: "Simone",
        lastname: "Homann",
        skills: ["Schneiden"],
    }
};

export {
    availableCustomers,
    availableEmployees,
    availableServices,
    requiredMsg,
    weekdays,
    openingtimes,
    employeesInfo,
}