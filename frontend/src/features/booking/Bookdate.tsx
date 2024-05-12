import { DayPicker } from "react-day-picker"
import { de } from "date-fns/locale";
import useSessionContext from "../../hooks/useSessionContext";
import useServiceContext from "../../hooks/useServiceContext";
import "./Calendar.scss"

// const CustomDay = (props: DayProps) => {
//     const buttonRef: RefObject<HTMLButtonElement> = useRef(null);
//     const {
//         activeModifiers,
//         isHidden,
//         isButton,
//         buttonProps,
//         divProps,
//     } = useDayRender(props.date, props.displayMonth, buttonRef)

//     //console.log(activeModifiers)

//     if (isHidden) {
//         return (<></>)
//     } else if (isButton) {
//         return (
//             <button
//                 ref={buttonRef}
//                 {...buttonProps}
//                 //className=""
//                 role="gridcell"
//                 tabIndex={-1}
//             >
//                 <span>
//                     1
//                 </span>
//             </button>
//         )
//     } else {
//         return (
//             <div
//                 {...divProps}
//             >

//             </div>
//         )
//     }
// }

const Bookdate = () => {

    const { setActiveTab } = useSessionContext();
    const { appointment, setAppointment } = useServiceContext();

    const handleBackButtonClicked = () => {
        setActiveTab("services");
    };

    const isPastDate = (date: Date) => {
        const today = new Date();
        // Set hours, minutes, seconds, and milliseconds to 0 to compare dates without time
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const isSameDay = (date: Date): boolean => {
        const today = new Date();
        // Set hours, minutes, seconds, and milliseconds to 0 to compare dates without time
        today.setHours(0, 0, 0, 0);

        // Check if both dates have the same year, month, and day
        return date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();
    };

    const isTooFarIntoFuture = (date: Date): boolean => {
        // Get the current date
        const currentDate = new Date();

        // Calculate the date 2 months from now
        const futureDate = new Date();
        futureDate.setMonth(currentDate.getMonth() + 3);

        // Compare the input date with the future date
        return date > futureDate;
    };

    return (
        <div className="page">
            <div className="col-2-1">
                <span className="captionLabel">
                    Bitte wählen Sie einen Tag
                </span>
                <DayPicker
                    mode="single"
                    modifiers={{
                        pastDate: isPastDate,
                        today: isSameDay,
                        futureDate: isTooFarIntoFuture,
                    }}
                    modifiersClassNames={{
                        pastDate: "past-date",
                        today: "today",
                        futureDate: "future-date",
                    }}
                    selected={appointment}
                    onSelect={setAppointment}
                    locale={de}
                />
                <div className="calendarLegend">
                    <span className="busyInfo">
                        keine Termine
                    </span>
                    <span className="freeInfo">
                        Termine verfügbar
                    </span>
                </div>
            </div>
            <div className="col-2-2"></div>
            <div className="clear-row"></div>
            <div className="col-1-1">
                <button
                    className="backButton bookingFormButton"
                    type="button"
                    onClick={handleBackButtonClicked}
                >
                    <span>Zurück</span>
                </button>
                <button
                    className="bookingFormButton"
                    type="button"
                    disabled={true}
                >
                    <span>Weiter</span>
                </button>
            </div>
        </div>
    )
}

export default Bookdate