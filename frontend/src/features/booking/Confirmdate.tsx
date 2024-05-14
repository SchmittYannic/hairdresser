import AsyncButton from "../../components/ui/AsyncButton"
import useSessionContext from "../../hooks/useSessionContext";

const Confirmdate = () => {

    const { setActiveTab } = useSessionContext();

    const handleBackButtonClicked = () => {
        setActiveTab("bookdate");
    };

    const handleNextButtonClicked = () => {

    }

    return (
        <div className="submitPage page">
            <div className="col-1-1">
                <span className="captionLabel">
                    Termin bestätigen
                </span>
                <span className="infoLabel">
                    Bitte prüfen Sie Ihre Angaben auf Richtigkeit, bevor Sie den Termin verbindlich bestätigen.
                </span>
            </div>
            <div className="col-2-1">
                <div className="form">
                    <div className="formRow">
                        <span className="bookingFormLabel">
                            Termin
                        </span>
                        <div className="bookingFormField">
                            <span className="label">
                                Test
                                <br />
                                Test
                            </span>
                        </div>
                    </div>
                    <div className="formRow">
                        <span className="bookingFormLabel">
                            Dienstleistungen
                        </span>
                        <div className="bookingFormField">
                            <span className="label">
                                <div className="service">
                                    <i>Schneiden</i>
                                    <br />
                                    Schneiden (30 min.)
                                    <br />
                                    bei xyz
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="formRow">
                        <span className="bookingFormLabel">
                            Änderung / Absage
                        </span>
                        <div className="bookingFormField">
                            <span className="label">
                                kostenfrei bis 24 Stunden vor Termin
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-2-2">
                <div className="form">
                    <div className="formRow">
                        <span className="bookingFormLabel">
                            Name
                        </span>
                        <div className="bookingFormField">
                            <span className="label">
                                xyz
                            </span>
                        </div>
                    </div>
                    <div className="formRow">
                        <span className="bookingFormLabel">
                            E-Mail-Adresse
                        </span>
                        <div className="bookingFormField">
                            <span className="label">
                                <div className="service">
                                    email
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="formRow">
                        <span className="bookingFormLabel">
                            Handynummer
                        </span>
                        <div className="bookingFormField">
                            <span className="label">
                                nummer
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="clear-row"></div>
            <div className="col-2-1"></div>
            <div className="col-2-2"></div>
            <div className="clear-row"></div>
            <div className="col-1-1">
                <span className="annotationLabel">
                    alle Preise inkl. Mwst.
                </span>
            </div>
            <div className="col-1-1">
                <button
                    className="backButton bookingFormButton"
                    type="button"
                    onClick={handleBackButtonClicked}
                >
                    <span>Zurück</span>
                </button>
                <AsyncButton
                    className="bookingFormButton"
                    type="button"
                    onClick={handleNextButtonClicked}
                    isLoading={false}
                    disabled={true}
                >
                    Bestätigen
                </AsyncButton>
                <div className="clear-row"></div>
            </div>
        </div>
    )
}

export default Confirmdate