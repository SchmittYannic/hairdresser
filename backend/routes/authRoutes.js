import express from "express";
import {
    login,
    logout,
    loggedIn,
    resetPasswordEmail,
    sendResetPasswordEmail,
    isResetTokenValid,
    resetPassword,
} from "../controllers/authController.js";
import requireAuth from "../middleware/requireAuth.js"

const router = express.Router();

router.route("/")
    .get(loggedIn)
    .post(login)
    .delete(requireAuth, logout)

router.route("/reset")
    .post(resetPasswordEmail, sendResetPasswordEmail)

router.route("/reset/:resetPasswordToken")
    .get(isResetTokenValid)
    .patch(resetPassword)

export default router;