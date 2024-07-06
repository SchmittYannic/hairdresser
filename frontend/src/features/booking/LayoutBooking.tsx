import { Outlet } from "react-router-dom"
import useSessionContext from "src/hooks/useSessionContext";
import CookieConsent from "src/components/CookieConsent";
import { logo } from "src/assets"
import "src/features/booking/Booking.scss";

const LayoutBooking = () => {

    const { isCookieConsent } = useSessionContext();

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
            {!isCookieConsent && <CookieConsent />}
        </div>
    )
}

export default LayoutBooking