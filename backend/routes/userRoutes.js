import express from "express";
import { createNewUser, updateUser, deleteUser } from "../controllers/usersController.js";
import requireAuth from "../middleware/requireAuth.js"
import { signupLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

router.route("/")
    .post(signupLimiter, createNewUser)
    .patch(requireAuth, updateUser)

router.route("/delete")
    .post(requireAuth, deleteUser)

export default router;