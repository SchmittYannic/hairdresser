import MongoStore from "connect-mongo"

const cookieDev = {
    sameSite: "none",
    secure: false,
    maxAge: parseInt(process.env.SESS_LIFETIME) * 1000,
    httpOnly: true,
}

const cookieProd = {
    domain: ".project-domain.de",
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
    maxAge: parseInt(process.env.SESS_LIFETIME) * 1000,
    httpOnly: true,
}

const sessionConfig = (db) => {
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
        cookie: {
            domain: ".project-domain.de",
            sameSite: "none",
            secure: process.env.NODE_ENV === "production",
            maxAge: parseInt(process.env.SESS_LIFETIME) * 1000,
            httpOnly: true,
        }
    }
}

export default sessionConfig