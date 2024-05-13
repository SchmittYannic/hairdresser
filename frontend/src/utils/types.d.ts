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
}

export type FreeTimeslotType = {
    employee: string,
    startDate: Date,
    endDate: Date,
}