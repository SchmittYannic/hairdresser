import { ImCheckmark } from "react-icons/im";
import useAppointmentContext from "../../hooks/useAppointmentContext";
import { weekdaysAbr } from "../../constants";
import { FreeTimeslotType } from "../../utils/types";
import { parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

type DateSlotPropsType = {
    slot: FreeTimeslotType
}

const DateSlot = ({ slot }: DateSlotPropsType) => {
    const {
        appointment,
        setAppointment,
        selectedEmployee,
        setSelectedEmployee,
        resetAppointmentContext,
    } = useAppointmentContext();

    const timeZone = String(import.meta.env.VITE_TIMEZONE) ?? "Europe/Berlin";

    const endDate = toZonedTime(parseISO(slot.endDate), timeZone) //new Date(slot.endDate);
    const startDate = toZonedTime(parseISO(slot.startDate), timeZone) //new Date(slot.startDate);
    const startDateString = startDate.toISOString().slice(0, 10);
    const startDateParts = startDateString.split("-");
    const formatedDate = startDateParts[2] + "." + startDateParts[1] + "." + startDateParts[0];
    const starttime = startDate.toLocaleTimeString().slice(0, 5);
    const endtime = endDate.toLocaleTimeString().slice(0, 5);

    console.log(endDate)
    console.log(startDate)

    const isSelected = appointment && appointment.getTime() === startDate.getTime() && selectedEmployee === slot.employee;

    const handleSlotClicked = () => {
        if (isSelected) {
            resetAppointmentContext();
        } else {
            setAppointment(startDate);
            setSelectedEmployee(slot.employee);
        }
    }

    return (
        <div
            className={`list-item selectionMode${isSelected ? " selected" : ""}`}
            onClick={handleSlotClicked}
        >
            {weekdaysAbr[startDate.getDay()]} {formatedDate}
            <span className="time">
                {starttime} - {endtime}
            </span>
            <span className="staff">
                {slot.employeeFirstname} {slot.employeeLastname}
            </span>
            {
                isSelected &&
                <span className="icon-container">
                    <ImCheckmark aria-hidden />
                </span>
            }
            <div className="clear-row"></div>
        </div>
    )
}

export default DateSlot