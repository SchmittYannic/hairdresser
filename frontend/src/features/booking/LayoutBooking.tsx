import { Outlet } from "react-router-dom"
import CookieConsent from "src/components/CookieConsent";
import { logo } from "src/assets"
import "src/features/booking/Booking.scss";

const LayoutBooking = () => {
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
            <CookieConsent />
        </div>
    )
}

export default LayoutBooking