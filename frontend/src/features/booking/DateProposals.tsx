import { useEffect, useState } from "react";
import useServiceContext from "../../hooks/useServiceContext"
import { FreeTimeslotType } from "../../utils/types";
import { weekdaysAbr } from "../../constants";

const DateProposals = () => {
    const { appointment, freeTimeslots } = useServiceContext();
    const [slots, setSlots] = useState<FreeTimeslotType[]>([]);

    const getFreeSlotsOfDay = (date: Date) => {
        const dateString = date.toISOString().slice(0, 10);
        let freeSlots = [];

        for (let timeslot of freeTimeslots) {
            const startDate = new Date(timeslot.startDate)
            const startDateString = startDate.toISOString().slice(0, 10);

            if (startDateString === dateString) {
                freeSlots.push(timeslot);
            }
        }

        return freeSlots;
    };

    useEffect(() => {
        if (appointment) {
            setSlots(getFreeSlotsOfDay(appointment));
        } else {
            setSlots([]);
        }
    }, [appointment]);

    return (
        <>
            <div className={`proposalsFeedback${!appointment || (appointment && slots.length === 0) ? "" : " excluded"}`}>
                <hr className="horizontal-ruler" />
                <span className="infoLabel">
                    {!appointment && "Sie haben noch keinen Tag gewählt"}
                    {appointment && slots.length === 0 && "Keine freien Termine an diesem Tag"}
                </span>
                <hr className="horizontal-ruler" />
            </div>
            <div className="proposalsList ">
                {slots.map((slot, idx) => {
                    const endDate = new Date(slot.endDate);
                    const startDate = new Date(slot.startDate);
                    const startDateString = startDate.toISOString().slice(0, 10);
                    const startDateParts = startDateString.split("-");
                    const formatedDate = startDateParts[2] + "." + startDateParts[1] + "." + startDateParts[0];
                    const starttime = startDate.toLocaleTimeString().slice(0, 5);
                    const endtime = endDate.toLocaleTimeString().slice(0, 5);

                    return (
                        <div key={idx} className="list-item selectionMode">
                            {weekdaysAbr[startDate.getDay() - 1]} {formatedDate}
                            <span className="time">
                                {starttime} - {endtime}
                            </span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default DateProposals