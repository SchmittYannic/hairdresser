import * as Yup from "yup";

const requiredMsg = "Bitte ausfüllen";

const email = Yup.string().email("ungültiges Email-Format")
    .required(requiredMsg)
    .max(80, "Email darf nicht mehr als 80 Zeichen lang sein");

export default Yup.object().shape({
    email,
});