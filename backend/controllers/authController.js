import bcrypt from "bcrypt"
import User from "../models/User.js"
import loginschema from "../validation/loginschema.js"
import { sessionizeUser } from "../utils/helpers.js";

// @desc login
// @route POST /
// @access Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        await loginschema.validateAsync({ email, password });

        const foundUser = await User.findOne({ email: email.toLowerCase() }).lean().exec();

        if (!foundUser) {
            return res.status(401).json({ message: "E-Mail-Adresse ist nicht registriert", context: { key: "email" } });
        }

        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) {
            return res.status(401).json({ message: "Ungültiges Passwort", context: { key: "password" } });
        }

        const sessionUser = sessionizeUser(foundUser)
        req.session.user = sessionUser
        console.log(req.session)

        return res.status(200).json({ message: "login success", sessionUser })
    } catch (err) {
        return res.status(400).send(parseError(err));
    }
}

// @desc logout
// @route DELETE /
// @access Public
const logout = (req, res) => {
    const { session } = req

    try {
        const user = session.user;
        console.log(user)
        if (user) {
            session.destroy(err => {
                if (err) throw (err);
                res.clearCookie(process.env.SESS_NAME);
                res.send(user);
            });
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        res.status(422).send(parseError(err));
    }
}

// @desc loggedIn
// @route GET /
// @access Public
const loggedIn = (req, res) => {
    const { session } = req
    return res.status(200).json({ message: "ok", ...session.user });
}

export {
    login,
    logout,
    loggedIn,
}