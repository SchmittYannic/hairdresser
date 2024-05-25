import { MouseEvent, useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import useSessionContext from "../../hooks/useSessionContext";
import useWindowSize from "../../hooks/useWindowSize";
import useLogout from "../../hooks/useLogout";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import AGB from "./AGB";
import Dashboard from "./Dashboard";
import Countdown from "../../components/Countdown";
import AsyncButton from "../../components/ui/AsyncButton";
import Dialog from "../../components/ui/Dialog";
import { logo } from "../../assets";
import "./Booking.scss";

const Booking = () => {

    const { activeTab, setActiveTab } = useSessionContext();
    const {
        mutate: triggerLogout,
        isLoading: isLogoutLoading,
    } = useLogout();
    const windowSize = useWindowSize();
    const isLgScreen = windowSize.width && windowSize.width > 640 ? true : false;
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    const isDashboard = (activeTab === "dashboard" || activeTab === "editUser" || activeTab === "deleteUser" || activeTab === "pastappointments" || activeTab === "services" || activeTab === "bookdate" || activeTab === "confirmdate");
    const isAppointmentBooking = (activeTab === "services" || activeTab === "bookdate" || activeTab === "confirmdate");
    const isSmallPage = activeTab === "reset" || activeTab === "pastappointments" || activeTab === "deleteUser"

    const handleLogoutClicked = () => {
        setIsLogoutDialogOpen(true);
    };

    const handleLogoutNoClicked = () => {
        setIsLogoutDialogOpen(false);
    };

    const handleLogoutYesClicked = () => {
        setIsLogoutDialogOpen(false);
        triggerLogout();
    };

    const handleStep1Clicked = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveTab("services");
    };

    useEffect(() => {
        return () => setIsLogoutDialogOpen(false);
    }, []);

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
            <main className={`booking-content${isSmallPage ? " small" : ""}`}>
                <div className="pageHeader">
                    <div className="col-1-1">
                        <span className="pageHeaderCaption">
                            {activeTab === "login" && "Willkommen auf unserem Online-Terminbuch!"}
                            {activeTab === "register" && "Registrierung"}
                            {activeTab === "reset" && "Passwort zurücksetzen"}
                            {activeTab === "agb" && "AGB und Datenschutzerklärung"}
                            {activeTab === "dashboard" && "Terminübersicht"}
                            {activeTab === "editUser" && "Benachrichtigungen und Kontaktdaten ändern"}
                            {activeTab === "deleteUser" && "Konto löschen"}
                            {activeTab === "pastappointments" && "Vergangene Termine"}
                            {isAppointmentBooking && "Neuer Termin"}
                        </span>
                        <span className="pageHeaderInfo">
                            {activeTab === "login" && "Hier können Sie Ihre nächsten Termine schnell und einfach online buchen - rund um die Uhr, auch am Wochenende."}
                        </span>
                        {
                            isAppointmentBooking && isLgScreen &&
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
                            isDashboard && !isSmallPage &&
                            <div className="sessionTimeoutLabelContainer">
                                <Countdown />
                            </div>
                        }
                        {
                            isDashboard && !isSmallPage &&
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

                {
                    isLogoutDialogOpen && isDashboard &&
                    <Dialog setDialog={setIsLogoutDialogOpen}>
                        <div className="dialog__caption ">
                            Terminbuch beenden
                        </div>
                        <div className="dialog__content">
                            <span className="label">
                                Wollen Sie sich aus dem Terminbuch ausloggen?
                            </span>
                        </div>
                        <div className="dialog__button__container">
                            <AsyncButton
                                className="bookingFormButton"
                                type="button"
                                onClick={handleLogoutYesClicked}
                                isLoading={isLogoutLoading}
                                disabled={isLogoutLoading}
                            >
                                <span className="icon-container">
                                    <ImCheckmark aria-hidden />
                                </span>
                                <span className="icon-gap">
                                    ja
                                </span>
                            </AsyncButton>
                            <button
                                className="bookingFormButton"
                                type="button"
                                onClick={handleLogoutNoClicked}
                            >
                                <span className="icon-container">
                                    <FaPlus aria-hidden style={{ transform: "rotate(45deg)" }} />
                                </span>
                                <span className="icon-gap">
                                    nein
                                </span>
                            </button>
                        </div>
                    </Dialog>
                }

                <div className="bookingFooter"></div>
            </main>
        </div>
    )
}

export default Booking