import express from "express";
import { login, logout, loggedIn, resetPasswordEmail } from "../controllers/authController.js";
import requireAuth from "../middleware/requireAuth.js"

const router = express.Router();

router.route("/")
    .get(loggedIn)
    .post(login)
    .delete(requireAuth, logout)

router.route("/reset")
    .post(resetPasswordEmail)

export default router;