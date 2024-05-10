import express from "express";
import { createNewUser, updateUser } from "../controllers/usersController.js";
import requireAuth from "../middleware/requireAuth.js"

const router = express.Router();

router.route("/")
    .post(createNewUser)
    .patch(requireAuth, updateUser)

export default router;