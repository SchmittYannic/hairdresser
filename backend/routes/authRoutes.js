import express from "express";
import { login, logout, loggedIn } from "../controllers/authController.js";
const router = express.Router();

router.route("/")
    .get(loggedIn)
    .post(login)
    .delete(logout)

export default router;