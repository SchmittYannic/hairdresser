import MongoStore from "connect-mongo"

const sessionConfig = (db) => {

    const cookieSetting = process.env.NODE_ENV === "production" ? {
        domain: ".project-domain.de",
        sameSite: "none",
        secure: true,
        maxAge: parseInt(process.env.SESS_LIFETIME) * 1000,
        httpOnly: true,
    } : {
        sameSite: "lax",
        secure: false,
        maxAge: parseInt(process.env.SESS_LIFETIME) * 1000,
        httpOnly: true,
    }

    return {
        name: process.env.SESS_NAME,
        secret: process.env.SESS_SECRET,
        proxy: true,
        saveUninitialized: false, //This complies with laws that require permission before setting a cookie.
        resave: true,
        rolling: true,
        store: MongoStore.create({
            client: db.getClient(),
            collection: "session",
            ttl: parseInt(process.env.SESS_LIFETIME) ?? 20 * 60 //time to life in seconds.
        }),
        cookie: cookieSetting
    }
}

export default sessionConfig