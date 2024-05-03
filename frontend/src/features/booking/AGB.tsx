import { activeTabType } from "./Booking"

type AGBPropsType = {
    callback: React.Dispatch<React.SetStateAction<activeTabType>>;
}

const AGB = ({ callback }: AGBPropsType) => {

    const handleBackButtonClicked = () => {
        callback("register");
    }

    return (
        <>
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
        </>
    )
}

export default AGB