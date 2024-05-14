import { MouseEvent } from "react";
import { MdLogout } from "react-icons/md";
import { ImCheckmark } from "react-icons/im";
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

    const { activeTab, setActiveTab } = useSessionContext();
    const { mutate } = useLogout();

    const isDashboard = (activeTab === "dashboard" || activeTab === "editUser" || activeTab === "services" || activeTab === "bookdate" || activeTab === "confirmdate");
    const isAppointmentBooking = (activeTab === "services" || activeTab === "bookdate" || activeTab === "confirmdate");

    const handleLogoutClicked = () => {
        mutate();
    }

    const handleStep1Clicked = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveTab("services");
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
                            {isAppointmentBooking && "Neuer Termin"}
                        </span>
                        <span className="pageHeaderInfo">
                            {activeTab === "login" && "Hier können Sie Ihre nächsten Termine schnell und einfach online buchen - rund um die Uhr, auch am Wochenende."}
                        </span>
                        {
                            isAppointmentBooking &&
                            <div className="progressBar">
                                <div className="progressSteps">
                                    <div className="step">
                                        <a
                                            className={`${activeTab === "services" ? "act" : "done"}`}
                                            href=""
                                            onClick={activeTab !== "services" ? handleStep1Clicked : () => { }}
                                        >
                                            {activeTab === "services"
                                                ? 1 :
                                                <span className="icon-container">
                                                    <ImCheckmark aria-hidden />
                                                </span>
                                            }
                                        </a>
                                        <span>Leistungen wählen</span>
                                    </div>
                                    <div className="step">
                                        <a
                                            className={`${activeTab === "bookdate" ? "act" : activeTab === "services" ? "" : "done"}`}
                                            href=""
                                        >
                                            {(activeTab === "bookdate" || activeTab === "services")
                                                ? 2 :
                                                <span className="icon-container">
                                                    <ImCheckmark aria-hidden />
                                                </span>
                                            }
                                        </a>
                                        <span>Termin wählen</span>
                                    </div>
                                    <div className="step">
                                        <a
                                            className={`${activeTab === "confirmdate" ? "act" : ""}`}
                                            href=""
                                        >
                                            3
                                        </a>
                                        <span>Termin bestätigen</span>
                                    </div>
                                </div>
                            </div>
                        }
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