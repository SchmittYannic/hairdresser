import bcrypt from "bcrypt";
import User from "../models/User.js";
import userschema from "../validation/userschema.js";

// @desc Create new user
// @route POST /users
// @access Public
const createNewUser = async (req, res) => {
    try {
        const { email } = req.body

        const duplicateEmail = await User.findOne({ email: email.toLowerCase() }).lean().exec();

        if (duplicateEmail) {
            return res.status(409).json({ message: "E-Mail wird bereits verwendet", key: "email" });
        }
        await userschema.validateAsync(req.body);
    } catch (err) {
        if (err.name === "ValidationError") {
            const errMsg = err.details.reduce((acc, error) => acc + error.message, "");
            const errKey = err.details.reduce((acc, error) => acc + error.context.key, "");
            return res.status(400).json({ message: errMsg, key: errKey });
        } else {
            return res.status(400).json({ message: "Etwas ist schiefgelaufen" });
        }
    }

    try {
        const {
            title,
            lastname,
            firstname,
            birthday,
            email,
            phonenumber,
            password,
            reminderemail,
            birthdayemail,
            newsletter,
        } = req.body

        const hashedPwd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));

        const user = await User.create({
            title,
            lastname,
            firstname,
            birthday,
            email: email.toLowerCase(),
            phonenumber,
            password: hashedPwd,
            reminderemail,
            birthdayemail,
            newsletter,
        });

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