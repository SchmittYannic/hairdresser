import { parseError } from "../utils/helpers.js";

/**
 * @async
 * @function saveNewApplication
 * @description Saves application to the database.
 * @route POST /application
 * @access Public
 */
async function saveNewApplication(req, res) {
    try {

        /* NOT YET IMPLEMENTED */

        return res.status(201).json({ message: "Bewerbung erfolgreich versendet" });
    } catch (err) {
        return res.status(400).send(parseError(err));
    }
}

export {
    saveNewApplication,
}