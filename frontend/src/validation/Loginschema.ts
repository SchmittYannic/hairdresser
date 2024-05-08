import * as Yup from "yup";

const requiredMsg = "Bitte ausfüllen";

const email = Yup.string().email("ungültiges Email-Format").required(requiredMsg);

const password = Yup.string()
    .required(requiredMsg)

export default Yup.object().shape({
    email,
    password,
})