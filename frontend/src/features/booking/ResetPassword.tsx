import useSessionContext from "../../hooks/useSessionContext"

const ResetPassword = () => {

    const { setActiveTab } = useSessionContext();

    return (
        <div className="page">
            <div className="col-1-1">
                <span className="infoLabel">
                    Wenn Sie Ihr Passwort nicht mehr wissen, können Sie es hier zurücksetzen. Geben Sie dazu Ihre E-Mail-Adresse ein.
                </span>
                <form className="bookingForm">
                    <div className="bookingFormRow">
                        <label
                            htmlFor="resetEmail"
                            className="bookingFormLabel"
                        >
                            E-Mail-Adresse
                        </label>
                        <div className="bookingFormField">
                            <div className="textfield">
                                <input
                                    id="resetEmail"
                                    autoCapitalize="none"
                                    type="text"
                                    maxLength={80}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="clear-row"></div>
            <div className="col-1-1">
                <button
                    className="backButton bookingFormButton"
                    type="button"
                    onClick={() => setActiveTab("login")}
                >
                    <span>Zurück</span>
                </button>
                <button
                    className="bookingFormButton"
                    type="button"
                >
                    <span>Zurücksetzen</span>
                </button>
                <div className="clear-row"></div>
            </div>
        </div>
    )
}

export default ResetPassword