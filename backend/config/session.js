import MongoStore from "connect-mongo"

const sessionConfig = (db) => {
    return {
        name: process.env.SESS_NAME,
        secret: process.env.SESS_SECRET,
        saveUninitialized: false, //This complies with laws that require permission before setting a cookie.
        resave: true,
        rolling: true,
        store: MongoStore.create({
            client: db.getClient(),
            collection: "session",
            ttl: parseInt(process.env.SESS_LIFETIME) ?? 20 * 60 //time to life in seconds.
        }),
        cookie: {
            sameSite: "none",
            secure: true, //process.env.NODE_ENV === "production",
            maxAge: parseInt(process.env.SESS_LIFETIME) * 1000,
            httpOnly: true,
        }
    }
}

export default sessionConfig