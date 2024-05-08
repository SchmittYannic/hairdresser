import * as Yup from "yup";

const requiredMsg = "Bitte ausfüllen";

const email = Yup.string().email("ungültiges Email-Format")
    .required(requiredMsg)
    .max(80, "Email darf nicht mehr als 80 Zeichen lang sein");

const password = Yup.string()
    .required(requiredMsg)
    .max(80, "password darf nicht mehr als 80 Zeichen lang sein")
    .matches(/^.{6,16}$/, "Passwort muss zwischen 6 und 16 Zeichen lang sein")
    .matches(/.*[A-Z].*/, "Passwort muss mindestens einen Großbuchstaben enthalten")
    .matches(/.*[a-z].*/, "Passwort muss mindestens einen Kleinbuchstaben enthalten")
    .matches(/.*\d.*/, "Passwort muss mindestens eine Ziffer enthalten")
    .matches(/.*[!@#$%^&*_\-].*/, "Passwort muss mindestens ein Sonderzeichen enthalten");

// const passwordrepeat = Yup.string()
//     .required(requiredMsg)
//     .matches(/^.{6,16}$/, "Password must be between 6 and 16 characters long")
//     .matches(/.*[A-Z].*/, "Password must contain at least one uppercase letter")
//     .matches(/.*[a-z].*/, "Password must contain at least one lowercase letter")
//     .matches(/.*\d.*/, "Password must contain at least one digit")
//     .matches(/.*[!@#$%^&*_\-].*/, "Password must contain at least one special character");

const passwordrepeat = Yup.string()
    .required(requiredMsg)
    .max(80, "password darf nicht mehr als 80 Zeichen lang sein")
    .oneOf([Yup.ref("password")], "Feld muss mit Passwort übereinstimmen")

const lastname = Yup.string()
    .max(80, "Nachname darf nicht mehr als 80 Zeichen lang sein")
    .required(requiredMsg);

const firstname = Yup.string()
    .max(80, "Vorname darf nicht mehr als 80 Zeichen lang sein")
    .required(requiredMsg);

const title = Yup.string()
    .matches(/^(Herr|Frau|Divers)$/, requiredMsg)
    .required(requiredMsg);

// const birthday = Yup.date()
//     .max(new Date(), "Birthday cant be in the future")
//     .required("Birthday is required");

const birthday = Yup.string()
    .required(requiredMsg)
    .test("matches-pattern", "Das Geburtsdatum muss im Format tt.mm.jjjj angegeben werden", value => {
        if (!value) return false;
        return /^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[012]).\d{4}$/.test(value);
    })
    .test("is-date", "Das Geburtsdatum muss im Format tt.mm.jjjj angegeben werde", value => {
        if (!value) return false;
        const parts = value.split(".");
        const date = new Date(parseInt(parts[2], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[0], 10));
        return !isNaN(date.getTime());
    })
    .test("is-not-future", "Das Geburtsdatum kann nicht in der Zukunft liegen", value => {
        if (!value) return false;
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

const agb = Yup.boolean().required(requiredMsg)
    .test("is-true", "Bitte bestätigen", function (value) {
        return value === true;
    });

const reminderemail = Yup.boolean().required(requiredMsg);

const birthdayemail = Yup.boolean().required(requiredMsg);

const newsletter = Yup.boolean().required(requiredMsg);

export default Yup.object().shape({
    email,
    password,
    passwordrepeat,
    title,
    lastname,
    firstname,
    birthday,
    phonenumber,
    agb,
    reminderemail,
    birthdayemail,
    newsletter,
});
