import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo"
import { logger, logEvents } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import rootRoute from "./routes/root.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

/* Configurations */
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 3500;
console.log(process.env.NODE_ENV);
connectDB();
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false, //This complies with laws that require permission before setting a cookie.
    resave: false, //This prevents unnecessary re-saves if the session wasn’t modified.
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URI,
        collection: 'session',
        ttl: parseInt(process.env.SESS_LIFETIME) ?? 20 * 60 //time to life in seconds.
    }),
    cookie: {
        sameSite: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(process.env.SESS_LIFETIME) * 1000
    }
}));

/* ROUTES */
app.use("/", rootRoute);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

// listening for the open event
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// listen to error
mongoose.connection.on("error", err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});