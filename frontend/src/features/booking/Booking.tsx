import { logo } from "../../assets"
import "./Booking.scss"

const Booking = () => {
    return (
        <div id="booking">
            <header className="header">
                <div className="headerInlay">
                    <img
                        className="headerImage"
                        src={logo}
                        alt=""
                    />
                </div>
            </header>
            <main className="booking-content">
                <div className="pageHeader">
                    <div className="col-1-1">
                        <span className="pageHeaderCaption">
                            Willkommen auf unserem Online-Terminbuch!
                        </span>
                        <span className="pageHeaderInfo">
                            Hier können Sie Ihre nächsten Termine schnell und einfach online buchen - rund um die Uhr, auch am Wochenende.
                        </span>
                        <hr className="horizontal-ruler" />
                    </div>
                </div>
                <div className="pageMaster">
                    <div className="page">
                        <div className="col-2-1">
                            <span className="captionLabel">
                                Sie sind bereits registriert?
                            </span>
                            <span className="infoLabel">
                                Dann melden Sie sich bitte hier mit Ihrer E-Mail-Adresse und dem Passwort an:
                            </span>
                            <form className="bookingForm">
                                <div className="bookingFormRow">
                                    <span className="bookingFormLabel">
                                        E-Mail-Adresse
                                    </span>
                                    <div className="bookingFormField">
                                        <div className="textfield">
                                            <input
                                                autoCapitalize="none"
                                                type="text"
                                                maxLength={80}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bookingFormRow">
                                    <span className="bookingFormLabel">
                                        Passwort
                                    </span>
                                    <div className="bookingFormField">
                                        <div className="textfield">
                                            <input
                                                autoCapitalize="none"
                                                type="password"
                                                autoComplete="on"
                                                maxLength={80}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <a
                                    className="passwordForgottenLink"
                                    href=""
                                >
                                    Passwort vergessen?
                                </a>
                                <button
                                    className="bookingFormButton"
                                    type="button"
                                >
                                    <span>Anmelden</span>
                                </button>
                            </form>
                        </div>
                        <div className="col-2-2">
                            <span className="captionLabel">
                                Sie nutzen das Online-Terminbuch zum ersten Mal?
                            </span>
                            <span className="infoLabel">
                                Dann registrieren Sie sich bitte zunächst mit Ihrer E-Mail-Adresse und Handynummer. Ihre Vorteile:
                            </span>
                            <ul className="bullet-list">
                                <li>
                                    Buchen und ändern Sie Ihre nächsten Termine in Ruhe vom Heim-PC oder mit dem Smartphone von unterwegs
                                </li>
                                <li>
                                    Übersicht über Ihre aktuellen und vergangenen Termine
                                </li>
                                <li>
                                    Terminerinnerung per E-Mail mit Übernahmemöglichkeit in Ihren Kalender - so vergessen Sie keinen Termin
                                </li>
                            </ul>
                            <form className="bookingForm">
                                <div className="buttonRow">
                                    <button
                                        className="bookingFormButton"
                                        type="button"
                                    >
                                        <span>Registrieren</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="clear-row"></div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Booking