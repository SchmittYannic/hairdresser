import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { createNewAppointment, getAppointments } from "../controllers/appointmentController.js";

const router = express.Router();

router.route("/")
    .get(requireAuth, getAppointments)
    .post(requireAuth, createNewAppointment)

export default router;