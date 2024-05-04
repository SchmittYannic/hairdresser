import { MouseEvent, useState } from "react";
import { activeTabType } from "./Booking"
import useCreateNewUser from "../../hooks/useCreateNewUser";

type RegisterPropsType = {
    activeTab: activeTabType,
    callback: React.Dispatch<React.SetStateAction<activeTabType>>,
}

const Register = ({ activeTab, callback }: RegisterPropsType) => {

    const { mutate, isLoading, isError, isSuccess } = useCreateNewUser();
    const [title, setTitle] = useState<string>("- Bitte wählen -");
    const [lastname, setLastname] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [birthday, setBirthday] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phonenumber, setPhonenumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordrepeat, setPasswordrepeat] = useState<string>("");
    const [agb, setAgb] = useState<boolean>(false);
    const [reminderemail, setReminderemail] = useState<boolean>(true);
    const [birthdayemail, setBirthdayemail] = useState<boolean>(true);
    const [newsletter, setNewsletter] = useState<boolean>(false);

    const handleAGBClicked = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        callback("agb");
    }

    const handleRegisterClicked = async () => {
        if (title !== "Herr" && title !== "Frau" && title !== "Divers") return

        mutate({
            title,
            "email": "test3@web.de",
            "password": "Uest1dssd-",
            "lastname": "hallo",
            "firstname": "tetsg",
            "birthday": "12.12.2000",
            "phonenumber": "6365464465",
            "reminderemail": false,
            "birthdayemail": false,
            "newsletter": false
        })
    }

    console.log(isLoading)
    console.log(isError)
    console.log(isSuccess)

    return (
        <div className={`page${activeTab === "register" ? "" : " excluded"}`}>
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
                                onChange={(e) => setTitle(e.target.value)}
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
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
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
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
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
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={phonenumber}
                                    onChange={(e) => setPhonenumber(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    value={passwordrepeat}
                                    onChange={(e) => setPasswordrepeat(e.target.value)}
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
                                    checked={agb}
                                    onChange={(e) => setAgb(e.target.checked)}
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
                                checked={reminderemail}
                                onChange={(e) => setReminderemail(e.target.checked)}
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
                                checked={birthdayemail}
                                onChange={(e) => setBirthdayemail(e.target.checked)}
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
                                checked={newsletter}
                                onChange={(e) => setNewsletter(e.target.checked)}
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
                    onClick={handleRegisterClicked}
                >
                    <span>Registrieren</span>
                </button>
            </div>
        </div>
    )
}

export default Register