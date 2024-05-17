import { useState } from "react";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { allServicesInfo, employeesInfo, weekdaysAbr } from "../../constants";
import { AllServicesInfoType, AppointmentType, AvailableServicesKeyType, EmployeesInfoType } from "../../utils/types"

type AppointmentPropsType = {
    appointment: AppointmentType,
}

const Appointment = ({ appointment }: AppointmentPropsType) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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
                            >
                                Termin stornieren
                            </a>
                        </div>
                        <div className="clear-row"></div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Appointment