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

const employeesInfo = {
    "687e51eda45abc802a17a8fb": {
        firstname: "Tobias",
        lastname: "Schneider",
        skills: [
            "Schneiden",
            "KindU6",
            "KindU12",
            "TeenU14",
            "Cornrows",
            "Rasur",
            "Greyblending",
            "Dauerwelle",
            "Coloration",
        ],
        working_hours: {
            "monday": { "start": null, "end": null },
            "tuesday": { "start": "08:30", "end": "18:00" },
            "wednesday": { "start": "08:30", "end": "18:00" },
            "thursday": { "start": "08:30", "end": "18:00" },
            "friday": { "start": "08:30", "end": "18:00" },
            "saturday": { "start": "08:30", "end": "13:00" },
            "sunday": { "start": null, "end": null }
        },
    },
    "66401720b8fb65815722ab38": {
        firstname: "Mirjam",
        lastname: "Schmid",
        skills: ["Schneiden", "KindU12", "TeenU14", "Greyblending", "Dauerwelle", "Coloration"],
        working_hours: {
            "monday": { "start": null, "end": null },
            "tuesday": { "start": "08:30", "end": "18:00" },
            "wednesday": { "start": "08:30", "end": "18:00" },
            "thursday": { "start": "08:30", "end": "18:00" },
            "friday": { "start": "08:30", "end": "18:00" },
            "saturday": { "start": "08:00", "end": "13:00" },
            "sunday": { "start": null, "end": null }
        },
    },
    "6642f2eb23c54c42bf7d7f30": {
        firstname: "Nina",
        lastname: "Helm",
        skills: ["Schneiden", "KindU6", "KindU12", "TeenU14", "Cornrows", "Rasur"],
        working_hours: {
            "monday": { "start": null, "end": null },
            "tuesday": { "start": "08:30", "end": "15:00" },
            "wednesday": { "start": "08:30", "end": "15:00" },
            "thursday": { "start": "08:30", "end": "15:00" },
            "friday": { "start": "08:30", "end": "15:00" },
            "saturday": { "start": "08:00", "end": "13:00" },
            "sunday": { "start": null, "end": null }
        },
    },
    "66403f93eef48844b222489c": {
        firstname: "Hannah",
        lastname: "Geier",
        skills: ["Schneiden", "TeenU14", "Cornrows", "Rasur", "Greyblending", "Dauerwelle", "Coloration"],
        working_hours: {
            "monday": { "start": null, "end": null },
            "tuesday": { "start": "08:30", "end": "18:00" },
            "wednesday": { "start": "08:30", "end": "18:00" },
            "thursday": { "start": "08:30", "end": "18:00" },
            "friday": { "start": "08:30", "end": "18:00" },
            "saturday": { "start": null, "end": null },
            "sunday": { "start": null, "end": null }
        },
    },
    "6642f2ca23c54c42bf7d7f2d": {
        firstname: "Simone",
        lastname: "Homann",
        skills: ["Schneiden", "TeenU14", "Cornrows", "Rasur"],
        working_hours: {
            "monday": { "start": null, "end": null },
            "tuesday": { "start": "10:00", "end": "18:00" },
            "wednesday": { "start": "10:00", "end": "18:00" },
            "thursday": { "start": "10:00", "end": "18:00" },
            "friday": { "start": "10:00", "end": "18:00" },
            "saturday": { "start": "08:00", "end": "13:00" },
            "sunday": { "start": null, "end": null }
        },
    }
};

export {
    availableCustomers,
    availableEmployees,
    availableServices,
    requiredMsg,
    weekdays,
    employeesInfo,
}