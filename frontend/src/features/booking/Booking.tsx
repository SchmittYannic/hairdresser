import { MdLogout } from "react-icons/md";
import useSessionContext from "../../hooks/useSessionContext";
import useLogout from "../../hooks/useLogout";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import AGB from "./AGB";
import Dashboard from "./Dashboard";
import Countdown from "../../components/Countdown";
import { logo } from "../../assets";
import "./Booking.scss";

const Booking = () => {

    const { activeTab } = useSessionContext();
    const { mutate } = useLogout();

    const isDashboard = (activeTab === "dashboard" || activeTab === "editUser")

    const handleLogoutClicked = () => {
        mutate();
    }

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
            <main className={`booking-content${activeTab === "reset" ? " small" : ""}`}>
                <div className="pageHeader">
                    <div className="col-1-1">
                        <span className="pageHeaderCaption">
                            {activeTab === "login" && "Willkommen auf unserem Online-Terminbuch!"}
                            {activeTab === "register" && "Registrierung"}
                            {activeTab === "reset" && "Passwort zurücksetzen"}
                            {activeTab === "agb" && "AGB und Datenschutzerklärung"}
                            {activeTab === "dashboard" && "Terminübersicht"}
                            {activeTab === "editUser" && "Benachrichtigungen und Kontaktdaten ändern"}
                        </span>
                        <span className="pageHeaderInfo">
                            {activeTab === "login" && "Hier können Sie Ihre nächsten Termine schnell und einfach online buchen - rund um die Uhr, auch am Wochenende."}
                        </span>
                        {
                            isDashboard &&
                            <div className="sessionTimeoutLabelContainer">
                                <Countdown />
                            </div>
                        }
                        {
                            isDashboard &&
                            <div className="headerButtonContainer">
                                <button
                                    className="inverseButton bookingButton logoutButton"
                                    type="button"
                                    onClick={handleLogoutClicked}
                                >
                                    <span className="icon-container">
                                        <MdLogout aria-hidden />
                                    </span>
                                    <span className="icon-gap">
                                        Abmelden
                                    </span>
                                </button>
                            </div>
                        }
                        <hr className="horizontal-ruler" />
                    </div>
                </div>
                <div className="pageMaster">
                    {activeTab === "login" && <Login />}
                    {activeTab === "reset" && <ResetPassword />}
                    {(activeTab === "register" || activeTab === "agb") && <Register />}
                    {(activeTab === "register" || activeTab === "agb") && <AGB />}
                    {isDashboard && <Dashboard />}
                </div>
                <div className="bookingFooter"></div>
            </main>
        </div>
    )
}

export default Booking