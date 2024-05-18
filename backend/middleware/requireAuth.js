const requireAuth = (req, res, next) => {
    console.log("session: ", req.session)
    console.log("user: ", req.session.user)
    console.log(req)

    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default requireAuth