import { Outlet } from "react-router-dom"
import { useState } from "react";
import Cookies from "js-cookie";
import CookieConsent from "src/components/CookieConsent";
import { logo } from "src/assets"
import "src/features/booking/Booking.scss";

const LayoutBooking = () => {

    const [isCookieConsent, setIsCookieConsent] = useState(typeof Cookies.get("CookieConsent") === "string" ? true : false);

    return (
        <div id="booking">
            <header className="header">
                <div className="headerInlay">
                    <img
                        className="headerImage"
                        src={logo}
                        alt="hairdresser logo"
                    />
                </div>
            </header>

            <Outlet />
            {!isCookieConsent && <CookieConsent callback={setIsCookieConsent} />}
        </div>
    )
}

export default LayoutBooking