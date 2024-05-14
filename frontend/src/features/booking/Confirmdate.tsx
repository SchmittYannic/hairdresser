import { ChangeEvent, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import useServiceContext from "../../hooks/useServiceContext";
import useSessionContext from "../../hooks/useSessionContext";
import useCreateAppointment from "../../hooks/useCreateAppointment";
import AsyncButton from "../../components/ui/AsyncButton"
import {
    offeredColorationServices,
    offeredCuttingServices,
    offeredShavingServices,
    weekdaysAbr
} from "../../constants";

const Confirmdate = () => {

    const { setActiveTab, userInfo } = useSessionContext();
    const {
        appointment,
        serviceInfo,
        selectedEmployee,
        remarks,
        setRemarks
    } = useServiceContext();

    const {
        mutate,
        isLoading,
        isError,
        isSuccess,
        data: responseApi,
        error: errorApi,
    } = useCreateAppointment();

    const [textareaValue, setTextareaValue] = useState(remarks);

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
    const startDateHours = appointment ? ("0" + appointment.getHours()).slice(-2) : "";
    const startDateMinutes = appointment ? ("0" + appointment.getMinutes()).slice(-2) : "";
    const startDateTime = appointment ? startDateHours + ":" + startDateMinutes : "";
    const endDate = appointment ? new Date(appointment.getTime() + serviceInfo.service_duration * 60000) : undefined;
    const endDateHours = endDate ? ("0" + endDate.getHours()).slice(-2) : "";
    const endDateMinutes = endDate ? ("0" + endDate.getMinutes()).slice(-2) : "";
    const endDateTime = endDate ? endDateHours + ":" + endDateMinutes : "";

    const handleBackButtonClicked = () => {
        setActiveTab("bookdate");
    };

    const handleNextButtonClicked = () => {
        mutate({
            customer: userInfo.userId,
            employee: selectedEmployee,
            service_name: serviceInfo.service_name,
            duration: serviceInfo.service_duration,
            start: appointment,
            remarks: remarks,
        });
    }

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(event.target.value)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRemarks(textareaValue);
        }, 1000);

        return () => clearTimeout(timeout)
    }, [textareaValue]);

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
                                {startDateTime} - {endDateTime}
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
                        <textarea
                            value={textareaValue}
                            onChange={handleTextareaChange}
                            maxLength={255}
                        ></textarea>
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
            {
                isSuccess &&
                <div className="col-1-1">
                    <span className="success-msg" role="alert">
                        {responseApi.message}
                    </span>
                </div>
            }
            {
                isError && isAxiosError(errorApi) && errorApi.response && errorApi.response.data && errorApi.response.data.message
                    ?
                    <div className="col-1-1">
                        <span className="error-msg" role="alert">
                            {errorApi.response.data.message}
                        </span>
                    </div>
                    : isError ?
                        <div className="col-1-1">
                            <span className="error-msg" role="alert">
                                Etwas ist schiefgelaufen. Versuchen Sie es später erneut.
                            </span>
                        </div>
                        : <></>
            }
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
                    isLoading={isLoading}
                    disabled={isLoading}
                >
                    Bestätigen
                </AsyncButton>
                <div className="clear-row"></div>
            </div>
        </div>
    )
}

export default Confirmdate