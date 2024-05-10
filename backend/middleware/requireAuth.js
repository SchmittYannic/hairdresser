const requireAuth = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        next(); // User is authenticated, continue to next middleware
    } else {
        res.status(401).json({ message: "Unauthorized" }); // User is not authenticated
    }
}

export default requireAuth