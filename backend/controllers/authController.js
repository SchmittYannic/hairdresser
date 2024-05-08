import bcrypt from "bcrypt"
import User from "../models/User.js"
import loginschema from "../validation/loginschema.js"

// @desc login
// @route POST /login
// @access Public
const login = async (req, res) => {
    try {
        await loginschema.validateAsync(req.body);

        const { email, password } = req.body;

        const foundUser = await User.findOne({ email: email.toLowerCase() }).lean().exec();

        if (!foundUser) {
            return res.status(401).json({ message: "E-Mail-Adresse ist nicht registriert", key: "email" });
        }

        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) {
            return res.status(401).json({ message: "Ungültiges Passwort", key: "password" });
        }

        return res.status(200).json({ message: "login success" })
    } catch (err) {
        if (err.name === "ValidationError") {
            const errMsg = err.details.reduce((acc, error) => acc + error.message, "");
            const errKey = err.details.reduce((acc, error) => acc + error.context.key, "");
            return res.status(400).json({ message: errMsg, key: errKey });
        } else {
            return res.status(400).json({ message: "Etwas ist schiefgelaufen" });
        }
    }
}

export {
    login,
}