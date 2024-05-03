import { useState } from "react"
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import { logo } from "../../assets"
import "./Booking.scss"

export type activeTabType = "login" | "register" | "reset";

const Booking = () => {

    const [activeTab, setActiveTab] = useState<activeTabType>("login");

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
                        </span>
                        <span className="pageHeaderInfo">
                            {activeTab === "login" && "Hier können Sie Ihre nächsten Termine schnell und einfach online buchen - rund um die Uhr, auch am Wochenende."}
                        </span>
                        <hr className="horizontal-ruler" />
                    </div>
                </div>
                <div className="pageMaster">
                    <div className={`page${activeTab !== "login" ? " excluded" : ""}`}>
                        <Login callback={setActiveTab} />
                    </div>

                    <div className={`page${activeTab !== "register" ? " excluded" : ""}`}>
                        <Register callback={setActiveTab} />
                    </div>

                    <div className={`page${activeTab !== "reset" ? " excluded" : ""}`}>
                        <ResetPassword callback={setActiveTab} />
                    </div>
                </div>
                <div className="bookingFooter"></div>
            </main>
        </div>
    )
}

export default Booking