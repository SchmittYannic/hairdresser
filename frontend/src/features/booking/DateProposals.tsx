import { useEffect, useState } from "react";
import useServiceContext from "../../hooks/useServiceContext"
import { FreeTimeslotType } from "../../utils/types";
import DateSlot from "./DateSlot";
import { parseTime } from "../../utils/functions";

const DateProposals = () => {
    const { appointment, filterTime, freeTimeslots } = useServiceContext();
    const [slots, setSlots] = useState<FreeTimeslotType[]>([]);

    const getFreeSlotsOfDay = (date: Date) => {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const dateString = day + "." + month + "." + year;

        let freeSlots = []

        for (let timeslot of freeTimeslots) {
            const endDate = new Date(timeslot.endDate);
            const startDate = new Date(timeslot.startDate);
            const startDay = ("0" + startDate.getDate()).slice(-2);
            const startMonth = ("0" + (startDate.getMonth() + 1)).slice(-2);
            const startYear = startDate.getFullYear();
            const startDateString = startDay + "." + startMonth + "." + startYear;

            const filterTimeMin = parseTime(filterTime.min);
            const filterTimeMax = parseTime(filterTime.max);
            const startDateTime = parseTime(("0" + startDate.getHours()).slice(-2) + ":" + ("0" + startDate.getMinutes()).slice(-2));
            const endDateTime = parseTime(("0" + endDate.getHours()).slice(-2) + ":" + ("0" + endDate.getMinutes()).slice(-2));

            if (startDateString === dateString && startDateTime >= filterTimeMin && endDateTime <= filterTimeMax) {
                freeSlots.push(timeslot);
            }
        }

        return freeSlots;
    };

    useEffect(() => {
        if (appointment) {
            const freeSlotsOfDay = getFreeSlotsOfDay(appointment);
            freeSlotsOfDay.sort((a, b) => {
                const dateA = new Date(a.startDate);
                const dateB = new Date(b.startDate);

                return dateA.getTime() - dateB.getTime()
            })
            setSlots(freeSlotsOfDay);
        } else {
            setSlots([]);
        }
    }, [appointment, filterTime]);

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