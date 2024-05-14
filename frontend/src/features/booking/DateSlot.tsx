import { useState } from "react";
import { ImCheckmark } from "react-icons/im";
import useServiceContext from "../../hooks/useServiceContext";
import { weekdaysAbr } from "../../constants";
import { FreeTimeslotType } from "../../utils/types";

type DateSlotPropsType = {
    slot: FreeTimeslotType
}

const DateSlot = ({ slot }: DateSlotPropsType) => {
    const { appointment, setAppointment } = useServiceContext();
    const [selected, setSelected] = useState(false);

    const endDate = new Date(slot.endDate);
    const startDate = new Date(slot.startDate);
    const startDateString = startDate.toISOString().slice(0, 10);
    const startDateParts = startDateString.split("-");
    const formatedDate = startDateParts[2] + "." + startDateParts[1] + "." + startDateParts[0];
    const starttime = startDate.toLocaleTimeString().slice(0, 5);
    const endtime = endDate.toLocaleTimeString().slice(0, 5);

    const handleSlotClicked = () => {
        if (!appointment) return
        if (selected) {
            const resetDate = new Date(appointment.getTime());
            resetDate.setHours(0);
            resetDate.setMinutes(0);
            resetDate.setSeconds(0);
            resetDate.setMilliseconds(0);
            setAppointment(resetDate);
            setSelected(false);
        } else {
            setAppointment(startDate);
            setSelected(true);
        }
    }

    return (
        <div
            className={`list-item selectionMode${selected ? " selected" : ""}`}
            onClick={handleSlotClicked}
        >
            {weekdaysAbr[startDate.getDay()]} {formatedDate}
            <span className="time">
                {starttime} - {endtime}
            </span>
            {
                selected &&
                <span className="icon-container">
                    <ImCheckmark aria-hidden />
                </span>
            }
        </div>
    )
}

export default DateSlot