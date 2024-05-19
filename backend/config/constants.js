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
    "66487c4b5449f171e57fbc6d",
    "66487e0e0daf9b1d94aed31e",
    "66488557cc66dcca2fbd3e63",
    "664886bfbc82571d3bf5ca69",
    "6648872a0a2b60302384ed29",
    "664887986291b8beda1f513f",
    "664888193d648080743038af",
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
        openingtime: undefined,
        closingtime: undefined,
    },
    tuesday: {
        openingtime: new Date(Date.UTC(0, 0, 0, 7, 30)),
        closingtime: new Date(Date.UTC(0, 0, 0, 17, 0)),
    },
    wednesday: {
        openingtime: new Date(Date.UTC(0, 0, 0, 7, 30)),
        closingtime: new Date(Date.UTC(0, 0, 0, 17, 0)),
    },
    thursday: {
        openingtime: new Date(Date.UTC(0, 0, 0, 7, 30)),
        closingtime: new Date(Date.UTC(0, 0, 0, 17, 0)),
    },
    friday: {
        openingtime: new Date(Date.UTC(0, 0, 0, 7, 30)),
        closingtime: new Date(Date.UTC(0, 0, 0, 17, 0)),
    },
    saturday: {
        openingtime: new Date(Date.UTC(0, 0, 0, 7, 30)),
        closingtime: new Date(Date.UTC(0, 0, 0, 17, 0)),
    },
    sunday: {
        openingtime: undefined,
        closingtime: undefined,
    },
};

const employeesInfo = {
    "66401720b8fb65815722ab38": {
        firstname: "Mirjam",
        lastname: "Schmid",
        skills: ["Schneiden", "KindU12", "TeenU14", "Greyblending", "Dauerwelle", "Coloration"],
    },
    "6642f2eb23c54c42bf7d7f30": {
        firstname: "Nina",
        lastname: "Helm",
        skills: ["Schneiden", "KindU6", "KindU12", "TeenU14", "Cornrows", "Rasur"],
    },
    "66403f93eef48844b222489c": {
        firstname: "Hannah",
        lastname: "Geier",
        skills: ["Schneiden", "TeenU14", "Cornrows", "Rasur", "Greyblending", "Dauerwelle", "Coloration"],
    },
    "6642f2ca23c54c42bf7d7f2d": {
        firstname: "Simone",
        lastname: "Homann",
        skills: ["Schneiden", "TeenU14", "Cornrows", "Rasur"],
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