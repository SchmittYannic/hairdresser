import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import {
    getUpcomingAppointmentOfUser,
    createNewAppointment,
    getAllFreeTimeSlotsByEmployee,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.route("/")
    .get(requireAuth, getUpcomingAppointmentOfUser)
    .post(requireAuth, createNewAppointment)

router.route("/filter")
    .post(requireAuth, getAllFreeTimeSlotsByEmployee)

export default router;