import { availableEmployees, proposalDateRangeValues, availableServices, weekdaysEnglish } from "../constants"

export type UserDataType = {
    title: string,
    email: string,
    password: string,
    passwordrepeat: string,
    lastname: string,
    firstname: string,
    birthday: string,
    phonenumber: string,
    agb: boolean,
    reminderemail: boolean,
    birthdayemail: boolean,
    newsletter: boolean,
}

export type LoginDataType = {
    email: string,
    password: string,
}

export type ResetPasswordType = {
    password: string,
    passwordrepeat: string,
}

export type EditUserType = {
    title: string,
    email: string,
    oldpassword?: string,
    password?: string,
    passwordrepeat?: string,
    lastname: string,
    firstname: string,
    birthday?: string,
    phonenumber: string,
    reminderemail: boolean,
    birthdayemail: boolean,
    newsletter: boolean,
}

export type FilterFreeSlotDataType = {
    employee: string,
    duration: number,
    service_name: string,
}

export type FreeTimeslotType = {
    employee: string,
    employeeFirstname: string,
    employeeLastname: string,
    startDate: string,
    endDate: string,
}

export type AppointmentDataType = {
    customer: string,
    employee: string,
    service_name: string,
    duration: number,
    start: Date | undefined,
    remarks: string,
}

export type AppointmentType = {
    _id: string,
    employee: string,
    customer: string,
    service_name: AvailableServicesKeyType,
    duration: number,
    remarks: string,
    start: string,
    end: string,
    createdAt: string,
    updatedAt: string,
}

export type AvailableEmployeesKeyType = typeof availableEmployees[number];

export type AvailableServicesKeyType = typeof availableServices[number];

export type EmployeeType = {
    id: AvailableEmployeesKeyType,
    firstname: string,
    lastname: string,
    skills: AvailableServicesKeyType[],
    img: string,
    imglink: string,
    imgtitle: string,
    description: string[],
    quote: string,
};

export type EmployeesInfoType = {
    [key: AvailableEmployeesKeyType]: {
        firstname: string,
        lastname: string,
        skills: AvailableServicesKeyType[],
    }
}

export type AllServicesInfoType = {
    [key: AvailableServicesKeyType]: {
        service_label: string,
        service_duration: number,
    }
}

export type OfferedServiceType = {
    service_id: number,
    service_name: AvailableServicesKeyType,
    service_label: string,
    service_duration: number,
    employees: string[],
    service_info?: ReactElement,
}

export type ProposalDateRangeValuesType = typeof proposalDateRangeValues[number];

export type FilterTimeType = {
    min: ProposalDateRangeValuesType,
    max: ProposalDateRangeValuesType,
}

export type SameSiteOptionType = "none" | "None" | "lax" | "Lax" | "strict" | "Strict" | undefined;

export type ApplicationDataType = {
    field_0: string;
    field_1: string;
    field_2: string;
    field_3: string;
    field_4: string;
    field_5: string;
    field_6: string;
    field_7: FileList;
    optin_field_0: boolean;
}

export type WeekdaysEnglishType = typeof weekdaysEnglish[number];

export type OpeningTimesType = {
    [key in WeekdaysEnglishType]: {
        openingtime: string,
        closingtime: string,
    }
}