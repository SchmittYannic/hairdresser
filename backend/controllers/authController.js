import bcrypt from "bcrypt"
import User from "../models/User.js"
import loginschema from "../validation/loginschema.js"
import { sessionizeUser, parseError } from "../utils/helpers.js";

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

        const userInfo = {
            ...sessionUser,
            lastname: foundUser.lastname,
            firstname: foundUser.firstname,
            cookie_expires: req.session.cookie._expires,
            cookie_originalMaxAge: req.session.cookie.originalMaxAge,
        }

        return res.status(200).json({ message: "login success", userInfo })
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

        if (user) {
            session.destroy(err => {
                if (err) throw (err);
                res.clearCookie(process.env.SESS_NAME);
                res.send(user);
            });
        } else {
            throw new Error("Session already expired");
            //return res.status(200).json({ message: "session expired" })
        }
    } catch (err) {
        return res.status(422).send(parseError(err));
    }
}

// @desc loggedIn
// @route GET /
// @access Public
const loggedIn = (req, res) => {
    const { session } = req
    return res.status(200).json({ message: "Nutzer noch logged in", ...session.user });
}

export {
    login,
    logout,
    loggedIn,
}