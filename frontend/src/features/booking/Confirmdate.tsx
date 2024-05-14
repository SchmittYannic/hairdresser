import useServiceContext from "../../hooks/useServiceContext";
import useSessionContext from "../../hooks/useSessionContext";
import AsyncButton from "../../components/ui/AsyncButton"
import {
    offeredColorationServices,
    offeredCuttingServices,
    offeredShavingServices,
    weekdaysAbr
} from "../../constants";

const Confirmdate = () => {

    const { setActiveTab, userInfo } = useSessionContext();
    const { appointment, serviceInfo } = useServiceContext();

    const allOfferedServices = [...offeredCuttingServices, ...offeredColorationServices, ...offeredShavingServices];

    const service = allOfferedServices.filter(service => service.service_name === serviceInfo.service_name)[0];

    const day = appointment ? appointment.getDay() : NaN;
    const abrDay = weekdaysAbr[day];
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    };
    const dateString = appointment?.toLocaleDateString("de-DE", options);

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
                    <div className="bookingFormRow ">
                        <span className="bookingFormLabel">
                            Termin
                        </span>
                        <div className="bookingFormField">
                            <span className="label">
                                {abrDay} {dateString}
                                <br />
                                Test
                            </span>
                        </div>
                    </div>
                    <div className="bookingFormRow ">
                        <span className="bookingFormLabel">
                            Dienstleistungen
                        </span>
                        <div className="bookingFormField">
                            <span className="label">
                                <div className="service">
                                    <i>{serviceInfo.service_name}</i>
                                    <br />
                                    {service.service_label}
                                    <br />
                                    bei {serviceInfo.employee_firstname} {serviceInfo.employee_lastname}
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="bookingFormRow ">
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
                    <div className="bookingFormRow ">
                        <span className="bookingFormLabel">
                            Name
                        </span>
                        <div className="bookingFormField">
                            <span className="label">
                                {userInfo.firstname} {userInfo.lastname}
                            </span>
                        </div>
                    </div>
                    <div className="bookingFormRow ">
                        <span className="bookingFormLabel">
                            E-Mail-Adresse
                        </span>
                        <div className="bookingFormField">
                            <span className="label">
                                <div className="service">
                                    {userInfo.email}
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="bookingFormRow ">
                        <span className="bookingFormLabel">
                            Handynummer
                        </span>
                        <div className="bookingFormField">
                            <span className="label">
                                {userInfo.phonenumber}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="clear-row"></div>
            <div className="col-2-1">
                <div className="form">
                    <span className="bookingFormLabel remarksLabel">
                        Möchten Sie uns noch etwas mitteilen?
                    </span>
                    <div className="remarksTextarea textfield">
                        <textarea maxLength={255}></textarea>
                    </div>
                </div>
            </div>
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