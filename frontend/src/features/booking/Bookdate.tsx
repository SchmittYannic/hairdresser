import useSessionContext from "../../hooks/useSessionContext";

const Bookdate = () => {

    const { setActiveTab } = useSessionContext();

    const handleBackButtonClicked = () => {
        setActiveTab("services");
    };

    return (
        <div className="page">
            <div className="col-2-1">
                <span className="captionLabel">
                    Bitte wählen Sie einen Tag
                </span>
            </div>
            <div className="col-2-2"></div>
            <div className="clear-row"></div>
            <div className="col-1-1">
                <button
                    className="backButton bookingFormButton"
                    type="button"
                    onClick={handleBackButtonClicked}
                >
                    <span>Zurück</span>
                </button>
                <button
                    className="bookingFormButton"
                    type="button"
                    disabled={true}
                >
                    <span>Weiter</span>
                </button>
            </div>
        </div>
    )
}

export default Bookdate