import bcrypt from "bcrypt"
import User from "../models/User.js"
import loginschema from "../validation/loginschema.js"
import { sessionizeUser, parseError, birthdayToString } from "../utils/helpers.js";

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

        console.log("saved user: ", req.session.user)

        const userInfo = {
            ...sessionUser,
            title: foundUser.title,
            lastname: foundUser.lastname,
            firstname: foundUser.firstname,
            birthday: birthdayToString(foundUser.birthday),
            phonenumber: foundUser.phonenumber,
            reminderemail: foundUser.reminderemail,
            birthdayemail: foundUser.birthdayemail,
            newsletter: foundUser.newsletter,
        }

        const cookieInfo = {
            cookie_expires: req.session.cookie._expires,
            cookie_originalMaxAge: req.session.cookie.originalMaxAge,
        }

        //res.set('Set-Cookie', `${process.env.SESS_NAME}=${req.sessionID}; Secure; HttpOnly; SameSite=None`);

        return res.status(200).json({ message: "login success", userInfo, cookieInfo })
    } catch (err) {
        return res.status(400).send(parseError(err));
    }
}

// @desc logout
// @route DELETE /
// @access Private
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
const loggedIn = async ({ session }, res) => {
    const cookieInfo = {
        cookie_expires: session.cookie._expires,
        cookie_originalMaxAge: session.cookie.originalMaxAge,
    }

    try {
        const { userId } = session.user

        const foundUser = await User.findById(userId).lean().exec();

        const userInfo = {
            ...session.user,
            title: foundUser.title,
            lastname: foundUser.lastname,
            firstname: foundUser.firstname,
            birthday: birthdayToString(foundUser.birthday),
            phonenumber: foundUser.phonenumber,
            reminderemail: foundUser.reminderemail,
            birthdayemail: foundUser.birthdayemail,
            newsletter: foundUser.newsletter,
        }

        return res.status(200).json({ message: "Nutzer noch logged in", userInfo, cookieInfo });
    } catch (error) {
        return res.status(400).json({ message: "Fehler in loggedIn function", cookieInfo });
    }
}

export {
    login,
    logout,
    loggedIn,
}