import { DayPicker } from "react-day-picker"
import { de } from "date-fns/locale";
import useSessionContext from "../../hooks/useSessionContext";
import useServiceContext from "../../hooks/useServiceContext";
import DateProposals from "./DateProposals";
import "./Calendar.scss"

const Bookdate = () => {

    const { setActiveTab } = useSessionContext();
    const { appointment, setAppointment, freeTimeslots } = useServiceContext();

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

    const isBooked = (date: Date) => {
        // Convert dateString to a string in 'YYYY-MM-DD' format for comparison
        const dateString = date.toISOString().slice(0, 10);
        //Iterate through each object
        for (let timeslot of freeTimeslots) {
            // Convert startDate of the object to a string in 'YYYY-MM-DD' format for comparison
            const startDate = new Date(timeslot.startDate)
            const startDateString = startDate.toISOString().slice(0, 10);

            // Check if the startDate of the object is on the same date as the given date
            if (startDateString === dateString) {
                return false; // Object exists with a startDate on the given date
            }
        }
        return true; // No object found with a startDate on the given date
    }

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
                        booked: isBooked,
                    }}
                    modifiersClassNames={{
                        pastDate: "past-date",
                        today: "today",
                        futureDate: "future-date",
                        booked: "booked",
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
            <div className="col-2-2">
                <span className="captionLabel">
                    Bitte wählen Sie einen Termin
                </span>
                <DateProposals />
            </div>
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