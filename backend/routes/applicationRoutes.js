import express from "express";
import { saveNewApplication } from "../controllers/applicationController.js";

const router = express.Router();

router.route("/")
    .post(saveNewApplication)

export default router;