import { useRef } from "react"
import { MdCookie } from "react-icons/md"
import Cookies from "js-cookie";
import useSessionContext from "src/hooks/useSessionContext"
import useScrolledToBottom from "src/hooks/useScrolledToBottom"
import { SameSiteOptionType } from "src/utils/types";
import "src/components/CookieConsent.scss"

const CookieConsent = () => {

    const { setIsCookieConsent } = useSessionContext();
    const ref = useRef<HTMLDivElement>(null);
    const isScrolledToBottom = useScrolledToBottom(ref);

    const handleAcceptClicked = () => {
        const preferences = {
            timestamp: new Date().toISOString(),
            necessary: true,
        };

        const isProd = Boolean(import.meta.env.PROD) ?? false;

        const cookieOptions = isProd ? {
            expires: 7,
            domain: ".project-domain.de",
            sameSite: "none" as SameSiteOptionType,
            secure: true,
        } : {
            expires: 7,
            sameSite: "lax" as SameSiteOptionType,
            secure: false,
        }

        Cookies.set("CookieConsent", JSON.stringify(preferences), cookieOptions);
        setIsCookieConsent(true);
    };

    return (
        <div className="cookie-consent">
            <div className="cookie-consent-content">
                <div className="cookie-consent-header">
                    <div className="cookie-consent-header-logowrapper">
                        <MdCookie aria-hidden />
                    </div>
                </div>
                <div className="cookie-consent-scrollcontainer">
                    <div
                        ref={ref}
                        className="cookie-consent-bodycontent"
                    >
                        <div className={`cookie-consent-fader${isScrolledToBottom ? "" : " faderactive"}`}></div>
                        <h2>
                            Cookie-Einstellungen
                        </h2>
                        <p>
                            Diese Website verwendet nur essentielle Cookies, die für die Funktionalität der Anwendung erforderlich sind. Diese Cookies sind notwendig für die Autorisierung und Authentifizierung und können daher nicht deaktiviert werden. Durch die weitere Nutzung der Website stimmen Sie der Verwendung dieser Cookies zu.
                        </p>
                    </div>
                </div>
                <div className="cookie-consent-footer">
                    <div className="cookie-consent-footer-buttons">
                        <div className="cookie-consent-footer-buttons-wrapper">
                            <button
                                className="cookie-consent-action-btn"
                                type="button"
                                onClick={handleAcceptClicked}
                            >
                                Einverstanden
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CookieConsent