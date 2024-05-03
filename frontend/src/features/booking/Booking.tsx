import { useState } from "react"
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import AGB from "./AGB";
import { logo } from "../../assets"
import "./Booking.scss"

export type activeTabType = "login" | "register" | "reset" | "agb";

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
                            {activeTab === "agb" && "AGB und Datenschutzerklärung"}
                        </span>
                        <span className="pageHeaderInfo">
                            {activeTab === "login" && "Hier können Sie Ihre nächsten Termine schnell und einfach online buchen - rund um die Uhr, auch am Wochenende."}
                        </span>
                        <hr className="horizontal-ruler" />
                    </div>
                </div>
                <div className="pageMaster">
                    {activeTab === "login" && <Login callback={setActiveTab} />}
                    {activeTab === "reset" && <ResetPassword callback={setActiveTab} />}
                    {(activeTab === "register" || activeTab === "agb") && <Register activeTab={activeTab} callback={setActiveTab} />}
                    {(activeTab === "register" || activeTab === "agb") && <AGB activeTab={activeTab} callback={setActiveTab} />}
                </div>
                <div className="bookingFooter"></div>
            </main>
        </div>
    )
}

export default Booking