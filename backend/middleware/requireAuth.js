const requireAuth = (req, res, next) => {
    console.log(req.session)

    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default requireAuth