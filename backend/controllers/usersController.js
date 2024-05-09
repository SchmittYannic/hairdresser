import bcrypt from "bcrypt";
import User from "../models/User.js";
import userschema from "../validation/userschema.js";
import { sessionizeUser, parseError } from "../utils/helpers.js";

// @desc Create new user
// @route POST /users
// @access Public
const createNewUser = async (req, res) => {
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

        await userschema.validateAsync({
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
        });

        const duplicateEmail = await User.findOne({ email: email.toLowerCase() }).lean().exec();

        if (duplicateEmail) {
            return res.status(409).json({ message: "E-Mail wird bereits verwendet", context: { key: "email" } });
        }

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

        if (!user) {
            return res.status(400).json({ message: "Konnte neuen Nutzer nicht in der Datenbank anlegen." });
        }

        const sessionUser = sessionizeUser(user);

        req.session.user = sessionUser;

        return res.status(201).json({ message: "Registrierung erfolgreich", sessionUser });
    } catch (err) {
        return res.status(400).send(parseError(err));
    }
};

export {
    createNewUser,
}