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