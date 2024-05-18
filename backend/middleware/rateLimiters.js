import { rateLimit } from "express-rate-limit";
import { logEvents } from "./logger.js";

const signupLimiter = rateLimit({
    windowMs: 1000 * 60 * 60 * 24, // 1 day
    max: 1, // Limit each IP to 1 successful signup request per `window` per day
    message:
        { message: "You already successfully created an account" },
    handler: (req, res, next, options) => {
        // handles what happens once limit is achieved
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errLog.log")
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export {
    signupLimiter,
}