import { Outlet } from "react-router-dom"
import { logo } from "../../assets"
import "./Booking.scss";

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
        </div>
    )
}

export default LayoutBooking