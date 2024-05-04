import User from "../models/User.js";
import { register } from "../validations/user.js";

// @desc Create new user
// @route POST /users
// @access Public
const createNewUser = async (req, res) => {
    try {
        const { email } = req.body

        const duplicateEmail = await User.findOne({ email }).lean().exec();

        if (duplicateEmail) {
            return res.status(409).json({ message: "E-Mail wird bereits verwendet" });
        }
        await register.validateAsync(req.body);
    } catch (err) {
        if (err.name === "ValidationError") {
            const errMsg = err.details.reduce((acc, error) => acc + error.message, "");
            return res.status(400).json({ message: errMsg });
        } else {
            return res.status(400).json({ message: "Etwas ist schiefgelaufen" });
        }
    }

    try {
        const user = await User.create(req.body);

        if (user) {
            // created user successfully
            return res.status(201).json({ message: `Neuer Nutzer ${user.email} erstellt` });
        } else {
            return res.status(400).json({ message: "Konnte keinen neuen Nutzer erstellen" });
        }
    } catch (error) {
        return res.status(400).json({ message: "Konnte keinen neuen Nutzer erstellen" })
    }
};

export {
    createNewUser,
}