import { useState } from "react";
import useServiceContext from "../../hooks/useServiceContext";
import { weekdaysAbr } from "../../constants";
import { FreeTimeslotType } from "../../utils/types";

type DateSlotPropsType = {
    slot: FreeTimeslotType
}

const DateSlot = ({ slot }: DateSlotPropsType) => {
    const { setAppointment } = useServiceContext()
    const [selected, setSelected] = useState(false);

    const endDate = new Date(slot.endDate);
    const startDate = new Date(slot.startDate);
    const startDateString = startDate.toISOString().slice(0, 10);
    const startDateParts = startDateString.split("-");
    const formatedDate = startDateParts[2] + "." + startDateParts[1] + "." + startDateParts[0];
    const starttime = startDate.toLocaleTimeString().slice(0, 5);
    const endtime = endDate.toLocaleTimeString().slice(0, 5);

    const handleSlotClicked = () => {
        if (selected) {

        } else {

        }
    }

    return (
        <div
            className={`list-item selectionMode${selected ? " selected" : ""}`}
            onClick={handleSlotClicked}
        >
            {weekdaysAbr[startDate.getDay() - 1]} {formatedDate}
            <span className="time">
                {starttime} - {endtime}
            </span>
        </div>
    )
}

export default DateSlot