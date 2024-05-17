import { useState, MouseEvent, useEffect } from "react";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import AsyncButton from "../../components/ui/AsyncButton";
import Dialog from "../../components/ui/Dialog";
import { allServicesInfo, employeesInfo, weekdaysAbr } from "../../constants";
import { AllServicesInfoType, AppointmentType, AvailableServicesKeyType, EmployeesInfoType } from "../../utils/types"
import useDeleteAppointment from "../../hooks/useDeleteAppointment";

type AppointmentPropsType = {
    appointment: AppointmentType,
}

const Appointment = ({ appointment }: AppointmentPropsType) => {
    const {
        mutate: deleteAppointment,
        isLoading: isDeleteAppointmentLoading,
        isError: isDeleteAppointmentError,
        reset: resetDeleteAppointmentMutation,
    } = useDeleteAppointment();
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const service: {
        service_label: string,
        service_duration: number,
    } = allServicesInfo[appointment.service_name as keyof AllServicesInfoType];

    const employee: {
        firstname: string,
        lastname: string,
        skills: AvailableServicesKeyType[],
    } = employeesInfo[appointment.employee as keyof EmployeesInfoType];

    const startDate = new Date(appointment.start);
    const day = startDate.getDay();
    const abrDay = weekdaysAbr[day];
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    };
    const dateString = startDate.toLocaleDateString("de-DE", options);
    const startDateHours = ("0" + startDate.getHours()).slice(-2);
    const startDateMinutes = ("0" + startDate.getMinutes()).slice(-2);
    const startDateTime = startDateHours + ":" + startDateMinutes;
    const endDate = new Date(appointment.end);
    const endDateHours = ("0" + endDate.getHours()).slice(-2);
    const endDateMinutes = ("0" + endDate.getMinutes()).slice(-2);
    const endDateTime = endDateHours + ":" + endDateMinutes;

    const createdDate = new Date(appointment.createdAt);
    const createdDateDay = createdDate.getDay();
    const createdDateAbrDay = weekdaysAbr[createdDateDay];
    const createdDateString = createdDate.toLocaleDateString("de-DE", options);
    const createdDateHours = ("0" + createdDate.getHours()).slice(-2);
    const createdDateMinutes = ("0" + createdDate.getMinutes()).slice(-2);
    const createdDateTime = createdDateHours + ":" + createdDateMinutes;

    const now = new Date();
    const diffNowAndAppointment = startDate.getTime() - now.getTime();
    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
    const isWithinNext24Hours = diffNowAndAppointment >= 0 && diffNowAndAppointment < twentyFourHoursInMs;

    const handleDeleteAppointmentClicked = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteYesClicked = () => {
        deleteAppointment(appointment._id);
    };

    const handleDeleteNoClicked = () => {
        setIsDeleteDialogOpen(false);
    };

    useEffect(() => {
        if (!isDeleteDialogOpen) {
            resetDeleteAppointmentMutation();
        }
    }, [isDeleteDialogOpen])

    return (
        <div className="list-item">
            <div className="appointmentListItem">
                <button
                    className="bookingButton plusButton"
                    type="button"
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                >
                    <span className="icon-container">
                        {isDetailsOpen ? <FaCircleMinus aria-hidden /> : <FaCirclePlus aria-hidden />}
                    </span>
                </button>
                <div className="header-container">
                    <span className="title">
                        {abrDay} {dateString}
                        <br />
                        {startDateTime} - {endDateTime}
                    </span>

                    <span className="service">
                        <i>{appointment.service_name}</i>
                        <br />
                        {employee.firstname} {employee.lastname}
                        <br />
                    </span>
                </div>
                {
                    isDetailsOpen &&
                    <div className="details">
                        <span className="services">
                            <i>{appointment.service_name}</i>
                            <br />
                            {service.service_label}
                            <br />
                            Bei {employee.firstname} {employee.lastname}
                            <br />
                        </span>
                        <div className="dateContainer">
                            <span className="dateLabel">
                                Reserviert am:&nbsp;
                            </span>
                            <span className="dateField">
                                {createdDateAbrDay} {createdDateString} {createdDateTime}
                            </span>
                        </div>
                        <div>
                            <a
                                href=""
                                onClick={handleDeleteAppointmentClicked}
                            >
                                Termin stornieren
                            </a>
                        </div>
                        <div className="clear-row"></div>
                    </div>
                }
                {
                    isDeleteDialogOpen &&
                    <Dialog setDialog={setIsDeleteDialogOpen}>
                        <div className="dialog__caption ">
                            Termin löschen
                        </div>
                        <div className="dialog__content">
                            <span className="label">
                                Wollen Sie diesen Termin löschen?
                            </span>
                            {
                                isWithinNext24Hours &&
                                <>
                                    <span
                                        className="label"
                                        style={{
                                            whiteSpace: "wrap",
                                            maxWidth: "270px",
                                            display: "block",
                                        }}>
                                        Termine innerhalb der nächsten 24 Stunden können nicht kostenfrei abgesagt werden.
                                    </span>
                                    <span className="label">
                                        Dennoch fortfahren?
                                    </span>
                                </>
                            }
                            {
                                isDeleteAppointmentError &&
                                <span className="error-msg" role="alert">
                                    Fehler bei Löschung des Termins.
                                </span>
                            }
                        </div>
                        <div className="dialog__button__container">
                            <AsyncButton
                                className="bookingFormButton"
                                type="button"
                                onClick={handleDeleteYesClicked}
                                isLoading={isDeleteAppointmentLoading}
                                disabled={isDeleteAppointmentLoading}
                            >
                                <span className="icon-container">
                                    <ImCheckmark aria-hidden />
                                </span>
                                <span className="icon-gap">
                                    ja
                                </span>
                            </AsyncButton>
                            <button
                                className="bookingFormButton"
                                type="button"
                                onClick={handleDeleteNoClicked}
                            >
                                <span className="icon-container">
                                    <FaPlus aria-hidden style={{ transform: "rotate(45deg)" }} />
                                </span>
                                <span className="icon-gap">
                                    nein
                                </span>
                            </button>
                        </div>
                    </Dialog>
                }
            </div>
        </div>
    )
}

export default Appointment