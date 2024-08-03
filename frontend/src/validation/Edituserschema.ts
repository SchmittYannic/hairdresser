import * as Yup from "yup";

const requiredMsg = "Bitte ausfüllen";

const email = Yup.string().email("ungültiges Email-Format")
    .required(requiredMsg)
    .max(80, "Email darf nicht mehr als 80 Zeichen lang sein");

const oldpassword = Yup.string()
    .max(80, "Passwort darf nicht mehr als 80 Zeichen lang sein")

const password = Yup.string()
    .max(80, "Passwort darf nicht mehr als 80 Zeichen lang sein")
    .matches(/^.{0}$|^.{6,80}$/, "Passwort muss zwischen 6 und 80 Zeichen lang sein")
    .matches(/^(?=.*[A-Z]).*|^$/, "Passwort muss mindestens einen Großbuchstaben enthalten")
    .matches(/^(?=.*[A-Z]).*|^$/, "Passwort muss mindestens einen Kleinbuchstaben enthalten")
    .matches(/^(?=.*\d).*|^$/, "Passwort muss mindestens eine Ziffer enthalten")
    .matches(/^(?=.*[!@#$%^&*_\-]).*|^$/, "Passwort muss mindestens ein Sonderzeichen enthalten");

const passwordrepeat = Yup.string()
    .max(80, "Passwort darf nicht mehr als 80 Zeichen lang sein")
    .oneOf([Yup.ref("password")], "Feld muss mit neues Passwort übereinstimmen")

const lastname = Yup.string()
    .max(80, "Nachname darf nicht mehr als 80 Zeichen lang sein")
    .required(requiredMsg);

const firstname = Yup.string()
    .max(80, "Vorname darf nicht mehr als 80 Zeichen lang sein")
    .required(requiredMsg);

const title = Yup.string()
    .matches(/^(Herr|Frau|Divers)$/, requiredMsg)
    .required(requiredMsg);

const birthday = Yup.string()
    .test("matches-pattern", "Das Geburtsdatum muss im Format tt.mm.jjjj angegeben werden", value => {
        if (!value) return true;
        return /^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[012]).\d{4}$/.test(value);
    })
    .test("is-date", "Das Geburtsdatum muss im Format tt.mm.jjjj angegeben werden", value => {
        if (!value) return true;
        const parts = value.split(".");
        const date = new Date(parseInt(parts[2], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[0], 10));
        return !isNaN(date.getTime());
    })
    .test("is-not-future", "Das Geburtsdatum kann nicht in der Zukunft liegen", value => {
        if (!value) return true;
        const parts = value.split(".");
        const date = new Date(parseInt(parts[2], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[0], 10));
        const now = new Date();
        return now > date;
    });

const phonenumber = Yup.string()
    .required(requiredMsg)
    .matches(/^\d+$/, "Handynummer darf nur aus Zahlen bestehen")
    .matches(/^\d{7,15}$/, "Handynummer muss zwischen 7 und 15 Ziffern lang sein");

const reminderemail = Yup.boolean().required(requiredMsg);

const birthdayemail = Yup.boolean().required(requiredMsg);

const newsletter = Yup.boolean().required(requiredMsg);

export default Yup.object().shape({
    email,
    password,
    passwordrepeat,
    oldpassword,
    title,
    lastname,
    firstname,
    birthday,
    phonenumber,
    reminderemail,
    birthdayemail,
    newsletter,
})