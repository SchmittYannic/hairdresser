import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
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
import appointmentRoutes from "./routes/appointmentRoutes.js"
import { moveExpiredAppointments } from "./utils/helpers.js";
import { insertFakeData } from "./utils/fakedata.js";
import { promisify } from "util";

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
app.use((req, res, next) => {
    console.log('Session ID:', req.sessionID);
    console.log('Session ID2:', req.session.sessionID);
    console.log('Session user:', req.user);
    console.log('Session user2:', req.session.user);
    console.log('Session Data:', req.session);
    next();
});
app.set("trust proxy", 1);
// app.use((req, _res, next) => {
//     req.session.saveAsync = promisify(req.session.save.bind(req.session));
//     next();
// });
cron.schedule("0 0 * * * *", async () => await moveExpiredAppointments(db));
//cron.schedule("*/10 * * * * *", async () => await insertFakeData(10))
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Set-Cookie');
//     next();
// });
// app.options('*', function (req, res) {
//     //res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Set-Cookie');
//     res.status(200).send();
// });

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