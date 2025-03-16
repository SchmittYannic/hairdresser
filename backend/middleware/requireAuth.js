const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        const isProd = process.env.NODE_ENV === "production";

        if (!isProd) {
            next();
        } else {
            const { CookieConsent } = req.cookies;

            if (!CookieConsent) {
                req.session.destroy();

                return res.status(401).json({ message: "Bitte erlauben Sie essentielle Cookies", context: { key: "CookieConsent" } });
            }

            const CookieConsentParsed = JSON.parse(CookieConsent);

            if (!CookieConsentParsed.necessary) {

                req.session.destroy();

                res.clearCookie("CookieConsent");
                return res.status(401).json({ message: "Bitte erlauben Sie essentielle Cookies", context: { key: "CookieConsent" } });
            }

            next();
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default requireAuth