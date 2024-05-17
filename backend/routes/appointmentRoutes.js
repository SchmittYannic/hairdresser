import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import {
    getUpcomingAppointmentOfUser,
    createNewAppointment,
    getAllFreeTimeSlotsByEmployee,
    getArchivedAppointmentsOfUser,
    deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.route("/")
    .get(requireAuth, getUpcomingAppointmentOfUser)
    .post(requireAuth, createNewAppointment)

router.route("/resource/:id")
    .delete(requireAuth, deleteAppointment)

router.route("/filter")
    .post(requireAuth, getAllFreeTimeSlotsByEmployee)

router.route("/archive")
    .get(requireAuth, getArchivedAppointmentsOfUser)

export default router;