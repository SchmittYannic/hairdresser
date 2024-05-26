import * as Yup from "yup";

const requiredMsg = "Bitte ausfüllen";

const password = Yup.string()
    .required(requiredMsg)
    .max(80, "Passwort darf nicht mehr als 80 Zeichen lang sein")
    .matches(/^.{6,16}$/, "Passwort muss zwischen 6 und 16 Zeichen lang sein")
    .matches(/.*[A-Z].*/, "Passwort muss mindestens einen Großbuchstaben enthalten")
    .matches(/.*[a-z].*/, "Passwort muss mindestens einen Kleinbuchstaben enthalten")
    .matches(/.*\d.*/, "Passwort muss mindestens eine Ziffer enthalten")
    .matches(/.*[!@#$%^&*_\-].*/, "Passwort muss mindestens ein Sonderzeichen enthalten");

const passwordrepeat = Yup.string()
    .required(requiredMsg)
    .max(80, "Passwort darf nicht mehr als 80 Zeichen lang sein")
    .oneOf([Yup.ref("password")], "Feld muss mit Passwort übereinstimmen")

export default Yup.object().shape({
    password,
    passwordrepeat,
});