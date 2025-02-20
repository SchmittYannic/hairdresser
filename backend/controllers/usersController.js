import bcrypt from "bcrypt";
import User from "../models/User.js";
import { userschema, passwordschema, birthdayschema, emailschema, titleschema, lastnameschema, firstnameschema, phonenumberschema, reminderemailschema, birthdayemailschema, newsletterschema } from "../validation/userschema.js";
import { sessionizeUser, parseError, birthdayToString } from "../utils/helpers.js";

/**
 * @async
 * @function createNewUser
 * @description Creates new user based on information of the provided request body.
 * @route POST /users
 * @access Public
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.title - The title of the user.
 * @param {string} req.body.lastname - The last name of the user.
 * @param {string} req.body.firstname - The first name of the user.
 * @param {string} req.body.birthday - The birthday of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.phonenumber - The phone number of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {boolean} req.body.reminderemail - Whether the user wants reminder emails.
 * @param {boolean} req.body.birthdayemail - Whether the user wants birthday emails.
 * @param {boolean} req.body.newsletter - Whether the user wants newsletters.
 * @param {Object} req.cookies - The cookies of the request.
 * @param {string} req.cookies.cookieConsent - The cookie consent status.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object with status and JSON data.
 * @throws {Error} If there is an error during user creation.
 */
async function createNewUser(req, res) {
    try {
        const {
            title, lastname, firstname, birthday, email, phonenumber, password, reminderemail, birthdayemail, newsletter,
        } = req.body;
        const { cookieConsent } = req.cookies;

        if (!cookieConsent) {
            return res.status(400).json({ message: "Bitte erlauben Sie essentielle Cookies", context: { key: "cookieConsent" } });
        }

        const cookieConsentParsed = JSON.parse(cookieConsent);

        if (!cookieConsentParsed.necessary) {
            res.clearCookie("cookieConsent");
            return res.status(400).json({ message: "Bitte erlauben Sie essentielle Cookies", context: { key: "cookieConsent" } });
        }

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

        const userInfo = {
            ...sessionUser,
            title: user.title,
            lastname: user.lastname,
            firstname: user.firstname,
            birthday: birthdayToString(user.birthday),
            phonenumber: user.phonenumber,
            reminderemail: user.reminderemail,
            birthdayemail: user.birthdayemail,
            newsletter: user.newsletter,
        };

        const cookieInfo = {
            cookie_expires: req.session.cookie._expires,
            cookie_originalMaxAge: req.session.cookie.originalMaxAge,
        };

        return res.status(201).json({ message: "Registrierung erfolgreich", userInfo, cookieInfo });
    } catch (err) {
        return res.status(400).send(parseError(err));
    }
}

/**
 * @async
 * @function updateUser
 * @description Updates the user information based on the provided request body and session data.
 * @route PATCH /users
 * @access Private
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - The request body containing user information to update
 * @param {string} req.body.title - The new title of the user
 * @param {string} req.body.email - The new email of the user
 * @param {string} req.body.oldpassword - The old password of the user
 * @param {string} req.body.password - The new password of the user
 * @param {string} req.body.lastname - The new last name of the user
 * @param {string} req.body.firstname - The new first name of the user
 * @param {string} req.body.birthday - The new birthday of the user in DD.MM.YYYY format
 * @param {string} req.body.phonenumber - The new phone number of the user
 * @param {boolean} req.body.reminderemail - The new reminder email preference of the user
 * @param {boolean} req.body.birthdayemail - The new birthday email preference of the user
 * @param {boolean} req.body.newsletter - The new newsletter preference of the user
 * @param {Object} req.session - The session object containing user session data
 * @param {Object} req.session.user - The user session data
 * @param {string} req.session.user.userId - The ID of the user
 * @param {Object} req.session.cookie - The session cookie object
 * @param {Date} req.session.cookie._expires - The expiration date of the session cookie
 * @param {number} req.session.cookie.originalMaxAge - The original max age of the session cookie
 * @param {Object} res - Express response object
 * 
 * @returns {Promise<Object>} The response object containing a status code and a message
 * 
 * @throws {Error} If any validation or database operation fails
 */
async function updateUser(req, res) {
    const cookieInfo = {
        cookie_expires: req.session.cookie._expires,
        cookie_originalMaxAge: req.session.cookie.originalMaxAge,
    };

    try {
        const { userId } = req.session.user;

        const {
            title, email, oldpassword, password, lastname, firstname, birthday, phonenumber, reminderemail, birthdayemail, newsletter,
        } = req.body;

        const foundUser = await User.findById(userId).exec();

        if (!foundUser) {
            return res.status(400).json({ message: "Konnte Nutzer id nicht in Datenbank finden", cookieInfo });
        }

        //user wants to change password
        if (password !== "" || oldpassword !== "") {
            //user tries changing password without giving oldpassword
            if (password !== "" && oldpassword === "") {
                return res.status(400).json({ message: "Passwortänderung benötigt altes Passwort", context: { label: "oldpassword" }, cookieInfo });
            }
            //user tries changing password without giving a new password
            if (password === "" && oldpassword !== "") {
                return res.status(400).json({ message: "Passwortänderung benötigt neues Passwort", context: { label: "password" }, cookieInfo });
            }
            //see if password fits the schema
            await passwordschema.validateAsync(password);
            //see if oldpassword matches password in database
            const match = await bcrypt.compare(oldpassword, foundUser.password);
            if (!match) {
                return res.status(401).json({ message: "Ungültiges Passwort", context: { label: "oldpassword" }, cookieInfo });
            }
            //if matches hash new password
            const newHashedPw = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
            foundUser.password = newHashedPw;
        }

        if (birthday !== "") {
            const parts = birthday.split(".");
            const birthdayAsDate = new Date(parseInt(parts[2], 10),
                parseInt(parts[1], 10) - 1,
                parseInt(parts[0], 10));
            await birthdayschema.validateAsync(birthdayAsDate);
            foundUser.birthday = birthdayAsDate;
        }

        if (email !== foundUser.email) {
            await emailschema.validateAsync(email);

            const duplicateEmail = await User.findOne({ email: email.toLowerCase() }).lean().exec();

            if (duplicateEmail) {
                return res.status(409).json({ message: "E-Mail wird bereits verwendet", context: { label: "email" } });
            }
            foundUser.email = email;
        }
        if (title !== foundUser.title) {
            await titleschema.validateAsync(title);
            foundUser.title = title;
        }
        if (lastname !== foundUser.lastname) {
            await lastnameschema.validateAsync(lastname);
            foundUser.lastname = lastname;
        }
        if (firstname !== foundUser.firstname) {
            await firstnameschema.validateAsync(firstname);
            foundUser.firstname = firstname;
        }
        if (phonenumber !== foundUser.phonenumber) {
            await phonenumberschema.validateAsync(phonenumber);
            foundUser.phonenumber = phonenumber;
        }
        if (reminderemail !== foundUser.reminderemail) {
            await reminderemailschema.validateAsync(reminderemail);
            foundUser.reminderemail = reminderemail;
        }
        if (birthdayemail !== foundUser.birthdayemail) {
            await birthdayemailschema.validateAsync(birthdayemail);
            foundUser.birthdayemail = birthdayemail;
        }
        if (newsletter !== foundUser.newsletter) {
            await newsletterschema.validateAsync(newsletter);
            foundUser.newsletter = newsletter;
        }

        const updateUser = await foundUser.save();

        const sessionUser = sessionizeUser(updateUser);

        req.session.user = sessionUser;

        const userInfo = {
            ...sessionUser,
            title: updateUser.title,
            lastname: updateUser.lastname,
            firstname: updateUser.firstname,
            birthday: birthdayToString(updateUser.birthday),
            phonenumber: updateUser.phonenumber,
            reminderemail: updateUser.reminderemail,
            birthdayemail: updateUser.birthdayemail,
            newsletter: updateUser.newsletter,
        };

        return res.status(200).json({ message: "Änderung erfolgreich", userInfo, cookieInfo });
    } catch (err) {
        return res.status(400).send({ ...parseError(err), cookieInfo });
    }
}

/**
 * @async
 * @function deleteUser
 * @description Deletes a user account after verifying the provided password.
 * @route PATCH /users/delete
 * @access Private
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.session - The session object.
 * @param {Object} req.session.user - The user object in the session.
 * @param {string} req.session.user.userId - The ID of the user to be deleted.
 * @param {Object} req.session.cookie - The cookie object in the session.
 * @param {Date} req.session.cookie._expires - The expiration date of the cookie.
 * @param {number} req.session.cookie.originalMaxAge - The original max age of the cookie.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.password - The password provided for verification.
 * @param {Object} res - The response object.
 * 
 * @returns {Promise<void>} - A promise that resolves to void.
 * 
 * @throws {Error} - Throws an error if there is an issue with session destruction.
 */
async function deleteUser(req, res) {
    const cookieInfo = {
        cookie_expires: req.session.cookie._expires,
        cookie_originalMaxAge: req.session.cookie.originalMaxAge,
    };

    try {
        const { userId } = req.session.user;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Accountlöschung muss mit Passwort bestätigt werden", context: { label: "password" }, cookieInfo });
        }

        const foundUser = await User.findById(userId).exec();

        if (!foundUser) {
            return res.status(400).json({ message: "Konnte Nutzer id nicht in Datenbank finden", cookieInfo });
        }

        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) {
            return res.status(401).json({ message: "Ungültiges Passwort", context: { label: "password" }, cookieInfo });
        }

        const result = await foundUser.deleteOne();

        if (!result) {
            return res.status(500).json({ message: "Fehler bei Löschung des Accounts aus Datenbank", cookieInfo });
        }

        req.session.destroy(err => {
            if (err) throw (err);
            res.clearCookie(process.env.SESS_NAME);
            res.status(200).json({ message: "Account erfolgreich gelöscht" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Fehler bei Löschung des Accounts", cookieInfo });
    }
}

export {
    createNewUser,
    updateUser,
    deleteUser,
}