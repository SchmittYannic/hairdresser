import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";
import session from "express-session";
import sessionConfig from "./config/session.js";
import cron from "node-cron"
import { logger, logEvents } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import rootRoute from "./routes/root.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import { moveExpiredAppointments } from "./utils/helpers.js";
import { insertFakeData } from "./utils/fakedata.js";

/* Configurations */
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 3500;
console.log(process.env.NODE_ENV);
connectDB();
const db = mongoose.connection;
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
app.use(session(sessionConfig(db)));
app.set("trust proxy", 1);
cron.schedule("0 0 * * * *", async () => await moveExpiredAppointments(db));
//cron.schedule("*/10 * * * * *", async () => await insertFakeData(20))

/* ROUTES */
app.use("/", rootRoute);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/application", applicationRoutes);

app.use(errorHandler);

// listening for the open event
db.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    // stream watching if document from users collection is deleted
    const userDeleteStream = db.collection("users").watch([
        { $match: { operationType: "delete" } }
    ]);

    // whenever a user gets deleted trigger cascade delete for all associated active and archived appointments
    userDeleteStream.on("change", async (change) => {
        try {
            const deletedUserId = change.documentKey._id;

            const appointmentsCollection = db.collection("appointments");
            const archivedAppointmentsCollection = db.collection("archivedappointments");

            await appointmentsCollection.deleteMany({ customer: deletedUserId });
            await archivedAppointmentsCollection.deleteMany({ customer: deletedUserId });
        } catch (err) {
            logEvents(`"userDeleteStream": ${change.documentKey._id}\t${err}`, "streamErrLog.log");
        }
    })
});

// listen to error
db.on("error", err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
});