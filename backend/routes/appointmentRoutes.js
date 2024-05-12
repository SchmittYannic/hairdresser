import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { createNewAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.route("/")
    .get(requireAuth)
    .post(requireAuth, createNewAppointment)

export default router;