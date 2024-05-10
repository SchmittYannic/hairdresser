import useSessionContext from "../../hooks/useSessionContext"

const AGB = () => {

    const { activeTab, setActiveTab } = useSessionContext();

    const handleBackButtonClicked = () => {
        setActiveTab("register");
    }

    return (
        <div className={`page${activeTab === "agb" ? "" : " excluded"}`}>
            <div className="col-2-1">
                <span className="captionLabel">
                    AGB
                </span>
                <div className="termsAndConditionsContainer">
                    <iframe src=""></iframe>
                </div>
            </div>
            <div className="col-2-2">
                <span className="captionLabel">
                    Datenschutzerklärung
                </span>
                <div className="termsAndConditionsContainer">
                    <iframe src=""></iframe>
                </div>
            </div>
            <div className="col-1-1">
                <button
                    className="backButton bookingFormButton"
                    type="button"
                    onClick={handleBackButtonClicked}
                >
                    <span>Zurück</span>
                </button>
                <div className="clear-row"></div>
            </div>
        </div>
    )
}

export default AGB