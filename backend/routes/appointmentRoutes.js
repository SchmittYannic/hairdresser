import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { createNewAppointment, getAllFreeTimeSlotsByEmployee } from "../controllers/appointmentController.js";

const router = express.Router();

router.route("/")
    //.get(requireAuth, getAppointments)
    .post(requireAuth, createNewAppointment)

router.route("/filter")
    .post(requireAuth, getAllFreeTimeSlotsByEmployee)

export default router;