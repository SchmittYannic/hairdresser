import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Resetpasswordtoken from "../models/Resetpasswordtoken.js";
import loginschema from "../validation/loginschema.js";
import { emailschema, passwordschema } from "../validation/userschema.js";
import { sessionizeUser, parseError, birthdayToString } from "../utils/helpers.js";

// @desc login
// @route POST /
// @access Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { CookieConsent } = req.cookies;

        if (!CookieConsent) {
            return res.status(400).json({ message: "Bitte erlauben Sie essentielle Cookies", context: { key: "CookieConsent" } });
        }

        const CookieConsentParsed = JSON.parse(CookieConsent);

        if (!CookieConsentParsed.necessary) {
            res.clearCookie("CookieConsent");
            return res.status(400).json({ message: "Bitte erlauben Sie essentielle Cookies", context: { key: "CookieConsent" } });
        }

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
    try {
        if (!session || !session.user) {
            return res.status(200).json({ message: "Nutzer nicht angemeldet" })
        }

        const { userId } = session.user

        const foundUser = await User.findById(userId).lean().exec();

        const cookieInfo = {
            cookie_expires: session.cookie._expires,
            cookie_originalMaxAge: session.cookie.originalMaxAge,
        }

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

        return res.status(200).json({ message: "Nutzer ist noch angemeldet", userInfo, cookieInfo });
    } catch (error) {
        return res.status(400).json({ message: "Fehler in loggedIn function", cookieInfo });
    }
}

// @desc resetPasswordEmail
// @route POST /reset
// @access Public
const resetPasswordEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        await emailschema.validateAsync(email);

        const foundUser = await User.findOne({ email: email.toLowerCase() }).lean().exec();

        if (!foundUser) {
            return res.status(400).json({ message: "Email ist nicht registriert", context: { label: "email" } });
        }

        if (foundUser.roles.includes("Employee") || foundUser.roles.includes("Admin")) {
            return res.status(401).json({ message: "Unauthorized - Kontaktieren Sie den Headadmin für eine Wiederherstellung des Passworts" });
        }

        const resetPasswordToken = jwt.sign(
            {
                "UserInfo": {
                    "userId": foundUser._id,
                }
            },
            process.env.RESET_PASSWORD_TOKEN_SECRET,
            {
                expiresIn: process.env.EXPIRATION_RESET_TOKEN + "s"
            }
        );

        const userToken = await Resetpasswordtoken.findOne({ user: foundUser._id }).exec();

        if (!userToken) {
            const createdToken = await Resetpasswordtoken.create({ user: foundUser._id, resetPasswordToken });
            if (createdToken) {
                req.resetPasswordToken = resetPasswordToken;
                req.email = foundUser.email;
                next();
            } else {
                return res.status(400).json({ message: "Fehler bei Erstellung und Speicherung des Tokens in Datenbank" });
            }
        } else {
            userToken.resetPasswordToken = resetPasswordToken;
            userToken.createdAt = Date.now();
            const updatedToken = await userToken.save();
            if (updatedToken) {
                req.resetPasswordToken = resetPasswordToken;
                req.email = foundUser.email;
                next();
            } else {
                return res.status(400).json({ message: "Fehler bei Änderung und Speicherung des Tokens in Datenbank" });
            }
        }
    } catch (err) {
        return res.status(400).send({ ...parseError(err) });
    }
}

const sendResetPasswordEmail = (req, res) => {
    const { resetPasswordToken, email } = req;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.BUSINESS_EMAIL_ADDRESS,
            pass: process.env.BUSINESS_EMAIL_PASSWORD,
        }
    });

    const url = process.env.FRONTEND_URL;

    const mailOptions = {
        from: `hairdresser <${process.env.BUSINESS_EMAIL_ADDRESS}>`,
        to: email,
        subject: "hairdresser Password Reset",
        text: `Sie haben eine Passwortzurücksetzung beantragt.
        Bitte folgen Sie dem angegebenen Link, um Ihr Passwort zurückzusetzen.

        ${url}/terminbuch/termine/reset/${resetPasswordToken} 

        Wenn Sie keinen Reset angefordert haben, können Sie sich gerne hier an unseren Support wenden:
        INSERT HERE`,
        html: `<p>Sie haben eine Passwortzurücksetzung beantragt.
        Bitte folgen Sie dem angegebenen Link, um Ihr Passwort zurückzusetzen.</p>

        <a href="${url}/terminbuch/termine/reset/${resetPasswordToken} " target="_blank">Passwort zurücksetzen</a>

        <p>Wenn Sie keinen Reset angefordert haben, können Sie sich gerne hier an unseren Support wenden:</p>
        <a href="INSERT HERE" target="_blank">Support Kontaktieren</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            logEvents(`ResetPasswordEmail Error for: ${email}`, "MailErrorLog.log");
            return res.status(400).json({ message: "E-Mail konnte nicht gesendet werden. Bitte wenden Sie sich an den Support" });
        } else {
            return res.status(200).json({ message: "Eine E-Mail mit Anweisungen zum Zurücksetzen Ihres Passworts wurde gesendet" });
        }
    });
}

// @desc resetPasswordEmail
// @route GET /reset/:resetPasswordToken
// @access Public
const isResetTokenValid = async (req, res) => {
    try {
        const { resetPasswordToken } = req.params;

        if (!resetPasswordToken) {
            return res.status(401).json({ message: "Kein resetPasswordToken parameter gesendet" });
        }

        const foundToken = await Resetpasswordtoken.findOne({ resetPasswordToken }).lean().exec();

        if (!foundToken) {
            return res.status(401).json({ message: "Token nicht in Datenbank gefunden" });
        }

        return res.status(200).json({ message: "Valider Token" });
    } catch (error) {
        return res.status(400).json({ message: "Fehler in isResetTokenValid" });
    }
}

// @desc resetPasswordEmail
// @route PATCH /reset/:resetPasswordToken
// @access Public
const resetPassword = async (req, res) => {
    try {
        const { resetPasswordToken } = req.params;
        const { password } = req.body;

        if (!resetPasswordToken) {
            return res.status(401).json({ message: "Kein resetPasswordToken parameter gesendet" });
        }

        await passwordschema.validateAsync(password);

        const foundToken = await Resetpasswordtoken.findOne({ resetPasswordToken }).exec();

        if (!foundToken) {
            return res.status(401).json({ message: "Token nicht in Datenbank gefunden" });
        }

        const foundUser = await User.findById(foundToken.user).exec();

        if (!foundUser) {
            return res.status(401).json({ message: "Nutzer des Tokens nicht in Datenbank gefunden" });
        }

        const hashedPwd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));

        foundUser.password = hashedPwd;

        const updateUser = await foundUser.save();

        if (!updateUser) {
            return res.status(400).json({ message: "Fehler beim Speichern des neuen Passworts in Datenbank" });
        }

        const result = await foundToken.deleteOne();

        if (!result) {
            return res.status(400).json({ message: "Fehler bei Löschung des Tokens aus Datenbank" })
        }

        return res.status(200).json({ message: "Passwort erfolgreich geändert" })
    } catch (err) {
        return res.status(400).send({ ...parseError(err) });
    }
}

export {
    login,
    logout,
    loggedIn,
    resetPasswordEmail,
    sendResetPasswordEmail,
    isResetTokenValid,
    resetPassword
}