import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";
import session from "express-session";
import sessionConfig from "./config/session.js";
import { logger, logEvents } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import rootRoute from "./routes/root.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js"

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
app.use(session(sessionConfig(db)));

/* ROUTES */
app.use("/", rootRoute);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/appointment", appointmentRoutes);

app.use(errorHandler);

// listening for the open event
db.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// listen to error
db.on("error", err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});