import { useEffect, useState } from "react";
import useServiceContext from "../../hooks/useServiceContext"
import { FreeTimeslotType } from "../../utils/types";
import DateSlot from "./DateSlot";

const DateProposals = () => {
    const { appointment, freeTimeslots } = useServiceContext();
    const [slots, setSlots] = useState<FreeTimeslotType[]>([]);

    const getFreeSlotsOfDay = (date: Date) => {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const dateString = day + "." + month + "." + year;

        let freeSlots = []

        for (let timeslot of freeTimeslots) {
            const startDate = new Date(timeslot.startDate)
            const startDay = ("0" + startDate.getDate()).slice(-2);
            const startMonth = ("0" + (startDate.getMonth() + 1)).slice(-2);
            const startYear = startDate.getFullYear();
            const startDateString = startDay + "." + startMonth + "." + startYear;

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
                {slots.map((slot, idx) =>
                    <DateSlot key={idx} slot={slot} />
                )}
            </div>
        </>
    )
}

export default DateProposals