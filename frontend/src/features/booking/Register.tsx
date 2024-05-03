import { MouseEvent } from "react";
import { activeTabType } from "./Booking"

type RegisterPropsType = {
    callback: React.Dispatch<React.SetStateAction<activeTabType>>;
}

const Register = ({ callback }: RegisterPropsType) => {

    const handleAGBClicked = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        callback("agb")
    }

    return (
        <>
            <div className="col-2-1">
                <span className="captionLabel">
                    Ihre Kontaktdaten
                </span>
                <form className="bookingForm">
                    <div className="bookingFormRow">
                        <span className="bookingFormLabel">
                            Anrede
                        </span>
                        <div className="bookingFormField">
                            <select
                                id="genderSelectbox"
                                className="bookingSelectbox"
                            >
                                <option className="selectbox-item">
                                    - Bitte wählen -
                                </option>
                                <option className="selectbox-item">
                                    Herr
                                </option>
                                <option className="selectbox-item">
                                    Frau
                                </option>
                                <option className="selectbox-item">
                                    Divers
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="bookingFormRow">
                        <span className="bookingFormLabel">
                            Nachname
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
                            Vorname
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
                            Geburtstag
                        </span>
                        <div className="bookingFormField">
                            <div className="textfield">
                                <input
                                    autoCapitalize="none"
                                    type="text"
                                    maxLength={10}
                                    placeholder="tt.mm.(jjjj)"
                                />
                            </div>
                        </div>
                    </div>
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
                            Handynummer
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
                </form>
            </div>

            <div className="col-2-2">
                <span className="captionLabel">
                    &nbsp;
                </span>
                <form className="bookingForm">
                    <div className="bookingFormRow">
                        <span className="bookingFormLabel">
                            Passwort
                        </span>
                        <div className="bookingFormField">
                            <div className="textfield">
                                <input
                                    autoCapitalize="none"
                                    type="passwort"
                                    maxLength={80}
                                    autoComplete="on"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bookingFormRow">
                        <span className="bookingFormLabel">
                            Passwort wiederholen
                        </span>
                        <div className="bookingFormField">
                            <div className="textfield">
                                <input
                                    autoCapitalize="none"
                                    type="passwort"
                                    maxLength={80}
                                    autoComplete="on"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bookingFormRow">
                        <span className="bookingFormLabel">
                            AGB und Datenschutz
                        </span>
                        <div className="bookingFormField">
                            <div className="agbCheckbox bookingCheckbox">
                                <input
                                    className="checkbox-cb"
                                    type="checkbox"
                                />
                                <span className="bookingCheckbox-text">
                                    Den Inhalt der&nbsp;
                                    <a
                                        href=""
                                        onClick={handleAGBClicked}
                                    >
                                        AGB und Datenschutzerklärung
                                    </a>
                                    &nbsp;habe ich zur Kenntnis genommen und erkläre mich damit einverstanden.
                                </span>
                            </div>
                        </div>
                    </div>
                    <span className="captionLabel">
                        Benachrichtigungen
                    </span>
                    <div className="container"></div>
                    <div className="container">
                        <div className="newsletterCheckbox bookingCheckbox">
                            <input
                                className="checkbox-cb"
                                type="checkbox"
                            />
                            <span className="bookingCheckbox-text">
                                Ich möchte Terminerinnerungen per E-Mail erhalten.
                            </span>
                        </div>
                        <div className="clear-row"></div>
                        <div className="newsletterCheckbox bookingCheckbox">
                            <input
                                className="checkbox-cb"
                                type="checkbox"
                            />
                            <span className="bookingCheckbox-text">
                                Ich möchte Geburtstagswünsche per E-Mail erhalten.
                            </span>
                        </div>
                        <div className="clear-row"></div>
                        <div className="newsletterCheckbox bookingCheckbox">
                            <input
                                className="checkbox-cb"
                                type="checkbox"
                            />
                            <span className="bookingCheckbox-text">
                                Ich möchte Informationen von II wie Lewring per E-Mail erhalten.
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div className="clear-row"></div>
            <div className="col-1-1">
                <button
                    className="backButton bookingFormButton"
                    type="button"
                    onClick={() => callback("login")}
                >
                    <span>Zurück</span>
                </button>
                <button
                    className="registerButton bookingFormButton"
                    type="button"
                >
                    <span>Registrieren</span>
                </button>
            </div>
        </>
    )
}

export default Register