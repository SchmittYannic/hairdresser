import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import useSessionContext from "../../hooks/useSessionContext";
import useLogout from "../../hooks/useLogout";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import AGB from "./AGB";
import Dashboard from "./Dashboard";
import { logo } from "../../assets";
import "./Booking.scss";

export type activeTabType = "login" | "register" | "reset" | "agb" | "dashboard";

const Booking = () => {

    const { userInfo } = useSessionContext();
    const { mutate } = useLogout();
    const [activeTab, setActiveTab] = useState<activeTabType>("login");

    const handleLogoutClicked = () => {
        mutate();
    }

    useEffect(() => {
        if (userInfo.userId === "") {
            setActiveTab("login")
        } else {
            setActiveTab("dashboard");
        }
    }, [userInfo])

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
                        </span>
                        <span className="pageHeaderInfo">
                            {activeTab === "login" && "Hier können Sie Ihre nächsten Termine schnell und einfach online buchen - rund um die Uhr, auch am Wochenende."}
                        </span>
                        <div className="sessionTimeoutLabelContainer">
                            <span className="sessionTimeoutLabel">
                                Logout in:
                            </span>
                        </div>
                        {
                            activeTab === "dashboard" &&
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
                    {activeTab === "login" && <Login callback={setActiveTab} />}
                    {activeTab === "reset" && <ResetPassword callback={setActiveTab} />}
                    {(activeTab === "register" || activeTab === "agb") && <Register activeTab={activeTab} callback={setActiveTab} />}
                    {(activeTab === "register" || activeTab === "agb") && <AGB activeTab={activeTab} callback={setActiveTab} />}
                    {activeTab === "dashboard" && <Dashboard />}
                </div>
                <div className="bookingFooter"></div>
            </main>
        </div>
    )
}

export default Booking