import express from "express";
import { createNewUser, updateUser } from "../controllers/usersController.js";
import requireAuth from "../middleware/requireAuth.js"
import { signupLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

router.route("/")
    .post(signupLimiter, createNewUser)
    .patch(requireAuth, updateUser)

export default router;