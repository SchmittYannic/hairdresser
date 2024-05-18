const requireAuth = async (req, res, next) => {
    // console.log("session: ", req.session)
    // console.log("user: ", req.session.user)
    // console.log("session id: ", req.session.sessionID)

    if (req.session) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default requireAuth