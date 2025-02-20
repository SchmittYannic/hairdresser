const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        const { cookieConsent } = req.cookies;

        if (!cookieConsent) {
            req.session.destroy();

            return res.status(401).json({ message: "Bitte erlauben Sie essentielle Cookies", context: { key: "cookieConsent" } });
        }

        const cookieConsentParsed = JSON.parse(cookieConsent);

        if (!cookieConsentParsed.necessary) {

            req.session.destroy();

            res.clearCookie("cookieConsent");
            return res.status(401).json({ message: "Bitte erlauben Sie essentielle Cookies", context: { key: "cookieConsent" } });
        }

        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default requireAuth